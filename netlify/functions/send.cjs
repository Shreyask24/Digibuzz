const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function handler(event) {
  console.log("Function hit!", event.body);

  try {
    const body = JSON.parse(event.body);

    const message = {
      token: body.token,
      data: {
        title: body.title,
        body: body.body,
      },
    };

    const response = await admin.messaging().send(message);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        response,
      }),
    };
  } catch (error) {
    console.log("Function error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
}
