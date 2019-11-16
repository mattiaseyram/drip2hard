import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';

const userRef = id => db.collection('users').doc(id);

export function useUser() {
    const [state, setState] = useState({user: null, profile: null});

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                userRef(user.uid).onSnapshot(doc => {
                    const profile = doc.data();
                    setState({ user, profile })
                })
            } else {
                setState({user: null, profile: null});
            }
        });
    }, []);

    return state;
}