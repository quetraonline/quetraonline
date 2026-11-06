# QuetraOnline

Quetra için Next.js tabanlı yayıncı portfolyosu ve Nowa Online World topluluk araçları.

## Nowa Chat Tracker

Tracker, bu Next.js projesine entegredir ve `/tracker` adresinden açılır. LDPlayer OCR ajanı oyun sohbetinde **Taş**, **Felo**, **Mini Taş** ve **Random** kelimelerini içeren satırları yakalayıp sunucu API'sine gönderir. Panel günlük mesajları, oyuncu sıralamasını ve kelime istatistiklerini gösterir.

### 1. Supabase veritabanı

Supabase projesinde SQL Editor'ü açıp `supabase/nowa-chat-tracker.sql` dosyasının tamamını çalıştırın.

### 2. Vercel ortam değişkenleri

Vercel Project Settings → Environment Variables bölümüne aşağıdaki değerleri ekleyin (Production, Preview ve Development ihtiyacınıza göre):

- `SUPABASE_URL`: Supabase Project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service_role secret (yalnızca sunucu tarafında; asla NEXT_PUBLIC_ olarak tanımlamayın)
- `NOWA_TRACKER_DASHBOARD_PASSWORD`: `/tracker` giriş şifresi
- `NOWA_TRACKER_SESSION_SECRET`: Uzun ve rastgele oturum imzalama anahtarı
- `NOWA_TRACKER_INGEST_TOKEN`: OCR ajanının veri gönderme anahtarı

Güçlü, birbirinden farklı gizli değerler kullanın. Değerleri GitHub'a commit etmeyin.

### 3. Bağımlılık ve yayın

`@supabase/supabase-js` bağımlılığı package.json'a eklendi. Değişiklikler ana dala alındığında Vercel otomatik build alır. Yerelde `npm install` ve `npm run dev` komutlarıyla çalıştırabilirsiniz.

### 4. LDPlayer OCR ajanı (Windows)

1. Python 3.10+ kurun.
2. Tesseract OCR'ı ve Türkçe dil paketini kurun. Windows'taki tesseract.exe yolunu config'e yazabilirsiniz.
3. `tools/nowa-chat-tracker/agent` klasöründe terminal açın.
4. `python -m venv .venv` ve ardından Windows için `.venv\\Scripts\\activate` komutunu çalıştırın.
5. `pip install -r requirements.txt` komutunu çalıştırın.
6. `config.example.json` dosyasını `config.json` olarak kopyalayın.
7. `api_url` değerini sitenizin adresi, `ingest_token` değerini Vercel'deki `NOWA_TRACKER_INGEST_TOKEN` ile aynı yapın.
8. `capture` koordinatlarını LDPlayer penceresindeki sohbet alanına göre ayarlayın. Önce `dry_run: true` ile OCR çıktısını kontrol edin.
9. Oyuncu adı ve mesaj ayrımı doğruysa `dry_run: false` yapıp `python capture_agent.py` komutuyla başlatın.

Ajanın gönderdiği istekler `POST /api/tracker/messages` adresine gider. Panel verileri `/api/tracker/messages` ve `/api/tracker/stats` uçlarından oturum doğrulamasıyla okunur. Tarih raporları Europe/Istanbul saat dilimine göre hesaplanır.

### Güvenlik notları

- Supabase service_role anahtarı ve üç NOWA_TRACKER gizli değeri sadece Vercel sunucu ortam değişkenlerinde bulunmalıdır.
- `/tracker` parola korumalıdır; giriş oturumu 12 saat geçerli, HttpOnly ve SameSite=Strict çerezle tutulur.
- OCR ajanının `config.json` dosyası gizli aktarım anahtarı içerir; paylaşmayın ve Git'e eklemeyin.
- OCR oyuncu adını okuyamazsa satır `Bilinmiyor` olarak kaydedilir. Gerçek oyun ekranında OCR bölgesi ve satır biçimi test edilmelidir.

## Yerel geliştirme

`npm install` ardından `npm run dev`.
