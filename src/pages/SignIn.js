import React, { useState, useContext } from 'react';
import { Field, Control, Label, Input } from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import { signInWithEmailAndPassword } from '../utils/actions';
import { FirestoreContext } from '../utils/context';

const myField = (label, value, onChange, inputProps = {}) => (
    <Field>
        <Label>{label}</Label>
        <Control>
            <Input value={value} onChange={evt => onChange(evt.target.value)} {...inputProps} />
        </Control>
    </Field>
);

export default function SignIn() {

    const { user } = useContext(FirestoreContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => signInWithEmailAndPassword(email, password);

    return (
        <div className="Page">
            {user
                ? <p>You are signed in!</p>
                : <>
                    {myField('Email', email, setEmail)}
                    {myField('Password', password, setPassword, { type: 'password' })}
                    <Field kind="group">
                        <Control>
                            <Button type="primary" onClick={handleSignIn}>Sign In</Button>
                        </Control>
                    </Field>
                </>
            }
        </div>
    );
}