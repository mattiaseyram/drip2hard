import { auth, db } from '../firebase';
import { googleMapsApiKey } from '../keys';

const clinicsRef = db.collection('clinics');
const clinicRef = id => clinicsRef.doc(id);

export const createClinic = async (data = {}) => {
    try {
        const user = auth.currentUser;
        const coords = await getCoordsFromAddress(data.address);
        await clinicRef(data.id).set({ ...data, ...coords, user_id: user.uid });
    } catch (err) {
        console.error(err);
    }
};

export const updateClinic = async (data = {}, id = '') => {
    try {
        const coords = await getCoordsFromAddress(data.address);
        await clinicRef(id || data.id).update({ ...data, ...coords });
    } catch (err) {
        console.error(err);
    }
};

const getCoordsFromAddress = async (address) => {
    try {
        const cleanedAddress = address.replace(' ', '+').replace('&','+');
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${cleanedAddress}&key=${googleMapsApiKey}`);
        const json = await response.json();
        const coords = json.results[0].geometry.location;
        return { latitude: coords.lat, longitude: coords.lng };
    } catch (err) {
        console.log('Error retrieving coords from address');
        return { latitude: 0, longitude: 0 };
    }
}
