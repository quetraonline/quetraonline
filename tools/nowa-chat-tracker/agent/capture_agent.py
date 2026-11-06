import json
import re
import time
import hashlib
import logging
from pathlib import Path
from datetime import datetime

import requests
import mss
from PIL import Image, ImageOps, ImageEnhance
import pytesseract

CONFIG_PATH = Path(__file__).with_name("config.json")
if not CONFIG_PATH.exists():
    raise SystemExit("config.json bulunamadı. config.example.json dosyasını config.json olarak kopyalayın.")

cfg = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
if cfg.get("tesseract_cmd"):
    pytesseract.pytesseract.tesseract_cmd = cfg["tesseract_cmd"]

logging.basicConfig(level=logging.INFO, format="%(asctime)s | %(message)s")

line_pattern = re.compile(
    cfg.get("line_pattern", r"^(?P<player>[^:]{1,32}):\s*(?P<message>.+)$")
)
timestamp_pattern = re.compile(
    cfg.get(
        "timestamp_pattern",
        r"^(?:\[(?P<bracketed>\d{1,2}:\d{2}(?::\d{2})?)\]|(?P<plain>\d{1,2}:\d{2}(?::\d{2})?))\s+"
    )
)


def parse_line(raw_line):
    """Return every readable non-empty chat row; keywords are not required."""
    line = " ".join(raw_line.split()).strip()
    if not line:
        return None

    game_time_text = None
    time_match = timestamp_pattern.match(line)
    if time_match:
        game_time_text = time_match.groupdict().get("bracketed") or time_match.groupdict().get("plain")
        line = line[time_match.end():].strip()

    match = line_pattern.match(line)
    if match:
        player = (match.groupdict().get("player") or "").strip() or "Bilinmiyor"
        message = (match.groupdict().get("message") or "").strip()
    else:
        player = "Bilinmiyor"
        message = line

    if not message:
        return None

    return {
        "player": player[:80],
        "message": message[:1000],
        "matched_keywords": [],
        "game_time_text": game_time_text
    }


def make_fingerprint(item):
    value = "|".join([
        item.get("player", "").casefold(),
        item.get("game_time_text") or "",
        item.get("message", "").casefold()
    ])
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def main():
    cap = cfg["capture"]
    interval = max(0.15, float(cfg.get("capture_interval_seconds", 0.30)))
    missing_frames_to_rearm = max(1, int(cfg.get("missing_frames_to_rearm", 3)))
    api = cfg["api_url"].rstrip("/") + "/api/tracker/messages"
    headers = {
        "Authorization": "Bearer " + cfg["ingest_token"],
        "Content-Type": "application/json"
    }

    # Keep lines active while they remain visible in the chat viewport.
    # This avoids posting the same row on every OCR frame, but allows it
    # to be recorded again if it scrolls away and later appears again.
    active_lines = {}

    logging.info(
        "Nowa Chat Tracker OCR başladı. Alan=%s, dry_run=%s",
        cap,
        cfg.get("dry_run", True)
    )
    logging.info("Anahtar kelime filtresi kapalı: sohbet alanındaki tüm okunabilir satırlar kaydedilecek.")

    with mss.MSS() as screen:
        while True:
            started = time.time()
            try:
                shot = screen.grab({
                    "left": cap["left"],
                    "top": cap["top"],
                    "width": cap["width"],
                    "height": cap["height"]
                })
                image = Image.frombytes("RGB", shot.size, shot.rgb)
                image = ImageOps.grayscale(image)
                image = ImageEnhance.Contrast(image).enhance(2.0)
                ocr_text = pytesseract.image_to_string(
                    image,
                    lang="tur+eng",
                    config="--psm 6"
                )

                now = time.time()
                current_fingerprints = set()

                for line in ocr_text.splitlines():
                    item = parse_line(line)
                    if not item:
                        continue

                    fingerprint = make_fingerprint(item)
                    current_fingerprints.add(fingerprint)

                    if fingerprint in active_lines:
                        active_lines[fingerprint] = 0
                        continue

                    active_lines[fingerprint] = 0
                    item["dedupe_hash"] = hashlib.sha256(
                        (fingerprint + "|" + str(int(now))).encode("utf-8")
                    ).hexdigest()

                    visible_time = item["game_time_text"] or datetime.now().astimezone().strftime("%H:%M:%S")
                    logging.info(
                        "[%s] %s: %s",
                        visible_time,
                        item["player"],
                        item["message"]
                    )

                    if not cfg.get("dry_run", True):
                        try:
                            response = requests.post(
                                api,
                                json=item,
                                headers=headers,
                                timeout=8
                            )
                            response.raise_for_status()
                        except requests.RequestException as error:
                            logging.error("Sunucuya gönderilemedi; sonraki OCR turunda tekrar denenecek: %s", error)
                            active_lines.pop(fingerprint, None)

                # Rearm a line only after it is absent for several frames.
                for fingerprint in list(active_lines):
                    if fingerprint not in current_fingerprints:
                        active_lines[fingerprint] += 1
                        if active_lines[fingerprint] >= missing_frames_to_rearm:
                            active_lines.pop(fingerprint, None)

            except Exception as error:
                logging.exception("Ekran/OCR hatası: %s", error)

            time.sleep(max(0, interval - (time.time() - started)))


if __name__ == "__main__":
    main()
