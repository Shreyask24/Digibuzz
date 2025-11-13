// firebase-config.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAQEC8jo239nKLmRgp0ZLNDi5oVOLBENc8",
  authDomain: "notification-478e5.firebaseapp.com",
  projectId: "notification-478e5",
  storageBucket: "notification-478e5.firebasestorage.app",
  messagingSenderId: "711434285265",
  appId: "1:711434285265:web:e03ca7fe80065feddd55f0",
  measurementId: "G-HZXTVSRT2P",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// Request permission and return token (or null)
export async function requestPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission not granted");
      return null;
    }
    const token = await getToken(messaging, {
      vapidKey:
        "BGdqXwGRo-7HSigS4DeAJOjd8et1cDcQrHiflinC7_i-fH5WBZJu4GEpz5suE5AdZKqQEYdVooIVPR0Fg7FevZQ",
    });
    console.log("FCM Token:", token);
    return token;
  } catch (err) {
    console.error("requestPermission error:", err);
    return null;
  }
}

// Start listening for foreground messages.
// Returns the unsubscribe function from onMessage so caller can clean up.
export function startOnMessage(callback) {
  // onMessage returns an unsubscribe function
  return onMessage(messaging, (payload) => {
    // payload could contain either `notification` or `data` fields.
    callback(payload);
  });
}
