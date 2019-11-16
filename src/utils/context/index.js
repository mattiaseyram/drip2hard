import { createContext } from 'react';

export const FirestoreContext = createContext({user: null, profile: null, clinic: null, visits: null });