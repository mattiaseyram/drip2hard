import React, { useContext } from 'react'
import { FirestoreContext } from '../utils/context';
import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section'


import Hero from 'react-bulma-components/lib/components/hero';
import Container from 'react-bulma-components/lib/components/container';

import Queue from '../components/Queue'

const Admin = ({ clinicId = '' }) => {
  const { user, clinic, setClinicId } = useContext(FirestoreContext);

  if (!clinic || clinic.id !== clinicId) setClinicId(clinicId);

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
            <Queue />
          </Section>
        )
        : null
      }

    </div>
  )
}

export default Admin