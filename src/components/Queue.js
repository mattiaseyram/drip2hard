import React, { useContext } from 'react';
import Section from 'react-bulma-components/lib/components/section'
import { FirestoreContext } from '../utils/context'
import QueueItem from './QueueItem'


import Content from 'react-bulma-components/lib/components/content';

const Queue = () => {
  const { visits, profiles, clinic, time } = useContext(FirestoreContext)
  const visitsArr = visits && Object.values(visits)

  const queueItems = []

  visitsArr && visitsArr.forEach(visit => {
    const queueItem = {
      reason: visit.reason,
      time: visit.time,
      visitId: visit.id,
      clinicId: visit.clinic_id,
      user: {
        id: visit.user_id,
        email: profiles[visit.user_id].email,
        nickname: profiles[visit.user_id].nickname,
      }
    }
    queueItems.push(queueItem)
  })

  const formattedTime = (new Date(time)).toString()

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
      {
        queueItems && queueItems.map(visit => (
          visit.clinicId === clinic.id ?
            <QueueItem data={visit} key={visit.id} />
            : null
        ))
      }
    </Section>
  )
};

export default Queue