import React, { useContext } from 'react'
import { FirestoreContext } from '../utils/context';
import Level from 'react-bulma-components/lib/components/level';
import Heading from 'react-bulma-components/lib/components/heading';
import Box from 'react-bulma-components/lib/components/box';
import Section from 'react-bulma-components/lib/components/section'


import Hero from 'react-bulma-components/lib/components/hero';
import Container from 'react-bulma-components/lib/components/container';

import Queue from '../components/Queue'

const ClinicSection = props => {

  const clinicData = props.clinic

  return (
    <Section>
      {
        clinicData ?
          <Box>
            <Level>
              <Level.Side align="left">
                <Level.Item>
                  <Heading size={5} subtitle>{clinicData.id}</Heading>
                </Level.Item>
              </Level.Side>
            </Level>
          </Box> : null
      }
    </Section>
  )
};

const Admin = ({ clinicId = '' }) => {
  const { user, clinic, setClinicId } = useContext(FirestoreContext);

  if (!clinic || clinic.id !== clinicId) setClinicId(clinicId);

  const clinicProps = {
    clinic
  }

  console.log("in admin", clinic)

  return (
    <div >
      {user && clinic
        ? (
          <Section>

            <Hero color="primary" >
              <Hero.Body>
                <Container>
                  <Heading>
                    {clinic.name}
                  </Heading>
                  <Heading subtitle size={3}>
                    {clinic.address}
                  </Heading>
                </Container>
              </Hero.Body>
            </Hero>

            <h1> Queue </h1>
            <Queue />
          </Section>
        )
        : null
      }

    </div>
  )
}

export default Admin