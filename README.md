# QuetraOnline

Quetra için Next.js tabanlı yayıncı portfolyosu ve Nowa Online World topluluk araçları.

## Nowa Chat Tracker

Tracker, bu Next.js projesine entegredir ve `/tracker` adresinden açılır. LDPlayer OCR ajanı oyun sohbetinde **Taş**, **Felo**, **Mini Taş** ve **Random** kelimelerini içeren satırları yakalayıp sunucu API'sine gönderir. Panel günlük mesajları, oyuncu sıralamasını ve kelime istatistiklerini gösterir.

### Veritabanı ve güvenli erişim

- `supabase/nowa-chat-tracker.sql` tabloyu, özel kimlik bilgisi şemasını ve sınırlı RPC işlevlerini kurar.
- `chat_messages` tablosunda RLS açıktır; istemciye doğrudan okuma/yazma izni verilmez.
- Uygulama Supabase publishable anahtarıyla yalnızca üç RPC işlevini çağırır. Ham dashboard ve OCR sırları Supabase'in özel şemasında SHA-256 özeti olarak saklanır.
- Service-role anahtarı kullanılmaz ve tarayıcıya açılmaz.

Bu kurulumda SQL migration'ları ve sır özetleri proje sahibi tarafından kuruldu. Sırları değiştirdiğinde Vercel'deki `NOWA_TRACKER_SESSION_SECRET` ve `NOWA_TRACKER_INGEST_TOKEN` değerlerini güncelle; ardından aynı değerlerin hash'lerini `tracker_private.credentials` tablosuna güvenli bir yönetim oturumundan yaz. Ham sırları GitHub'a ekleme.

### Vercel ortam değişkenleri

Vercel Project Settings → Environment Variables içinde Production, Preview ve Development için:

- `SUPABASE_URL`: Supabase Project URL
- `SUPABASE_PUBLISHABLE_KEY`: Supabase Project Settings → API Keys bölümündeki publishable key
- `NOWA_TRACKER_DASHBOARD_PASSWORD`: `/tracker` giriş şifresi
- `NOWA_TRACKER_SESSION_SECRET`: Uzun ve rastgele oturum imzalama anahtarı
- `NOWA_TRACKER_INGEST_TOKEN`: OCR ajanının veri gönderme anahtarı

### Bağımlılık ve yayın

`@supabase/supabase-js` istemcisi kullanılmaz; sunucu, Supabase REST RPC uçlarını sadece `apikey` başlığıyla çağırır. Değişiklikler ana dala alındığında Vercel otomatik build alır. Yerelde `npm install` ve `npm run dev` komutlarıyla çalıştırabilirsiniz.

### LDPlayer OCR ajanı (Windows)

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

- Gizli anahtarları sadece Vercel sunucu ortam değişkenlerinde tutun; OCR ajanındaki aktarım anahtarını paylaşmayın.
- `/tracker` parola korumalıdır; giriş oturumu 12 saat geçerli, HttpOnly ve SameSite=Strict çerezle tutulur.
- `tracker_private.credentials` şeması API tarafından erişilebilir değildir; sadece doğrulanan RPC fonksiyonları okuyabilir.
- OCR oyuncu adını okuyamazsa satır `Bilinmiyor` olarak kaydedilir. Gerçek oyun ekranında OCR bölgesi ve satır biçimi test edilmelidir.

## Yerel geliştirme

`npm install` ardından `npm run dev`.
