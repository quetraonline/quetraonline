# QuetraOnline

Quetra için Next.js tabanlı yayıncı portfolyosu ve Nowa Online World topluluk araçları.

## Nowa Chat Tracker

Tracker `/tracker` adresinde çalışır. LDPlayer OCR ajanı, kullanıcı tarafından belirlenen sohbet alanında görünen tüm okunabilir dolu satırları anahtar kelime filtresi olmadan kaydeder. Oyuncu adı ayrıştırılamayan satırlar da mesajın tamamı korunarak `Bilinmiyor` oyuncusuna bağlanır.

Her satır için veritabanında:
- Sunucu tarafından oluşturulan `created_at` tarih-saat alanı,
- OCR satırından alınabilirse `game_time_text` oyun saati,
- `player` oyuncu adı,
- `message` sohbet metni,
- `dedupe_hash` tekrar eden OCR karelerinin çift kayıt oluşturmasını önleyen kimlik tutulur.

### Veritabanı ve güvenli erişim

- `supabase/nowa-chat-tracker.sql` tabloyu, özel kimlik bilgisi şemasını ve doğrulamalı RPC işlevlerini kurar.
- `chat_messages` tablosunda RLS açıktır; istemciye doğrudan okuma/yazma izni verilmez.
- Uygulama Supabase publishable anahtarıyla yalnızca üç RPC işlevini çağırır. Ham dashboard ve OCR sırları Supabase'in özel şemasında SHA-256 özeti olarak saklanır.
- Service-role anahtarı kullanılmaz ve tarayıcıya açılmaz.

### Vercel ortam değişkenleri

Production, Preview ve Development için:
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `NOWA_TRACKER_DASHBOARD_PASSWORD`
- `NOWA_TRACKER_SESSION_SECRET`
- `NOWA_TRACKER_INGEST_TOKEN`

### LDPlayer OCR ajanı (Windows)

1. Python 3.10+ kurun.
2. Tesseract OCR ve `tur` + `eng` dil verilerini kurun.
3. `tools/nowa-chat-tracker/agent` klasöründe terminal açın.
4. `python -m venv .venv`, ardından `.venv\\Scripts\\activate` komutlarını çalıştırın.
5. `pip install -r requirements.txt` komutunu çalıştırın.
6. `config.example.json` dosyasını `config.json` olarak kopyalayın.
7. `api_url` olarak `https://quetraonline.vercel.app` girin; kendi mevcut `NOWA_TRACKER_INGEST_TOKEN` değerini `ingest_token` alanına yazın.
8. `capture` koordinatlarını LDPlayer sohbet alanına göre ayarlayın. Alanı yalnızca sohbet satırlarını içerecek şekilde kırpın.
9. Önce `dry_run: true` ile konsolda tüm satırların doğru okunduğunu kontrol edin.
10. Doğruysa `dry_run: false` yapıp `python capture_agent.py` ile gerçek kayıtları başlatın.

Ajan her satır için `POST /api/tracker/messages` isteği yapar. Ekranda satır görünmeye devam ederken aynı satır her karede tekrar gönderilmez. Satır birkaç OCR karesi boyunca kaybolup yeniden görünürse yeni bir görünüm olarak kaydedilir. Tarih raporları Europe/Istanbul saat dilimindedir; panel 30 saniyede yenilenir.

### Önemli not

`created_at`, mesajın veritabanına ulaştığı sunucu tarih-saatidir. Oyunda satırın yanında ayrıca bir saat yazıyorsa, ajan bunu algılayabildiğinde `game_time_text` alanına ekler. Ekranda oyun saati yoksa kayıt saati yine saniyesine kadar tutulur.

## Yerel geliştirme

`npm install` ardından `npm run dev`.
