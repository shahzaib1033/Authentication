var admin = require("firebase-admin");

var serviceAccount = require("./service-account/userauthentication-8ada4-firebase-adminsdk-dk5cg-ca04b7c50e.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Create a notification payload
const pushNotifications = async (token, title, body) => {
    const message = {
        token,
        notification: {
            title,
            body,
        },
    };
    // Send the notification
   return admin.messaging().send(message)
        .then((response) => {
            return console.log('Successfully sent notification:\n', response);
        })
        .catch((error) => {
            return console.log('Error sending notification:\n', error);
        });
}

module.exports = pushNotifications;