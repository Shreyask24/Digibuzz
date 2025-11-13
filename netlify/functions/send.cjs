// send.cjs
const admin = require("firebase-admin");
const serviceAccount = require("../functions/service-account.json");

// Initialize admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Replace this FCM token
const userToken =
  "erhStTgkTL89GAMYFv98Ns:APA91bH7IXZQlEsCE3z4ZKtoWTwesEIvrWKPy4MsIXUbduzicArVjN-7kx9tm84cQYeecR_o58WvscaF8oCOesCXT4zAdA_PoJZlG0xk4hapsome2gO6ZkU";

const message = {
  token: userToken,
  data: {
    title: "Real Notification Test",
    body: "This is sent from Node.js (send.cjs)",
  },
};

admin
  .messaging()
  .send(message)
  .then((res) => console.log("Successfully sent:", res))
  .catch((err) => console.error("Error sending:", err));
