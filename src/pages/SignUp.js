import React, { useContext } from 'react';
import { createUserWithEmailAndPassword } from '../utils/actions';
import { FirestoreContext } from '../utils/context';
import AccountForm from '../components/AccountForm';

export default function SignUp() {

    const { user, profile } = useContext(FirestoreContext);

    const formProps = {
        buttonLabel: 'Create Account',
        action: createUserWithEmailAndPassword,
        user,
        profile,
        includeEmailPassword: true
    };

    return (
        <div className="Page">
            {user
                ? <p>You are signed in!</p>
                : <AccountForm {...formProps} />
            }
        </div>
    );
}