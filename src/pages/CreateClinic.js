import React, { useContext } from 'react';
import { createClinic } from '../utils/actions';
import { FirestoreContext } from '../utils/context';
import ClinicForm from '../components/ClinicForm';

export default function CreateClinic() {

    const { user } = useContext(FirestoreContext);

    const formProps = {
        buttonLabel: 'Create Clinic',
        action: createClinic,
        includeID: true
    };

    return (
        <div className="Page">
            {user
                ? <ClinicForm {...formProps} />
                : <p>You are not signed in!</p>
            }
        </div>
    );
}