import React from 'react'
import Level from 'react-bulma-components/lib/components/level';
import Heading from 'react-bulma-components/lib/components/heading';



const QueueItem = props => {
  return (
    <Level>
      <Level.Side align="left">
        <Level.Item>
          <Heading size={5} subtitle>{props.data.name}</Heading>
        </Level.Item>
      </Level.Side>

      <Level.Side align="right">
        <Level.Item>
          <Heading size={6} subtitle>{props.data.data.timeRemaining}</Heading>
        </Level.Item>
      </Level.Side>
    </Level>
  )
};

export default QueueItem