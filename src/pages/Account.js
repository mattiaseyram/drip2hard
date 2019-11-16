import React, { useContext } from 'react';
import { updateUser } from '../utils/actions';
import { FirestoreContext } from '../utils/context';
import AccountForm from '../components/AccountForm';

export default function Account() {

    const { user, profile } = useContext(FirestoreContext);

    const formProps = {
        buttonLabel: 'Update Account',
        action: updateUser,
        user,
        profile
    };

    return (
        <div className="Page">
            {user
                ? <AccountForm {...formProps} />
                : <p>You are not signed in!</p>
            }
        </div>
    );
}