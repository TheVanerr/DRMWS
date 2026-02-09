# 🔔 Bildirim Sistemi Kurulum Kılavuzu

Bu sistem, yeni görev eklendiğinde admin kullanıcıya (fatihgural80@gmail.com) tarayıcı bildirimi gönderir.

## ✅ Yapılan Değişiklikler

1. **Firebase Cloud Messaging (FCM) entegrasyonu**
2. **Tarayıcı bildirim izni sistemi**
3. **Firestore üzerinden bildirim yönetimi**
4. **Service Worker ile arka plan bildirimleri**

## 📋 Kurulum Adımları

### 1. Firebase Console'da Cloud Messaging Ayarları

#### a) Firebase Console'a gidin
- https://console.firebase.google.com/
- Projenizi seçin (drmws-78227)

#### b) Cloud Messaging'i Etkinleştirin
1. Sol menüden **Project Settings** (Proje Ayarları) seçin
2. **Cloud Messaging** sekmesine gidin
3. **Web Push certificates** bölümünde **Generate key pair** butonuna tıklayın
4. Oluşturulan **VAPID key**'i kopyalayın

#### c) VAPID Key'i Kodda Güncelleyin
`index.html` dosyasında şu satırı bulun ve VAPID key'inizi yapıştırın:

```javascript
const vapidKey = 'BURAYA_VAPID_KEY_GELECEK'; // Bu key'i Firebase Console'dan alacağız
```

Şu şekilde olmalı:
```javascript
const vapidKey = 'BKr8xN...'; // Firebase'den aldığınız key
```

### 2. Firestore Güvenlik Kurallarını Güncelleyin

Firebase Console'da:
1. **Firestore Database** > **Rules** sekmesine gidin
2. `firestore.rules` dosyasındaki kuralları yapıştırın
3. **Publish** butonuna tıklayın

### 3. HTTPS Zorunluluğu

⚠️ **ÖNEMLİ:** Tarayıcı bildirimleri sadece HTTPS bağlantılarda çalışır!

**Yerel test için:**
- `http://localhost` veya `http://127.0.0.1` kullanabilirsiniz
- Başka IP'ler için HTTPS gerekir

**Production için:**
- GitHub Pages kullanıyorsanız otomatik HTTPS vardır
- Kendi sunucunuz varsa SSL sertifikası ekleyin

### 4. Firebase Hosting (Opsiyonel ama Önerilen)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🎯 Nasıl Çalışır?

### Admin Kullanıcı (fatihgural80@gmail.com) İçin:

1. **İlk Giriş:**
   - Giriş yaptığınızda tarayıcı bildirim izni isteyecek
   - "İzin Ver" butonuna tıklayın
   - FCM token'ınız Firestore'da kaydedilecek

2. **Yeni Görev Eklendiğinde:**
   - Sistem otomatik olarak bir bildirim kaydı oluşturur
   - 30 saniye içinde tarayıcınıza bildirim gelir
   - Bildirim formatı: "Yeni Görev Eklendi - [Kişi Adı] için yeni görev: [Görev]"

3. **Bildirimler:**
   - ✅ Tarayıcı açıkken: Anında bildirim
   - ✅ Tarayıcı arka planda: Service Worker ile bildirim
   - ✅ Bildirime tıklayınca: Uygulama açılır/focus olur

### Diğer Kullanıcılar İçin:

- Görev görüntüleyebilirler
- Bildirim almazlar (sadece admin)

## 🔧 Sorun Giderme

### Bildirim Gelmiyor?

1. **Tarayıcı izni kontrol edin:**
   - Tarayıcı adres çubuğunun solundaki kilit ikonuna tıklayın
   - "Bildirimler" izni verilmiş olmalı

2. **HTTPS kontrolü:**
   - URL'nin `https://` ile başladığından emin olun
   - Veya `localhost` kullanın

3. **Console loglarını kontrol edin:**
   - F12 > Console'da hata mesajları var mı?
   - "Service Worker registered" mesajını görüyor musunuz?

4. **VAPID key kontrolü:**
   - `index.html` dosyasında VAPID key'i doğru girdiniz mi?

5. **Firestore kuralları:**
   - `notifications` koleksiyonu için read/write izinleri var mı?

### Test Etmek İçin:

1. Admin hesabıyla giriş yapın
2. Bildirim iznini verin
3. Console'da şu mesajları görmeli:
   ```
   Service Worker registered
   Notification permission granted
   FCM Token: [token]
   User created with FCM token
   ```
4. Yeni bir görev ekleyin
5. 30 saniye içinde bildirim almalısınız

## 📊 Firestore Koleksiyonları

### `users` - Kullanıcı bilgileri
```javascript
{
  email: "fatihgural80@gmail.com",
  displayName: "Fatih GÜRAL",
  fcmToken: "...",
  isAdmin: true,
  createdAt: "...",
  updatedAt: "..."
}
```

### `notifications` - Bildirim kayıtları
```javascript
{
  title: "Yeni Görev Eklendi",
  body: "Fatih GÜRAL için yeni görev...",
  recipientEmail: "fatihgural80@gmail.com",
  taskId: "abc123",
  type: "new_task",
  read: false,
  createdAt: "...",
  readAt: "..." // okunduktan sonra
}
```

## 🚀 Gelecek Geliştirmeler

- [ ] Email bildirimleri ekleme
- [ ] Telegram bot entegrasyonu
- [ ] Bildirim tercihleri (hangi bildirimleri almak ister)
- [ ] Toplu bildirim gönderme
- [ ] Bildirim geçmişi sayfası

## 📝 Notlar

- Bildirimler her 30 saniyede bir kontrol edilir
- Admin online değilse, giriş yaptığında bildirimleri görür
- Service Worker tarayıcı kapansa bile çalışır
- FCM token'ları periyodik olarak yenilenebilir

## 🆘 Destek

Sorun yaşarsanız:
1. Browser Console'u kontrol edin (F12)
2. Firebase Console > Firestore > Data'yı kontrol edin
3. Network sekmesinde API isteklerini kontrol edin
