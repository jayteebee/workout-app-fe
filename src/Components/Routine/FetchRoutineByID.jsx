import React, { useState } from 'react'
import { getRoutineById } from '../../API/Routine/Routine'

const FetchRoutineByID = () => {
    const [routine, setRoutine] = useState({})

    const fetchRoutineByID = async (rID) => {
        getRoutineById(rID)
        .then((data) => {
            setRoutine(data)
        })
        .catch((err) => {console.log("getRoutineByID API Call Failed",err)})
    }
    // console.log(fetchRoutineByID(3))
  return (
    <div>
    
    </div>
  )
}

export default FetchRoutineByID