import { firebaseConfig } from './keys';
import firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/firestore';
import 'firebase/auth';

const app = firebase.initializeApp(firebaseConfig);

if (process.env.REACT_APP_LOCAL_FUNCTIONS === "true") {
    console.warn('React app started using local functions.');
    app.functions().useFunctionsEmulator('http://localhost:5000');
}

export default app;
export const functions = app.functions();
export const db = app.firestore();
export const auth = app.auth();