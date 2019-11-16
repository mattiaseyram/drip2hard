import React, { useState, useContext } from 'react';
import Box from 'react-bulma-components/lib/components/box';
import Section from 'react-bulma-components/lib/components/section'
import { FirestoreContext } from '../utils/context'
import QueueItem from './QueueItem'

import Content from 'react-bulma-components/lib/components/content';


const data = [
  {
    name: 'Test user',
    uid: '39284fnh12u383b',
    email: 'user@mail.com',
    userType: 'user',
    data: {
      timeRemaining: '45 minutes',
      severity: '90',
    }
  },
  {
    name: 'another user',
    uid: '29487fdnjsiahf',
    email: 'user@mail.com',
    userType: 'user',
    data: {
      timeRemaining: '15 minutes',
      severity: '30',
    }
  },
  {
    name: 'dog',
    uid: 's89f7a98fnds2',
    email: 'user@mail.com',
    userType: 'user',
    data: {
      timeRemaining: '4 minutes',
      severity: '10',
    }
  }
]


const Queue = () => {
  const { visits, profiles } = useContext(FirestoreContext)
  const visitsArr = visits && Object.values(visits)

  console.log("VIsits: ", visitsArr, profiles)
  return (
    <Section>
      <Content>
        <h2>Upcoming visits</h2>
      </Content>
      {
        visitsArr && visitsArr.map(visit => (
          <QueueItem data={visit} key={visit.id} />
        ))
      }
    </Section>
  )
};

export default Queue