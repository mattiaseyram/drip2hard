import React, { useState, useContext } from 'react';
import Dropdown from 'react-bulma-components/lib/components/dropdown'
import Button from 'react-bulma-components/lib/components/button';
import { updateVisit } from '../utils/actions/visit'

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

const VisitStatus = ({ visit }) => {

  const status = visit && visit.status ? visit.status : 'new';

  const clickHandler = e => {
    const newStatus = statusMappings[status].next;
    console.log(visit)
    updateVisit({ ...visit, status: newStatus });
  }

  return (
    <Button onClick={clickHandler} color={statusMappings[status].color}>{status}</Button>
  )

}

export default VisitStatus