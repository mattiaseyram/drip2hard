import { functions } from '../firebase';

export const callHelloWorld = async () => {
    try {
        const result = await functions.httpsCallable('helloWorld')({});
        return result.data.message;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export * from './user';
export * from './clinic';