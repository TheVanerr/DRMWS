const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Firestore'da yeni notification oluşturulduğunda tetiklenecek
exports.sendNotificationOnCreate = functions.firestore
  .document('notifications/{notificationId}')
  .onCreate(async (snap, context) => {
    const notification = snap.data();
    
    console.log('New notification:', notification);
    
    try {
      // Admin kullanıcının FCM token'ını al
      const usersSnapshot = await admin.firestore()
        .collection('users')
        .where('email', '==', notification.recipientEmail)
        .get();
      
      if (usersSnapshot.empty) {
        console.log('No user found with email:', notification.recipientEmail);
        return null;
      }
      
      const tokens = [];
      usersSnapshot.forEach(doc => {
        const fcmToken = doc.data().fcmToken;
        if (fcmToken) {
          tokens.push(fcmToken);
        }
      });
      
      if (tokens.length === 0) {
        console.log('No FCM tokens found');
        return null;
      }
      
      // FCM mesajı oluştur
      const message = {
        notification: {
          title: notification.title || 'Yeni Bildirim',
          body: notification.body || 'Görev Takip'
        },
        data: {
          type: notification.type || 'general',
          url: notification.url || '/',
          timestamp: new Date().toISOString()
        },
        tokens: tokens
      };
      
      // FCM'e gönder
      const response = await admin.messaging().sendEachForMulticast(message);
      
      console.log('Successfully sent notification:', response.successCount, 'success,', response.failureCount, 'failed');
      
      // Notification'ı sent olarak işaretle
      await snap.ref.update({
        sent: true,
        sentAt: admin.firestore.FieldValue.serverTimestamp(),
        successCount: response.successCount,
        failureCount: response.failureCount
      });
      
      return response;
      
    } catch (error) {
      console.error('Error sending notification:', error);
      
      // Hatayı kaydet
      await snap.ref.update({
        error: error.message,
        sent: false
      });
      
      return null;
    }
  });

// Görev eklendiğinde admin'e bildirim gönder
exports.notifyAdminOnTaskCreate = functions.firestore
  .document('kalite-kayitlari/{taskId}')
  .onCreate(async (snap, context) => {
    const task = snap.data();
    
    console.log('New task created:', task);
    
    try {
      // Admin e-posta adresi
      const adminEmail = 'fatihgural80@gmail.com';
      
      // Bildirim oluştur
      await admin.firestore().collection('notifications').add({
        recipientEmail: adminEmail,
        title: '🔔 Yeni Görev Eklendi',
        body: `${task.personel || 'Bilinmeyen'} için yeni görev: ${task.görev || 'Görev'}`,
        type: 'task_created',
        taskId: context.params.taskId,
        url: '/',
        read: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      console.log('Notification created for admin');
      return true;
      
    } catch (error) {
      console.error('Error creating notification:', error);
      return null;
    }
  });
