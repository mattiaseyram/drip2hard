import { auth, db } from '../firebase';

const visitsRef = db.collection('visits');
const visitRef = id => visitsRef.doc(id);

export const createVisit = async (data = {}, clinicId) => {
    try {
        const user = auth.currentUser;
        const doc = visitsRef.doc();
        const time = new Date();
        await doc.set({ ...data, id: doc.id, user_id: user.uid, clinic_id: clinicId, time, status: 'new' });
    } catch (err) {
        console.error(err);
    }
};

export const updateVisit = async (data = {}, id = '') => {
    try {
        let visitData = {...data};
        delete visitData.time;
        await visitRef(id || data.id).update(visitData);
    } catch (err) {
        console.error(err);
    }
};
