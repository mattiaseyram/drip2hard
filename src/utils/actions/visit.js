import { auth, db } from '../firebase';

const visitsRef = db.collection('visits');
const visitRef = id => visitsRef.doc(id);

export const createVisit = async (data = {}, clinicId) => {
    try {
        const user = auth.currentUser;
        const doc = visitsRef.doc();
        await doc.set({ ...data, id: doc.id, user_id: user.uid, clinic_id: clinicId });
    } catch (err) {
        console.error(err);
    }
};

export const updateVisit = async (data = {}, id = '') => {
    try {
        await visitRef(id || data.id).update({ ...data });
    } catch (err) {
        console.error(err);
    }
};
