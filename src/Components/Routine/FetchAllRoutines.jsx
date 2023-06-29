import React from 'react'
import { useState, useEffect } from 'react'
import { getAllRoutines } from '../../API/Routine/Routine'
import FetchWorkoutsInRoutine from './FetchWorkoutsInRoutine'

const FetchAllRoutines = () => {

const [allRoutines, setAllRoutines] = useState([])
const [selectedRoutineID, setSelectedRoutineID] = useState(null)
useEffect(() => {
    getAllRoutines()
    .then((data) => {
        setAllRoutines(data);
    })
    .catch((err) => {console.log("getAllRoutines API Call Failed",err)})
},[] )

  return (
    <div>
    {allRoutines.map((routine) => (
        <div key={routine.id}>
        <button onClick={() => setSelectedRoutineID(routine.id)}>{routine.name}</button> 
        {routine.frequency}
        </div>
    ))}
    {selectedRoutineID && <FetchWorkoutsInRoutine rID={selectedRoutineID} />}
    </div>
  )
}

export default FetchAllRoutines