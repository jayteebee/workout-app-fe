import React, { useState } from 'react'
import { getRoutineById } from '../../API/Routine/Routine'

const FetchRoutineByID = () => {
    const [routine, setRoutine] = useState({})

    const fetchRoutineByID = async (rID) => {
        getRoutineById(rID)
        .then((data) => {
            setRoutine(data)
            console.log(data)
        })
        .catch((err) => {console.log("getRoutineByID API Call Failed",err)})
    }
  return (
    <div>
    <button onClick={() => fetchRoutineByID(3)}>fetchRoutineByID</button>

    </div>
  )
}

export default FetchRoutineByID