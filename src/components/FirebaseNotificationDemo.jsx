import { useState, useEffect } from "react";
import { requestPermission, startOnMessage } from "../firebase-config";

export default function FirebaseNotificationDemo() {
  const [token, setToken] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    requestPermission().then((fcmToken) => {
      if (fcmToken) setToken(fcmToken);
    });
  }, []);

  useEffect(() => {
    async function sendPush() {
      await fetch("/.netlify/functions/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token:
            "eErPaUvQG301Z5lB-MRrjo:APA91bFCc-SO6qjIXZhYL_iw1cIJvYlCpWTbqht4eLYxcvBGHWy8FBBB_mQwZNSUPGbDatamBRtACyIMrEj68BNXRCtTnyF5eoIzy9yAm7PFX0ZsZfTmujY",
          title: "Notification from Shreyas Kallurkar",
          body: "Works perfectly!",
        }),
      });
    }

    sendPush();
  }, []);

  useEffect(() => {
    const unsubscribe = startOnMessage((payload) => {
      console.log("📩 Foreground payload:", payload);

      const title =
        payload?.notification?.title || payload?.data?.title || "No title";
      const body =
        payload?.notification?.body || payload?.data?.body || "No body";

      setNotification({ title, body });
    });

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
