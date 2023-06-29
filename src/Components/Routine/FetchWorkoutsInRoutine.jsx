import React, { useState } from 'react'
import { getWorkoutsInRoutine } from '../../API/Routine/Routine'

const FetchWorkoutsInRoutine = () => {
    const [workoutsInRoutine, setWorkoutsInRoutine] = useState([])

    const fetchWorkoutsInRoutine = async (rID) => {
        getWorkoutsInRoutine(rID)
        .then((data) => {
            setWorkoutsInRoutine(data)
            console.log(data)
        })
        .catch((err) => console.log("getWorkoutsInRoutine API Call Failed",err))
    }
  return (
    <div>
    <button onClick={() => fetchWorkoutsInRoutine(3)}>fetchWorkoutsInRoutine</button>

    </div>
  )
}

export default FetchWorkoutsInRoutine