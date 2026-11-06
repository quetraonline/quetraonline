import json, re, time, hashlib, logging
from pathlib import Path
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
keywords = ["Boss Stone Spawned", "Elder Dragon Spawned", "Elder Dragon Dead", "Boss Stone Dead"]
pattern = re.compile(cfg.get("line_pattern", r"^(?P<player>[^:]{1,32}):\s*(?P<message>.+)$"))
seen = {}

def parse_line(line):
    line = " ".join(line.split()).strip()
    if not line:
        return None
    match = pattern.match(line)
    if match:
        player = match.groupdict().get("player", "").strip() or "Bilinmiyor"
        message = match.groupdict().get("message", "").strip()
    else:
        player, message = "Bilinmiyor", line
    hits = [word for word in keywords if word.casefold() in message.casefold()]
    if not hits:
        return None
    return {"player": player, "message": message, "matched_keywords": hits, "game_time_text": None}

def main():
    cap = cfg["capture"]
    interval = max(0.15, float(cfg.get("capture_interval_seconds", 0.35)))
    ttl = max(1, int(cfg.get("dedupe_seconds", 20)))
    api = cfg["api_url"].rstrip("/") + "/api/tracker/messages"
    headers = {"Authorization": "Bearer " + cfg["ingest_token"], "Content-Type": "application/json"}
    logging.info("Nowa Chat Tracker OCR başladı. Alan=%s, dry_run=%s", cap, cfg.get("dry_run", True))
    with mss.mss() as screen:
        while True:
            started = time.time()
            try:
                shot = screen.grab({"left": cap["left"], "top": cap["top"], "width": cap["width"], "height": cap["height"]})
                image = Image.frombytes("RGB", shot.size, shot.rgb)
                image = ImageOps.grayscale(image)
                image = ImageEnhance.Contrast(image).enhance(2.0)
                text = pytesseract.image_to_string(image, lang="tur+eng", config="--psm 6")
                now = time.time()
                for key, timestamp in list(seen.items()):
                    if now - timestamp > ttl:
                        seen.pop(key, None)
                for line in text.splitlines():
                    item = parse_line(line)
                    if not item:
                        continue
                    content_digest = hashlib.sha256((item["player"].casefold() + "|" + item["message"].casefold()).encode("utf-8")).hexdigest()
                    if content_digest in seen:
                        continue
                    seen[content_digest] = now
                    item["dedupe_hash"] = hashlib.sha256((content_digest + "|" + str(int(now))).encode("utf-8")).hexdigest()
                    logging.info("[%s] %s: %s", ",".join(item["matched_keywords"]), item["player"], item["message"])
                    if not cfg.get("dry_run", True):
                        try:
                            response = requests.post(api, json=item, headers=headers, timeout=8)
                            response.raise_for_status()
                        except requests.RequestException as error:
                            logging.error("Sunucuya gönderilemedi: %s", error)
            except Exception as error:
                logging.exception("Ekran/OCR hatası: %s", error)
            time.sleep(max(0, interval - (time.time() - started)))

if __name__ == "__main__":
    main()
