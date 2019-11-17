import React, { useState, useContext } from 'react';
import Navbar from 'react-bulma-components/lib/components/navbar';
import { FirestoreContext } from '../utils/context'
import { Link } from '@reach/router';

const ClinicDropdown = props => {

  const { clinics } = useContext(FirestoreContext)

  const [state, setState] = useState({
    selected: '',
  })

  const clinicsArr = clinics && Object.values(clinics)

  const onChange = (selected) => {
    setState({ selected });
  }

  return (
    <Navbar.Item dropdown hoverable>
      <Navbar.Link>Clinics</Navbar.Link>
      <Navbar.Dropdown
        value={state.selected}
        onChange={onChange}
        label="Clinics">
        {clinicsArr && clinicsArr.map(c => (
          <Navbar.Item value={c.id} key={c.id} renderAs={Link} to={`/admin/${c.id}`}>
            {c.id}
          </Navbar.Item>
        ))}
      </Navbar.Dropdown>
    </Navbar.Item>
  );
}

export default ClinicDropdown