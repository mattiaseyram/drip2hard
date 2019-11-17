import React, { useState, useEffect } from 'react';
import { Field, Control, Select, Label, Input } from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import { genders, userTypes } from '../utils/constants';

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

export default function AccountForm({ buttonLabel, user, profile, action, includeEmailPassword }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState({ nickname: '', user_type: userTypes[0], gender: genders[0], age: '0' });

    useEffect(() => {
        const nickname = profile ? profile.nickname : '';
        const user_type = profile ? profile.user_type : userTypes[0];
        const gender = profile ? profile.gender : genders[0];
        const age = profile ? profile.age : '0';
        setState(state => ({ ...state, nickname, user_type, gender, age }));
    }, [profile]);

    const handleAction = () => includeEmailPassword ? action(email, password, state) : action(state);

    return (
        <>
            {includeEmailPassword && myField('Email', email, setEmail)}
            {includeEmailPassword && myField('Password', password, setPassword, { type: 'password' })}
            {myField('Nickname', state.nickname, nickname => setState({ ...state, nickname }))}
            {myField('Age', state.age, age => setState({ ...state, age }))}
            {mySelectField('User Type', state.user_type, user_type => setState({ ...state, user_type }), userTypes)}
            {mySelectField('Gender', state.gender, gender => setState({ ...state, gender }), genders)}
            {myButton(buttonLabel, handleAction)}
        </>
    );
}