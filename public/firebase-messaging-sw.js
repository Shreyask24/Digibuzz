importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAQEC8jo239nKLmRgp0ZLNDi5oVOLBENc8",
  authDomain: "notification-478e5.firebaseapp.com",
  projectId: "notification-478e5",
  storageBucket: "notification-478e5.firebasestorage.app",
  messagingSenderId: "711434285265",
  appId: "1:711434285265:web:e03ca7fe80065feddd55f0",
  measurementId: "G-HZXTVSRT2P",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});
