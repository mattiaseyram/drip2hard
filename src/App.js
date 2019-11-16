import React from 'react';
import { Router } from '@reach/router';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Account from './pages/Account';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import { UserContext } from './utils/context';
import { useUser } from './utils/hooks';
import Container from 'react-bulma-components/lib/components/container';

export default function App() {

  const { user, profile } = useUser();

  return (
    <UserContext.Provider value={{ user, profile }}>
      <div className="App">
        <Navbar />
        <Container className="has-margin-top">
          <Router>
            <Home path="/" />
            <Account path="/account" />
            <SignIn path="/signin" />
            <SignUp path="/signup" />
            <NotFound default />
          </Router>
        </Container>
      </div>
    </UserContext.Provider>
  );
}
