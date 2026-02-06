// Firebase Configuration Template
// Bu dosya GitHub'a commitlenecek
// Gerçek değerler için firebase-config-private.js dosyasını oluşturun

export const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Kullanım için:
// 1. Bu dosyayı firebase-config-private.js olarak kopyalayın
// 2. firebase-config-private.js içindeki değerleri .env dosyanızdaki gerçek değerlerle değiştirin
// 3. firebase-config-private.js dosyası .gitignore'da olduğu için GitHub'a gönderilmeyecektir
