import React, { useState, useEffect } from 'react';
import { Field, Control, Label, Input } from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';

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

export default function AccountForm({ buttonLabel, user, profile, action, includeEmailPassword }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState({ nickname: '' });

    useEffect(() => {
        const nickname = profile ? profile.nickname : '';
        setState(state => ({ ...state, nickname }));
    }, [profile]);

    const handleAction = () => includeEmailPassword ? action(email, password, state) : action(state);

    return (
        <>
            {includeEmailPassword && myField('Email', email, setEmail)}
            {includeEmailPassword && myField('Password', password, setPassword, { type: 'password' })}
            {myField('Nickname', state.nickname, nickname => setState({ ...state, nickname }))}
            {myButton(buttonLabel, handleAction)}
        </>
    );
}