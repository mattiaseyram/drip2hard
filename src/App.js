import React, { useState } from 'react';
import { Router } from '@reach/router';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Account from './pages/Account';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CreateClinic from './pages/CreateClinic';
import FindClinic from './pages/FindClinic';
import UpdateClinic from './pages/UpdateClinic';
import BookVisit from './pages/BookVisit';
import NotFound from './pages/NotFound';
import { FirestoreContext } from './utils/context';
import { useUser, useClinic, useVisit } from './utils/hooks';
import Container from 'react-bulma-components/lib/components/container';

import Admin from './pages/Admin'

export default function App() {

  const [clinicId, setClinicId] = useState('');
  const [visitId, setVisitId] = useState('');

  const { user, profile, profiles } = useUser();
  const { clinics, clinic } = useClinic(clinicId);
  const { visits, visit } = useVisit(visitId);

  return (
    <FirestoreContext.Provider value={{ user, profile, profiles, clinics, clinic, setClinicId, visits, visit, setVisitId }}>
      <div className="App">
        <Navbar />
        <Container className="has-margin-top">
          <Router>
            <Home path="/" />
            <Account path="/account" />
            <SignIn path="/signin" />
            <SignUp path="/signup" />
            <CreateClinic path="/clinics/create" />
            <FindClinic path="/clinics/find" />
            <UpdateClinic path="/clinics/:clinicId" />
            <BookVisit path="/clinics/:clinicId/create_visit" />
            <Admin path="/admin/:clinicId" />
            <NotFound default />
          </Router>
        </Container>
      </div>
    </FirestoreContext.Provider>
  );
}
