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

  const nextVisit = clinic.next_visit_id && visits && visits[clinic.next_visit_id];
  const nextProfile = nextVisit && nextVisit.status === 'new' && profiles && profiles[nextVisit.user_id];

  return (
    <Section>

      <Content>
        <h2>Current time</h2>
        <h3>{formattedTime}</h3>
      </Content>

      <Content>
        <h2>Currently serving</h2>
        {nextProfile && nextProfile.nickname}
      </Content>

      <Content>
        <h2>Upcoming visits</h2>
      </Content>

      {queueItems}
    </Section>
  )
};

export default Queue