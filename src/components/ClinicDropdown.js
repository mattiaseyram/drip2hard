import React, { useState, useContext } from 'react';
import Dropdown from 'react-bulma-components/lib/components/dropdown'
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
      <Dropdown
        {...props}
        value={state.selected}
        onChange={onChange}
        color="info"
        label="Clinics">
          {clinicsArr && clinicsArr.map(c => (
            <Dropdown.Item value={c.id} key={c.id} renderAs={Link} to={`/admin/${c.id}`}>
              {c.id}
            </Dropdown.Item>
          ))}
      </Dropdown>
    );
}

export default ClinicDropdown