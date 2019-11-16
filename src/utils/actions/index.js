import { auth, db, functions } from '../firebase';

const usersRef = db.collection('users');
const userRef = id => db.collection('users').doc(id);

export const signInWithEmailAndPassword = async (email, password) => {
    try {  
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        console.error(err);
    }
};

export const signOut = async () => {
    try {
        await auth.signOut();
    } catch (err) {
        console.error(err);
    }
};

export const createUserWithEmailAndPassword = async (email, password, data = {}) => {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        await usersRef.doc(user.uid).set({ ...data, email });
    } catch (err) {
        console.error(err);
    }
};

export const updateUser = async (data) => {
    try {
        const user = auth.currentUser;
        await userRef(user.uid).update({ ...data });
    } catch (err) {
        console.error(err);
    }
};

export const callHelloWorld = async () => {
    try {
        const result = await functions.httpsCallable('helloWorld')({});
        return result.data.message;
    } catch (err) {
        console.error(err);
        return null;
    }
}