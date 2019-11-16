import React, { useContext } from 'react';
import Level from 'react-bulma-components/lib/components/level';
import Heading from 'react-bulma-components/lib/components/heading';
import { FirestoreContext } from '../utils/context';
import Box from 'react-bulma-components/lib/components/box';



const QueueItem = props => {
  const { user, visits, profiles, clinic } = useContext(FirestoreContext);

  console.log('queue item profiles', profiles)
  console.log('queue item visits', visits)
  console.log('q item props', props)

  console.log('current clinic', clinic)

  const visitsArr = Object.values(visits)

  const queueItems = []

  visitsArr.forEach(visit => {
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

  console.log('items', queueItems)

  return (
    <div>
      {
        queueItems.map(item => (
          item.clinicId == clinic.id ?
            (
              <Box key={item.visitId}>
                <Level>
                  <Level.Side align="left">
                    <Level.Item>
                      <Heading size={5} subtitle>{item.user.nickname}</Heading>
                    </Level.Item>
                  </Level.Side>

                  <Level.Side align="right">
                    <Level.Item>
                      <Heading size={5} subtitle>{item.time}</Heading>
                    </Level.Item>
                  </Level.Side>
                </Level>
              </Box>
            ) : <p>No visits...</p>
        ))
      }
    </div>
    // <Level>
    //   <Level.Side align="left">
    //     <Level.Item>
    //       <Heading size={5} subtitle>{profiles[`${props.data.user_id}`].name}</Heading>
    //     </Level.Item>
    //   </Level.Side>

    //   <Level.Side align="right">
    //     <Level.Item>
    //       <Heading size={6} subtitle>3 sec</Heading>
    //     </Level.Item>
    //   </Level.Side>
    // </Level>

  )
};

export default QueueItem