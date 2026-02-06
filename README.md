# Görev Dağılımı Sistemi

Firebase tabanlı görev ve makine takip sistemi.

## Kurulum

1. Repository'yi klonlayın:
```bash
git clone https://github.com/TheVanerr/DRMWS.git
cd DRMWS
```

2. Firebase yapılandırması için:
   - `firebase-config.js` dosyasını `firebase-config-private.js` olarak kopyalayın
   - `.env` dosyasındaki Firebase bilgilerinizi `firebase-config-private.js` içine yapıştırın

3. `.env` dosyası oluşturun (örnek):
```env
FIREBASE_API_KEY=your_api_key_here
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

4. Projeyi bir web sunucusu ile çalıştırın (ES6 modülleri için gerekli):
```bash
# Python 3
python -m http.server 8000

# Node.js http-server
npx http-server

# VS Code Live Server extension
```

5. Tarayıcıda açın: `http://localhost:8000`

## Güvenlik Notları

- `.env` ve `firebase-config-private.js` dosyaları `.gitignore` içinde olduğu için GitHub'a yüklenmez
- Firebase API anahtarlarınız güvende kalır
- Yeni bir ortamda çalışırken yukarıdaki adım 2'yi tekrarlayın

## Kullanım

- **Giriş:** Kullanıcı adı: `admin`, Şifre: `112263`
- Departmanlar arası görev ataması
- Makine takip ve iş emri yönetimi
- Görev tamamlama ve mazeret sistemi
