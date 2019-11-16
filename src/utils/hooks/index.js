import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';

const usersRef = db.collection('users');
const userRef = id => usersRef.doc(id);

export function useUser() {
    const [state, setState] = useState({ user: null, profile: null });

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                userRef(user.uid).onSnapshot(doc => {
                    const profile = doc.data();
                    setState({ user, profile })
                })
            } else {
                setState({ user: null, profile: null });
            }
        });
    }, []);

    return state;
}

const clinicsRef = db.collection('clinics');
//const clinicRef = id => clinicsRef.doc(id);

export function useClinic(clinicId = '') {
    const [state, setState] = useState({ clinics: null, clinic: null });

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                clinicsRef.onSnapshot(querySnapshot => {
                    let clinics = {};
                    querySnapshot.forEach(doc => {
                        clinics[doc.id] = doc.data();
                    });

                    const clinic = clinicId ? clinics[clinicId] : null;
                    setState({ clinics, clinic })
                });
            } else {
                setState({ clinics: null, clinic: null });
            }
        });
    }, [clinicId]);

    return state;
}