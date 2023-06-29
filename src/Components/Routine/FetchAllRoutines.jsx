import React from 'react'
import { useState, useEffect } from 'react'
import { getAllRoutines } from '../../API/Routine/Routine'
import EditRoutine from './EditRoutine'
import FetchWorkoutsInRoutine from './FetchWorkoutsInRoutine'

const FetchAllRoutines = ({toggle}) => {

const [allRoutines, setAllRoutines] = useState([])
const [selectedRoutineID, setSelectedRoutineID] = useState(null)
const [routineToEdit, setRoutineToEdit] = useState(null)
useEffect(() => {
    getAllRoutines()
    .then((data) => {
        setAllRoutines(data);
    })
    .catch((err) => {console.log("getAllRoutines API Call Failed",err)})
},[toggle] )

  return (
    <div>
    {allRoutines.map((routine) => (
        <div key={routine.id}>
        <button onClick={() => setSelectedRoutineID(routine.id)}>{routine.name}</button> 
        {routine.frequency}
        <button onClick={() => setRoutineToEdit(routine.id)}>Change Name/Frequency</button>
        </div>
    ))}
    {selectedRoutineID && <FetchWorkoutsInRoutine rID={selectedRoutineID} />}
    {routineToEdit && <EditRoutine eID={routineToEdit}/>}
    </div>
  )
}

export default FetchAllRoutines