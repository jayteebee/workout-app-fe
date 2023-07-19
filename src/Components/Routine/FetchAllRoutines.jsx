import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllRoutines } from '../../API/Routine/Routine'
import FetchWorkoutByID from '../Workout/FetchWorkoutByID'
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

const navigate = useNavigate()


useEffect(() => {
    getAllRoutines()
    .then((data) => {
        setAllRoutines(data);
    })
    .catch((err) => {console.log("getAllRoutines API Call Failed",err)})
},[routineToggle, editToggle, deleteToggle] )

const displayWorkouts = (routineID) => {
  setSelectedRoutineID(routineID);
  navigate("/Workout", {state: {selectedRoutineID: routineID}});
}

  return (
    <div>
    {allRoutines.map((routine) => (
        <div key={routine.id}>
        <button onClick={() => displayWorkouts(routine.id)}>{routine.name} here</button> 
        {routine.frequency}
        <button onClick={() => setRoutineToEdit(routine.id)}>Change Name/Frequency</button>
        <button onClick={() => setRoutineToDelete(routine.id)}>Delete</button>
        
        </div>
    ))}
    {selectedRoutineID && <FetchWorkoutsInRoutine rID={selectedRoutineID} />  }
    {routineToEdit && <EditRoutine eID={routineToEdit} editToggle={editToggle} setEditToggle={setEditToggle} setRoutineToEdit={setRoutineToEdit} /> }
    {routineToDelete && <DeleteRoutine routineToDelete={routineToDelete} setRoutineToDelete={setRoutineToDelete} setDeleteToggle={setDeleteToggle} />}
    
    </div>
  )
}

export default FetchAllRoutines