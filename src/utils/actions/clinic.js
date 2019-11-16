import { auth, db } from '../firebase';

const clinicsRef = db.collection('clinics');
const clinicRef = id => clinicsRef.doc(id);

export const createClinic = async (data = {}) => {
    try {
        const user = auth.currentUser;
        await clinicRef(data.id).set({ ...data, user_id: user.uid });
    } catch (err) {
        console.error(err);
    }
};

export const updateClinic = async (data = {}, id = '') => {
    try {
        await clinicRef(id || data.id).update({ ...data });
    } catch (err) {
        console.error(err);
    }
};