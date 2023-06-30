import React from 'react'
import { useState, useEffect } from 'react'
import { deleteRoutineByID, getAllRoutines } from '../../API/Routine/Routine'
import DeleteRoutine from './DeleteRoutine'
import EditRoutine from './EditRoutine'
import FetchWorkoutsInRoutine from './FetchWorkoutsInRoutine'

const FetchAllRoutines = ({routineToggle}) => {

const [allRoutines, setAllRoutines] = useState([])
const [selectedRoutineID, setSelectedRoutineID] = useState(null)
const [routineToEdit, setRoutineToEdit] = useState(null)
const [editToggle, setEditToggle] = useState(false)
const [routineToDelete, setRoutineToDelete] = useState(null)
const [deleteToggle, setDeleteToggle] = useState(null)

useEffect(() => {
    getAllRoutines()
    .then((data) => {
        setAllRoutines(data);
    })
    .catch((err) => {console.log("getAllRoutines API Call Failed",err)})
},[routineToggle, editToggle, deleteToggle] )

  return (
    <div>
    {allRoutines.map((routine) => (
        <div key={routine.id}>
        <button onClick={() => setSelectedRoutineID(routine.id)}>{routine.name}</button> 
        {routine.frequency}
        <button onClick={() => setRoutineToEdit(routine.id)}>Change Name/Frequency</button>
        <button onClick={() => setRoutineToDelete(routine.id)}>Delete</button>
        
        </div>
    ))}
    {selectedRoutineID && <FetchWorkoutsInRoutine rID={selectedRoutineID} />}
    {routineToEdit && <EditRoutine eID={routineToEdit} setEditToggle={setEditToggle}/>}
    {routineToDelete && <DeleteRoutine routineToDelete={routineToDelete} setRoutineToDelete={setRoutineToDelete} setDeleteToggle={setDeleteToggle} />}
    
    </div>
  )
}

export default FetchAllRoutines