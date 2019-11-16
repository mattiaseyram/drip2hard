import React, { useState, useEffect } from 'react';
import { Field, Control, Label, Input } from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';

const initialState = {
    id: '',
    name: '',
    address: '',
    doctor_ids: ''
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

export default function ClinicForm({ buttonLabel, clinic, action, includeID }) {
    const [state, setState] = useState(initialState);

    const handleAction = () => action(state);

    useEffect(() => {
        if (!clinic) return;
        setState(state => ({ ...state, ...clinic }));
    }, [clinic]);

    return (
        <>
            {includeID && myField('ID', state.id, id => setState({ ...state, id }))}
            {myField('Name', state.name, name => setState({ ...state, name }))}
            {myField('Address', state.address, address => setState({ ...state, address }))}
            {myField('Doctors', state.doctor_ids, doctor_ids => setState({ ...state, doctor_ids }))}
            {myButton(buttonLabel, handleAction)}
        </>
    );
}