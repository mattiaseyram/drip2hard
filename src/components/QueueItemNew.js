import React, { useContext } from 'react';
import Level from 'react-bulma-components/lib/components/level';
import Heading from 'react-bulma-components/lib/components/heading';
import { FirestoreContext } from '../utils/context';
import Box from 'react-bulma-components/lib/components/box';



const QueueItem = props => {
  const { user, visits, profiles, clinic } = useContext(FirestoreContext);

  console.log('queue item profiles - new', profiles)
  console.log('queue item visits - new', visits)
  console.log('q item props - new', props)

  console.log('current clinic - new', clinic)

  const visitsArr = visits && Object.values(visits)

  console.log("visits__arr", visitsArr)

  console.log('NEW QUEEUE ITEM PROPS', props)

  // const queueItems = []

  // visitsArr.forEach(visit => {
  //   const queueItem = {
  //     reason: visit.reason,
  //     time: visit.time,
  //     visitId: visit.id,
  //     clinicId: visit.clinic_id,
  //     user: {
  //       id: visit.user_id,
  //       email: profiles[visit.user_id].email,
  //       nickname: profiles[visit.user_id].nickname,
  //     }
  //   }
  //   queueItems.push(queueItem)
  // })


  return (
    <Box className="level-hover">
      <Level>
        <Level.Side align="left">
          <Level.Item>
            <Heading size={5} subtitle>{props.data.user.nickname}</Heading>
          </Level.Item>
        </Level.Side>

        <Level.Side align="center">
          <Level.Item>
            <Heading size={5} subtitle>{props.data.reason}</Heading>
          </Level.Item>
        </Level.Side>

        <Level.Side align="right">
          <Level.Item>
            <Heading size={5} subtitle>{props.data.time}</Heading>
          </Level.Item>
        </Level.Side>
      </Level>
    </Box>

  )
};

export default QueueItem