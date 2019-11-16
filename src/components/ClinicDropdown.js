import React, { useState } from 'react';
import Dropdown from 'react-bulma-components/lib/components/dropdown'

const alignment = {
  Default: '',
  right: 'right'
}

const ClinicDropdown = props => {
  const [state, setState] = useState({
    selected: '',
  })

  const clinics =[
    {
      name: "montreal clinic",
      id: 1,
      address: "847 sherbrooke"
    },
    {
      name: "mcgill clinic",
      id: 2,
      address: "847 university"
    },
    {
      name: "west island clinic",
      id: 3,
      address: "837 sources"
    }
  ]

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

          {clinics && clinics.map(c => (
            <Dropdown.Item value={c.name} key={c.name}>
              {c.name}
            </Dropdown.Item>
          ))}
      </Dropdown>
    );
}

export default ClinicDropdown