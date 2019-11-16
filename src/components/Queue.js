import React from 'react'
import Level from 'react-bulma-components/lib/components/level';
import Heading from 'react-bulma-components/lib/components/heading';
import Box from 'react-bulma-components/lib/components/box';
import Section from 'react-bulma-components/lib/components/section'

import QueueItem from './QueueItem'

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
  return (
    <Section>
      {
        data && data.map((item, index) => (
          <Box>
            <QueueItem data={item} key = {item.uid}/>
          </Box>
        ))
      }
    </Section>
  )
};

export default Queue