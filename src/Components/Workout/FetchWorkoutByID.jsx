import React, { useEffect, useState } from 'react'
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useLocation, useNavigate } from 'react-router-dom'
import { getWorkoutsInRoutine } from '../../API/Routine/Routine'
import EditWorkout from './EditWorkout'
import DeleteWorkout from './DeleteWorkout';

const FetchWorkoutByID = ({setRoutineID, workoutCreated}) => {
const [workout, setWorkout] = useState([])
const [workoutToEdit, setWorkoutToEdit] = useState(null)
const [editToggle, setEditToggle] = useState(false)
const [workoutToDelete, setWorkoutToDelete] = useState(null)
const [deleteToggle, setDeleteToggle] = useState(null)
const [selectedWorkout, setSelectedWorkout] = useState({selectedWorkout: 0, selectedWorkoutName: ""})
const location = useLocation();
const selectedRoutineID = location.state?.selectedRoutineID;
const navigate = useNavigate()


useEffect(() => {
    setRoutineID(selectedRoutineID)
    getWorkoutsInRoutine(selectedRoutineID)
    .then((data) => {
        setWorkout(data)
    })
    .catch((err) => {console.log("getWorkoutsInRoutine API Call Failed",err)})
}, [selectedRoutineID, workoutCreated, editToggle, deleteToggle])

const displayExercises = (workoutID, workoutName) => {
  setSelectedWorkout({selectedWorkout: workoutID, selectedWorkoutName: workoutName});
  navigate("/CreateExercise", {state: {selectedWorkout: workoutID, selectedWorkoutName: workoutName}})
}

  return (
    <div>
    <h3>{workout.length > 0 && workout[0].routine.name}</h3>
    {workout.length > 0 && workout.map((workout) => (
        <div key={workout.id}>
            <p>{workout.workout.name} </p>
        <MDBBtn onClick={() => setWorkoutToEdit(workout.id)}>Change Name</MDBBtn>
        <MDBBtn onClick={() => setWorkoutToDelete(workout.id)}>Delete</MDBBtn>
        <MDBBtn onClick={() => displayExercises(workout.id, workout.workout.name)}>Add Exercises To Workout</MDBBtn>
        </div>
    ))}
    {workoutToEdit && <EditWorkout workoutToEdit={workoutToEdit} editToggle={editToggle} setEditToggle={setEditToggle} setWorkoutToEdit={setWorkoutToEdit}/>}
    {workoutToDelete && <DeleteWorkout workoutToDelete={workoutToDelete} setWorkoutToDelete={setWorkoutToDelete} setDeleteToggle={setDeleteToggle} />}
    
    </div>
  )
}

export default FetchWorkoutByID




// from the FetchAllRoutines page, we need to send the ID of the selected
// routine to here
// we then need to display all the workouts belonging to that routine
// on the new workouts page