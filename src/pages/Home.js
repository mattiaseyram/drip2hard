import React, { useState, useContext } from 'react';
import Level from 'react-bulma-components/lib/components/level';
import { Field, Control, Input } from 'react-bulma-components/lib/components/form';
import Heading from 'react-bulma-components/lib/components/heading';
import Button from 'react-bulma-components/lib/components/button';
import Box from 'react-bulma-components/lib/components/box';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container'
import { callHelloWorld } from '../utils/actions';
import { FirestoreContext } from '../utils/context';
import Hero from 'react-bulma-components/lib/components/hero';
import QueueItem from '../components/QueueItem'



export default function Home() {

    const { profile, visits } = useContext(FirestoreContext);
    console.log(profile)
    const visitsArr = visits && Object.values(visits)
    const profileArr = profile && Object.values(profile)

    return (
        <div className="page">
            <Section>
                <Hero color="info" >
                    <Hero.Body>
                        <Container>
                            <Heading>
                                Welcome {profile && profile.nickname}!
                             </Heading>
                        </Container>
                    </Hero.Body>

                </Hero>
                <br />
                <Heading>
                    Your booked visits
                </Heading>
                {
                    visitsArr && visitsArr.filter(v => v.user_id === profile.id).map(visit => ({
                        ...visit,
                        profile: { ...profile[visit.user_id] }
                      })).map((v,i) =>  <QueueItem visit={v} key={i} />)
                }
            </Section>
        </div>
    );
}