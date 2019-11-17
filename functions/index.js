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

const db = admin.firestore();

const clinicsRef = db.collection('clinics');
const clinicRef = id => clinicsRef.doc(id);

const visitsRef = db.collection('visits');
const visitRef = id => visitsRef.doc(id);

exports.helloWorld = functions.https.onCall(async (data, context) => {
    try {
        const { name = 'Anonymous' } = data;
        return { message: `Hello ${name}!` };
    } catch (err) {
        throw new functions.https.HttpsError('unknown', 'Error in helloWorld: ' + err.message);
    }
});


exports.callSetNextUp = functions.https.onCall(async (data, context) => {
    try {
        const { visit_id } = data;
        console.log(visit_id)
        const visit = (await visitRef(visit_id).get()).data();

        const { clinic_id } = visit;

        let visitIds = [];

        const snapshot = await visitsRef.orderBy("time", "asc").get();
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.clinic_id === clinic_id && data.status === 'new') {
                visitIds.push(doc.id);
            }
        });

        const nextVisitId = visitIds.length ? visitIds[0] : '';

        clinicRef(clinic_id).update({ next_visit_id: nextVisitId });

    } catch (err) {
        console.error('Error in callSetNextUp: ' + err.message);
    }
});

exports.setNextUp = functions.firestore.document('visits/{visit_id}').onWrite(async (change, context) => {
    try {
        const { visit_id } = context.params;
        console.log(visit_id)
        const visit = (await visitRef(visit_id).get()).data();

        const { clinic_id } = visit;

        let visitIds = [];
        
        const snapshot = await visitsRef.orderBy("time", "asc").get();
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.clinic_id === clinic_id && data.status === 'new') {
                visitIds.push(doc.id);
            }
        });

        const nextVisitId = visitIds.length ? visitIds[0] : '';

        clinicRef(clinic_id).update({ next_visit_id: nextVisitId });

    } catch (err) {
        console.error('Error in setNextUp: ' + err.message);
    }
});