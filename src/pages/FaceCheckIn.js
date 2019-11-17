import React, { useState, useContext } from 'react';
import { FirestoreContext } from '../utils/context';
import SavePhoto from '../components/SavePhoto';
import { functions } from '../utils/firebase';
import Section from 'react-bulma-components/lib/components/section';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';
import Box from 'react-bulma-components/lib/components/box';
import Hero from 'react-bulma-components/lib/components/hero';
import Container from 'react-bulma-components/lib/components/container';
import QueueItem from 'components/QueueItem';

export default function FaceCheckIn() {

    const { profiles, visits } = useContext(FirestoreContext);

    const [state, setState] = useState({ profile: null, visits: null });

    const profileIds = profiles && Object.keys(profiles);
    const visitsArr = visits && Object.values(visits);

    const retrieveProfile = async (image_url2) => {
        if (!image_url2) return;

        const profilesArr = await Promise.all(profileIds
            .map(async id => {
                const profile = profiles[id];

                let confidence = 0;

                if (profile.photo) {
                    try {
                        const image_url1 = profile.photo;
                        const result = await functions.httpsCallable('compareImages')({ image_url1, image_url2 });
                        confidence = result.data.confidence;
                        console.log('Face Lookup Result: ', profile.nickname, confidence, result, image_url1, image_url2);
                    } catch (err) {
                        console.error(err)
                    }
                }

                return { ...profile, confidence };
            }));

        const max = profilesArr.reduce((a, b) => (a.confidence > b.confidence ? a : b));
        return max.confidence > 50 ? max : null;
    };

    const getVisits = async (photo) => {
        const profile = await retrieveProfile(photo);
        if (!profile || !visits) {
            setState({ profile: null, visits: null });
            return;
        }

        const filteredVisits = visitsArr.filter(visit => visit.user_id === profile.id);
        setState({ profile, visits: filteredVisits });
    }

    const queueItems = state.visits && state.visits.map((visit, i) => (<QueueItem visit={{ ...visit, profile: state.profile }} key={i} />));

    return (
        <div className="Page">
            <Section>
                <Hero color="primary" >
                    <Hero.Body>
                        <Container>
                            <Heading>Check In</Heading>
                            {state.profile && <Heading subtitle size={3}>{`Hello ${state.profile.nickname}.`}</Heading>}
                        </Container>
                    </Hero.Body>
                </Hero>

                <Box className="level-hover">
                    <SavePhoto setPhoto={getVisits} />
                </Box>
            </Section>
            {state.profile &&
                <Section>
                    <Content>
                        <h2>Upcoming visits</h2>
                        {queueItems}
                    </Content>
                </Section>}
        </div>
    );
}