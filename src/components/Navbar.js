import React from 'react';
import { Link } from '@reach/router';
import Navbar from 'react-bulma-components/lib/components/navbar';
import { signOut } from '../utils/actions';

export default function NavigationBar() {

    const handleSignOut = () => signOut();

    return (
        <Navbar color={'light'}>
            <Navbar.Brand></Navbar.Brand>
            <Navbar.Menu>
                <Navbar.Item renderAs={Link} to="/">Home</Navbar.Item>
                <Navbar.Item renderAs={Link} to="/account">Account</Navbar.Item>
                <Navbar.Item renderAs={Link} to="/signin">Sign In</Navbar.Item>
                <Navbar.Item renderAs={Link} to="/signup">Sign Up</Navbar.Item>
                <Navbar.Item onClick={handleSignOut}>Sign Out</Navbar.Item>
            </Navbar.Menu>
        </Navbar>

    );
}