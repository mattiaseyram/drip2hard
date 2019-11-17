import React from 'react';
import { useTime } from '../utils/hooks'
import Level from 'react-bulma-components/lib/components/level';
import Heading from 'react-bulma-components/lib/components/heading';
import Box from 'react-bulma-components/lib/components/box';
import { Field, Control, Input } from 'react-bulma-components/lib/components/form';

const  millisToMinutesAndSeconds = (time) => {
  const neg = time < 0 ? '-' : '';
  const millis = Math.abs(time);
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  const secondsPad = seconds < 10 ? '0' : '';
  return `${neg} ${minutes}:${secondsPad}${seconds}`;
};

const getTimeDifference = (currentTime, visitTime) => {
  if (!currentTime || !visitTime) return 'No Time';
  const diff = -(currentTime.getTime() - visitTime.getTime());
  const formattedDiff = millisToMinutesAndSeconds(diff);
;
  let color = 'success';
  if (diff < 300000) color = 'warning';
  if (diff < 0) color = 'danger';

  return (
    <Field kind="addons">
    <Control>
        <Input className="input is-medium is-rounded has-text-centered" style={{width: 160}} value={formattedDiff} readOnly color={color} />
    </Control>
</Field>
  )
};

const QueueItem = ({ visit }) => {
  const { time } = useTime();
  const { profile, reason } = visit; 

  const formattedTime = getTimeDifference(time, visit.time);

  return (
    <Box className="level-hover">
      <Level>
        <Level.Side align="left">
          <Level.Item>
            <Heading size={5} subtitle>{profile.nickname}</Heading>
          </Level.Item>
        </Level.Side>

        <Level.Side align="center">
          <Level.Item>
            <Heading size={6} subtitle>{reason}</Heading>
          </Level.Item>
        </Level.Side>

        <Level.Side align="right">
          <Level.Item>
            {formattedTime}
          </Level.Item>
        </Level.Side>
      </Level>
    </Box>

  )
};

export default QueueItem