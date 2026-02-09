# Firebase Güvenlik Kuralları Kurulum Kılavuzu

Bu dosya, Firestore güvenlik kurallarının nasıl ayarlanacağını açıklar.

## Firestore Güvenlik Kurallarını Ayarlama

1. **Firebase Console'a gidin**: https://console.firebase.google.com/
2. Projenizi seçin (drmws-78227)
3. Sol menüden **Firestore Database** seçeneğine tıklayın
4. **Rules** (Kurallar) sekmesine tıklayın
5. Mevcut kuralları silin ve `firestore.rules` dosyasındaki kuralları yapıştırın
6. **Publish** (Yayınla) butonuna tıklayın

## Güvenlik Kurallarının Açıklaması

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /kalite-kayitlari/{document=**} {
      // Herkes okuyabilir (authenticated kullanıcılar)
      allow read: if request.auth != null;
      
      // Sadece admin yazabilir (create, update, delete)
      allow write: if request.auth != null && 
                     request.auth.token.email == 'fatihgural80@gmail.com';
    }
  }
}
```

### Kuralların İşlevi:

- **allow read**: Giriş yapmış tüm kullanıcılar verileri okuyabilir
- **allow write**: Sadece `fatihgural80@gmail.com` email adresine sahip kullanıcı veri ekleyebilir, düzenleyebilir ve silebilir

## Yerel Test (Opsiyonel)

Firebase Emulator kullanarak yerel olarak test edebilirsiniz:

```bash
npm install -g firebase-tools
firebase login
firebase init emulators
firebase emulators:start
```

## Doğrulama

Kuralları yayınladıktan sonra:

1. Admin olmayan bir hesapla giriş yapın
2. Görev eklemeye çalışın - hata almalısınız
3. Admin hesabıyla (fatihgural80@gmail.com) giriş yapın
4. Görev eklemeyi deneyin - başarılı olmalı

## Önemli Notlar

- Bu kurallar sadece Firestore için geçerlidir
- Storage kullanıyorsanız, ayrı storage.rules dosyası oluşturmalısınız
- Kuralları test etmek için Firebase Console'daki Rules Playground'u kullanabilirsiniz
