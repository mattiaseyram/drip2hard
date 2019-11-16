import React, { useContext } from 'react';
import { FirestoreContext } from '../utils/context';
import { Link } from '@reach/router';
import Navbar from 'react-bulma-components/lib/components/navbar';
import { signOut } from '../utils/actions';

const supers = ['admin', 'doctor'];

export default function NavigationBar() {
    const { user, profile } = useContext(FirestoreContext);
    const handleSignOut = () => signOut();

    const navLink = (label, to, options = {} ) => {
        const item = (<Navbar.Item renderAs={Link} to={to}>{label}</Navbar.Item>);
        if (options === 'all') return item;
        if (options === 'authed' && user) return item;
        if (options === 'supers' && user && supers.includes(profile.user_type)) return item;
        if (options === 'unauthed' && !user) return item;
        return null;
    };

    return (
        <Navbar color={'light'}>
            <Navbar.Brand></Navbar.Brand>
            <Navbar.Menu>
                {navLink('Home', '/', 'all')}
                {navLink('Account', '/account', 'authed')}
                {navLink('Find Clinic', '/clinics/find', 'authed')}
                {navLink('Create Clinic', '/clinics/create', 'supers')}
                {navLink('Sign In', '/signin', 'unauthed')}
                {navLink('Sign Up', '/signup', 'unauthed')}
                {user && <Navbar.Item onClick={handleSignOut}>Sign Out</Navbar.Item>}
            </Navbar.Menu>
        </Navbar>

    );
}