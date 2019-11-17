import React, { useState, useContext } from 'react';
import Dropdown from 'react-bulma-components/lib/components/dropdown'
import { FirestoreContext } from '../utils/context'
import Button from 'react-bulma-components/lib/components/button';



const VisitStatus = () => {
  const { visits, clinic } = useContext(FirestoreContext)


  const statusMappings = {
    new: {
      current: 'new',
      next: 'in_progress',
      color: 'primary'
    },
    in_progress: {
      current: 'in progress',
      next: 'done',
      color: 'info'
    },
    done: {
      current: 'done',
      next: 'done',
      color: 'danger'
    }
  }

  const [state, setState] = useState('new')
  const nextStatus = status => statusMappings[status].next

  const clickHandler = e => {
    const newStatus = nextStatus(state);
    setState(newStatus)
  }


  return (
    <Button onClick={clickHandler} color={statusMappings[state].color}>{state}</Button>
  )

}

export default VisitStatus