import React, { useState, useContext, useEffect } from 'react';
import { Field, Control, Label, Input } from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import { updateUser } from '../utils/actions';
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

    const { user, profile } = useContext(UserContext);

    const [data, setData] = useState({ nickname: '' });

    useEffect(() => {
        const nickname = profile ? profile.nickname : '';
        setData(data => ({ ...data, nickname }));
    }, [profile]);

    const handleUpdateUser = () => updateUser(data);

    return (
        <div className="Page">
            {user
                ? <>
                    {myField('Nickname', data.nickname, nickname => setData({ ...data, nickname }))}
                    <Field kind="group">
                        <Control>
                            <Button type="primary" onClick={handleUpdateUser}>Update Account</Button>
                        </Control>
                    </Field>
                </>
                : <p>You are signed not in!</p>
            }
        </div>
    );
}