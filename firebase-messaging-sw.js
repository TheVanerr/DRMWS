// Firebase Messaging Service Worker
// Bu dosya tarayıcı kapalıyken veya arka plandayken bildirimleri alır

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTYYB7nfFwwlBFaZ67pjPcv2yrOVk511I",
  authDomain: "drmws-78227.firebaseapp.com",
  projectId: "drmws-78227",
  storageBucket: "drmws-78227.firebasestorage.app",
  messagingSenderId: "68627643543",
  appId: "1:68627643543:web:dbbd6388c144d169a3bdd2"
};

// Firebase'i başlat
firebase.initializeApp(firebaseConfig);

// Messaging instance'ı al
const messaging = firebase.messaging();

// Arka plan mesajlarını yakala
messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);
  
  const notificationTitle = payload.notification.title || 'Yeni Bildirim';
  const notificationOptions = {
    body: payload.notification.body || 'Yeni bir görev eklendi',
    icon: '🔔',
    badge: '🔔',
    tag: payload.data?.taskId || 'notification',
    requireInteraction: true,
    data: payload.data
  };

  // Bildirimi göster
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Bildirime tıklandığında
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  // Uygulamayı aç veya focus et
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Açık bir sekme varsa onu focus et
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url.indexOf(self.location.origin) !== -1 && 'focus' in client) {
          return client.focus();
        }
      }
      
      // Açık sekme yoksa yeni sekme aç
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
