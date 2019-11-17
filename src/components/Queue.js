import React, { useContext } from 'react';
import Section from 'react-bulma-components/lib/components/section'
import { FirestoreContext } from '../utils/context'
import { useTime } from '../utils/hooks'
import QueueItem from './QueueItem'
import Content from 'react-bulma-components/lib/components/content';

const Queue = () => {
  const { visits, profiles, clinic } = useContext(FirestoreContext)
  const { time } = useTime();
  const visitsArr = visits && Object.values(visits)

  const queueItems = (visitsArr || [])
    .filter(visit => visit.clinic_id === clinic.id)
    .map(visit => ({
      ...visit,
      profile: { ...profiles[visit.user_id] }
    }))
    .map((visit, i) => (
      <QueueItem visit={visit} key={i} />
    ));

  const formattedTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

  return (
    <Section>

      <Content>
        <h2>Current time</h2>
        {formattedTime}
      </Content>

      <Content>
        <h2>Currently serving</h2>
      </Content>

      <Content>
        <h2>Upcoming visits</h2>
      </Content>

      {queueItems}
    </Section>
  )
};

export default Queue