import React from 'react'
import Level from 'react-bulma-components/lib/components/level';
import { Field, Control, Input } from 'react-bulma-components/lib/components/form';
import Heading from 'react-bulma-components/lib/components/heading';
import Button from 'react-bulma-components/lib/components/button';
import Box from 'react-bulma-components/lib/components/box';
import Section from 'react-bulma-components/lib/components/section'

import Queue from '../components/Queue'

const ClinicSection = () => {
  return (
      <Section>
          <Box>
              <Level>
                  <Level.Side align="left">
                      <Level.Item>
                          <Heading size={5} subtitle>aja</Heading>
                      </Level.Item>
                  </Level.Side>

                  <Level.Side align="right" className="is-fullwidth">
                      <Level.Item>
                      <Heading size={5} subtitle>aja</Heading>

                      </Level.Item>
                  </Level.Side>
              </Level>
          </Box>
      </Section>
  )
};

const Admin = () => {
  return (
    <Section >
      <h1> Clinics </h1>
      <ClinicSection />

      <h1> Queue </h1>
      <Queue />
    </Section>
  )
}

export default Admin