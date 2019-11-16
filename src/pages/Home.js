import React, { useState, useContext } from 'react';
import Level from 'react-bulma-components/lib/components/level';
import { Field, Control, Input } from 'react-bulma-components/lib/components/form';
import Heading from 'react-bulma-components/lib/components/heading';
import Button from 'react-bulma-components/lib/components/button';
import Box from 'react-bulma-components/lib/components/box';
import Section from 'react-bulma-components/lib/components/section';
import { callHelloWorld } from '../utils/actions';
import { UserContext } from '../utils/context';

function FunctionSection({ label, message, action }) {
    return (
        <Section>
            <Box>
                <Level>
                    <Level.Side align="left">
                        <Level.Item>
                            <Heading size={5} subtitle>{label}</Heading>
                        </Level.Item>
                        <Level.Item>
                            <Field kind="addons">
                                <Button onClick={action}>Call</Button>
                            </Field>
                        </Level.Item>
                    </Level.Side>

                    <Level.Side align="right" className="is-fullwidth">
                        <Level.Item>
                            <Field kind="addons">
                                <Control>
                                    <Input placeholder="Message" value={message} readOnly />
                                </Control>
                            </Field>
                        </Level.Item>
                    </Level.Side>
                </Level>
            </Box>
        </Section>
    )
};

export default function Home() {

    const { profile } = useContext(UserContext);

    const [message, setMessage] = useState('');

    const handleCallHelloWorld = async () => {
        let data = {};
        if (profile && profile.nickname) data.nickname = profile.nickname;
        const result = await callHelloWorld({ data });
        setMessage(result);
    };

    return (
        <div className="page">
            <FunctionSection {...{ label: 'helloWorld', message, action: handleCallHelloWorld }} />
        </div>
    );
}