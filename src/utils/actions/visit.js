import { auth, db } from '../firebase';
import { genders, reasons } from '../constants';

const visitsRef = db.collection('visits');
const visitRef = id => visitsRef.doc(id);

export const createVisit = async (data, profile, clinicId) => {
    try {
        const user = auth.currentUser;
        const doc = visitsRef.doc();
        const time = new Date();

        const visit = {
            ...data,
            id: doc.id,
            user_id: user.uid,
            clinic_id: clinicId,
            time,
            status: 'new'
        };

        const expected_minutes = await getExpectedTime(visit, profile) || 30;

        const expected_time = new Date(time.getTime() + expected_minutes * 60000);

        await doc.set({ ...visit, expected_minutes, expected_time });
    } catch (err) {
        console.error(err);
    }
};

export const updateVisit = async (data = {}, id = '') => {
    try {
        let visitData = { ...data };
        delete visitData.time;
        delete visitData.profile;
        await visitRef(id || data.id).update(visitData);
    } catch (err) {
        console.error(err);
    }
};

// gender: [0, 1]
// age: [0, 90]
// clinic: [0, 4]
// Date: no range but are all in 2019(also no timestamp, just date)
// dropdown reason: [0, 4]


export const getExpectedTime = async (visit, profile) => {
    try {
        const gender = genders.findIndex(item => item === profile.gender);
        const age = parseInt(profile.age || 0);
        const clinic = 0;
        const date = visit.time.toISOString().slice(0,10);
        const dropdown = reasons.findIndex(item => item === visit.reason);
    
        const payload = {
            gender: gender === -1 ? 0 : gender,
            age,
            clinic,
            dropdown: dropdown === -1 ? 0 : dropdown,
            date
        };
    
        const result = await fetch(
            visit.url,
            {
                method: 'POST',
                body: JSON.stringify(payload),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Headers': "*"
                },
            });

        const json = await result.json();

        const prediction = parseInt(json.prediction);
        console.log('prediction:', prediction);

        return prediction;

    } catch (err) {
        console.error(err);
    }
};
