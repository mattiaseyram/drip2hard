import React, { useContext, useState } from 'react';
import { createVisit } from '../utils/actions';
import { FirestoreContext } from '../utils/context';
import { Field, Control, Label, Input } from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';

const initialState = {
    reason: ''
};

const myField = (label, value, onChange, inputProps = {}) => (
    <Field>
        <Label>{label}</Label>
        <Control>
            <Input value={value} onChange={evt => onChange(evt.target.value)} {...inputProps} />
        </Control>
    </Field>
);

const myButton = (label, action, inputProps = {}) => (
    <Field kind="group">
        <Control>
            <Button type="primary" onClick={action} {...inputProps}>{label}</Button>
        </Control>
    </Field>
);

export default function BookVisit({ clinicId }) {

    const { user, clinic, setClinicId } = useContext(FirestoreContext);

    if (!clinic || clinic.id !== clinicId) setClinicId(clinicId);

    const [state, setState] = useState(initialState);
    
    const handleCreateVisit = () => createVisit(state, clinicId);

    if (!user || !clinic) return (<p>You are not signed in!</p>);

    return (
        <div className="Page">
            {<Field><Label>{clinic.name}</Label></Field>}
            {myField('Reason', state.reason, reason => setState({ ...state, reason }))}
            {myButton('Create Visit', handleCreateVisit)}
        </div>
    );
}