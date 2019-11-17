import React, { useContext, useState } from 'react';
import { createVisit } from '../utils/actions';
import { FirestoreContext } from '../utils/context';
import { Field, Control, Select, Label, Input } from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import { reasons } from '../utils/constants';

const initialState = {
    url: '',
    reason: reasons[0]
};

const myField = (label, value, onChange, inputProps = {}) => (
    <Field>
        <Label>{label}</Label>
        <Control>
            <Input value={value} onChange={evt => onChange(evt.target.value)} {...inputProps} />
        </Control>
    </Field>
);


const mySelectField = (label, value, onChange, options, inputProps = {}) => (
    <Field>
        <Label>{label}</Label>
        <Control>
            <Select value={value} onChange={evt => onChange(evt.target.value)} {...inputProps}>
                {options.map((item, i) => (<option key={i}>{item}</option>))}
            </Select>
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

    const { user, profile, clinic, setClinicId } = useContext(FirestoreContext);

    if (!clinic || clinic.id !== clinicId) setClinicId(clinicId);

    const [state, setState] = useState(initialState);

    const handleCreateVisit = () => createVisit(state, profile, clinicId);

    if (!user || !clinic) return (<p>You are not signed in!</p>);

    return (
        <div className="Page">
            {<Field><Label>{clinic.name}</Label></Field>}
            {mySelectField('Reason for Visit', state.reason, reason => setState({ ...state, reason }), reasons)}
            {myField('URL', state.url, url => setState({ ...state, url }))}
            {myButton('Create Visit', handleCreateVisit)}
        </div>
    );
}