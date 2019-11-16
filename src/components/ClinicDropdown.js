import React, { useState } from 'react';
import Dropdown from 'react-bulma-components/lib/components/dropdown'

const alignment = {
  Default: '',
  right: 'right'
}

class ClinicDropdown extends React.Component {
  state = {
    selected: '',
  }

  clinics = [
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

  onChange = (selected) => {
    this.setState({ selected });
  }
  render() {
    return (
      <Dropdown
        {...this.props}
        value={this.state.selected}
        onChange={this.onChange}
        color="info"
        label="Clinics">
        <Dropdown.Item value="item" >
          Dropdown item
        </Dropdown.Item>
        <Dropdown.Item value="other">
          Other Dropdown item
        </Dropdown.Item>
        <Dropdown.Item value="active">
          Active Dropdown item
        </Dropdown.Item>
        <Dropdown.Item value="other 2">
          Other Dropdown item
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item value="divider">
          With divider
        </Dropdown.Item>
      </Dropdown>
    );
  }
}

// const ClinicDropdown = props => {
//   const [state, setState] = useState({
//     selected: '',
//   })

//   const clinics =[
//     {
//       name: "montreal clinic",
//       id: 1,
//       address: "847 sherbrooke"
//     },
//     {
//       name: "mcgill clinic",
//       id: 2,
//       address: "847 university"
//     },
//     {
//       name: "west island clinic",
//       id: 3,
//       address: "837 sources"
//     }
//   ]

//   const onChange = (selected) => {
//     setState({ selected });
//   }

//     return (
//       <Dropdown
//         {...props}
//         value={state.selected}
//         onChange={onChange}
//         color="info"
//         label="Clinics">

//           {clinics && clinics.map(c => (
//             <Dropdown.Item value="item">
//               {c.name}
//             </Dropdown.Item>
//           ))}
//       </Dropdown>
//     );
// }

export default ClinicDropdown