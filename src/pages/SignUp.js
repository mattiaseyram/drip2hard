import React, { useState, useContext } from 'react';
import { Field, Control, Label, Input } from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import { createUserWithEmailAndPassword } from '../utils/actions';
import { UserContext } from '../utils/context';

const myField = (label, value, onChange, inputProps = {}) => (
    <Field>
        <Label>{label}</Label>
        <Control>
            <Input value={value} onChange={evt => onChange(evt.target.value)} {...inputProps} />
        </Control>
    </Field>
);

export default function SignUp() {

    const { user } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState({nickname: ''});

    const handleCreateUser = () => createUserWithEmailAndPassword(email, password, data);

    return (
        <div className="Page">
            {user
                ? <p>You are signed in!</p>
                : <>
                    {myField('Email', email, setEmail)}
                    {myField('Password', password, setPassword, { type: 'password' })}
                    {myField('Nickname', data.nickname, nickname => setData({...data, nickname}))}
                    <Field kind="group">
                        <Control>
                            <Button type="primary" onClick={handleCreateUser}>Sign Up</Button>
                        </Control>
                    </Field>
                </>
            }
        </div>
    );
}