import { useState, useEffect } from "react";
import { requestPermission, startOnMessage } from "../firebase-config";

export default function FirebaseNotificationDemo() {
  const [token, setToken] = useState("");
  const [notification, setNotification] = useState(null);

  // 1) Ask permission and get token on mount
  useEffect(() => {
    requestPermission().then((fcmToken) => {
      if (fcmToken) setToken(fcmToken);
    });
  }, []);

  async function sendPush() {
    await fetch("/.netlify/functions/send", {
      method: "POST",
      body: JSON.stringify({
        token:
          "erhStTgkTL89GAMYFv98Ns:APA91bH7IXZQlEsCE3z4ZKtoWTwesEIvrWKPy4MsIXUbduzicArVjN-7kx9tm84cQYeecR_o58WvscaF8oCOesCXT4zAdA_PoJZlG0xk4hapsome2gO6ZkU",
        title: "Notification from Netlify",
        body: "Works perfectly!",
      }),
    });
  }

  // 2) Listen for foreground messages (cleanly)
  useEffect(() => {
    const unsubscribe = startOnMessage((payload) => {
      // 👉 Debug: log entire payload so you can inspect structure
      console.log("📩 Foreground payload:", payload);

      // Many payloads put data in payload.data (data-only), or payload.notification
      const title =
        payload?.notification?.title || payload?.data?.title || "No title";
      const body =
        payload?.notification?.body || payload?.data?.body || "No body";

      setNotification({ title, body });
    });

    // Cleanup the listener when component unmounts
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  const sendDemoNotification = () => {
    setNotification({
      title: "Demo Notification",
      body: "This is a front-end demo notification",
    });
  };

  const crash = () => {
    // Simulate crash (don't wrap in alert; throw simple error)
    throw new Error("Simulated crash for Crashlytics test");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-900 text-white p-6 rounded-2xl shadow-lg text-center">
      <h2 className="text-xl font-semibold mb-4">
        Firebase Notifications Demo
      </h2>

      {token ? (
        <p className="text-xs text-gray-400 mb-4 break-all">{token}</p>
      ) : (
        <p className="text-sm text-gray-500 mb-4">Waiting for permission...</p>
      )}

      <div className="flex flex-col gap-3 items-center">
        <button
          onClick={sendDemoNotification}
          className="bg-indigo-600 px-6 py-2 rounded-lg"
        >
          Send Test Notification
        </button>

        <button onClick={crash} className="bg-red-600 px-6 py-2 rounded-lg">
          Simulate Crash
        </button>
      </div>

      {notification && (
        <div className="mt-6 bg-gray-800 border border-gray-700 rounded-xl p-4 text-left">
          <p className="text-lg font-semibold text-indigo-400">
            {notification.title}
          </p>
          <p className="text-gray-300">{notification.body}</p>
        </div>
      )}
    </div>
  );
}
