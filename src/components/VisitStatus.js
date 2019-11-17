import React, { useState, useContext } from 'react';
import Dropdown from 'react-bulma-components/lib/components/dropdown'
import { FirestoreContext } from '../utils/context'
import Button from 'react-bulma-components/lib/components/button';



const VisitStatus = () => {
  const { visits, clinic } = useContext(FirestoreContext)
  const visitsArr = visits && Object.values(visits)
  const clickState = {
    value: 0
  }

  const visitStatuses = [
    {
      status: 'new',
      color: 'primary'
    },
    {
      status: 'in progress',
      color: 'info'
    },
    {
      status: 'done',
      color: 'danger'
    }
  ]

  const statusMappings = {
    new: {
      next: 'in_progress',
      color: 'primary'
    },
  }

  const nextStatus = status => statusMappings[status].next
  const statusColor = status => statusMappings[status].color

  const [state, setState] = useState(visitStatuses[0])
  const [clicks, setClicks] = useState(clickState)

  const [count, setCount] = useState(0)

  const incrementCount = increment => {
    setCount(count + increment)
  }

  const clickHandler = e => {
    // incrementCount(1)
    // console.log('counttttt on click', count)
    // if (count < visitStatuses.length){
    //   setState(visitStatuses[count + 1])
    // } else {

    // }
  }

  console.log("current clinic", clinic)

  return (
    <Button onClick={clickHandler} color={state.color}>{state.status}</Button>
  )

}

export default VisitStatus