import React, { useEffect, useState } from 'react'
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useLocation } from 'react-router-dom'
import { getWorkoutsInRoutine } from '../../API/Routine/Routine'
import EditWorkout from './EditWorkout'

const FetchWorkoutByID = ({setRoutineID, workoutCreated}) => {
const [workout, setWorkout] = useState([])
const [workoutToEdit, setWorkoutToEdit] = useState(null)
const [editToggle, setEditToggle] = useState(false)
const location = useLocation();
const selectedRoutineID = location.state?.selectedRoutineID;
console.log(selectedRoutineID)
// console.log("w",workout,workout[0].routine.name)


useEffect(() => {
    setRoutineID(selectedRoutineID)
    getWorkoutsInRoutine(selectedRoutineID)
    .then((data) => {
        setWorkout(data)
    })
    .catch((err) => {console.log("getWorkoutsInRoutine API Call Failed",err)})
}, [selectedRoutineID, workoutCreated, editToggle])

  return (
    <div>
    <h3>{workout.length > 0 && workout[0].routine.name}</h3>
    {workout.length > 0 && workout.map((workout) => (
        <div key={workout.id}>
            <p>{workout.workout.name} </p>
        <MDBBtn onClick={() => setWorkoutToEdit(workout.id)}>Change Name</MDBBtn>

        </div>
    ))}
    {workoutToEdit && <EditWorkout workoutToEdit={workoutToEdit} editToggle={editToggle} setEditToggle={setEditToggle} setWorkoutToEdit={setWorkoutToEdit}/>}
    
    </div>
  )
}

export default FetchWorkoutByID




// from the FetchAllRoutines page, we need to send the ID of the selected
// routine to here
// we then need to display all the workouts belonging to that routine
// on the new workouts page