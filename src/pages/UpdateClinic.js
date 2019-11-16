import React, { useContext } from 'react';
import { updateClinic } from '../utils/actions';
import { FirestoreContext } from '../utils/context';
import ClinicForm from '../components/ClinicForm';

export default function CreateClinic({ clinicId = '' }) {

    const { user, clinic, setClinicId } = useContext(FirestoreContext);

    // if (!clinic && clinicId !== clinic.id) setClinicId(clinicId);
    if (!clinic) setClinicId(clinicId);

    const formProps = {
        buttonLabel: 'Update Clinic',
        action: updateClinic,
        clinic,

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