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
import { useUser, useClinic } from './utils/hooks';
import Container from 'react-bulma-components/lib/components/container';

export default function App() {

  const [clinicId, setClinicId] = useState('');

  const { user, profile } = useUser();
  const { clinics, clinic } = useClinic(clinicId);

  return (
    <FirestoreContext.Provider value={{ user, profile, clinics, clinic, setClinicId }}>
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
            <NotFound default />
          </Router>
        </Container>
      </div>
    </FirestoreContext.Provider>
  );
}
