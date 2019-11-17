import React from 'react';
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

const VisitStatus = ({ visit, disabled }) => {

  const status = visit && visit.status ? visit.status : 'new';

  const clickHandler = e => {
    if (disabled) return;
    const newStatus = statusMappings[status].next;
    updateVisit({ ...visit, status: newStatus });
  }

  return (
    <Button
     className="is-medium"
      onClick={clickHandler}
      color={statusMappings[status].color}
    >{status}</Button>
  )

}

export default VisitStatus