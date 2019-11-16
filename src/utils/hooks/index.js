import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';

const usersRef = db.collection('users');
//const userRef = id => usersRef.doc(id);

export function useUser() {
    const [state, setState] = useState({ user: null, profile: null, profiles: null });

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                usersRef.onSnapshot(querySnapshot => {
                    let profiles = {};
                    querySnapshot.forEach(doc => {
                        profiles[doc.id] = {...doc.data(), id: doc.id};
                    });

                    const profile = profiles[user.uid];
                    setState({ user, profile, profiles });
                });
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


const visitsRef = db.collection('visits');
//const visitRef = id => clinicsRef.doc(id);

export function useVisit(visitId = '') {
    const [state, setState] = useState({ visits: null, visit: null });

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                visitsRef.onSnapshot(querySnapshot => {
                    let visits = {};
                    querySnapshot.forEach(doc => {
                        visits[doc.id] = doc.data();
                    });

                    const visit = visitId ? visits[visitId] : null;
                    setState({ visits, visit })
                });
            } else {
                setState({ visits: null, visit: null });
            }
        });
    }, [visitId]);

    return state;
}