const functions = require('firebase-functions');
const admin = require('firebase-admin');

try {
    const serviceAccount = require('../serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.warn('Using ../serviceAccountKey');
} catch (err) {
    admin.initializeApp();
    console.warn('Initializing default firebase admin.');
}

exports.helloWorld = functions.https.onCall(async (data, context) => {
    try {
        const { name = "Anonymous" } = data;
        return { message: `Hello ${name}!`};
    } catch (err) {
        throw new functions.https.HttpsError('unknown', 'Error in helloWorld: ' + err.message);
    }
});