import React, { useEffect, useState } from 'react'
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useLocation, useNavigate } from 'react-router-dom'
import { getWorkoutsInRoutine } from '../../API/Routine/Routine'
import EditWorkout from './EditWorkout'
import DeleteWorkout from './DeleteWorkout';
import ViewExercises from '../../Pages/ViewExercises';

const FetchWorkoutByID = ({setRoutineID, workoutCreated}) => {
const [workout, setWorkout] = useState([])
const [workoutToEdit, setWorkoutToEdit] = useState(null)
const [editToggle, setEditToggle] = useState(false)
const [workoutToDelete, setWorkoutToDelete] = useState(null)
const [deleteToggle, setDeleteToggle] = useState(null)
const [selectedWorkout, setSelectedWorkout] = useState({selectedWorkout: 0, selectedWorkoutName: ""})
const [viewExercisesInWorkout, setViewExercisesInWorkout] = useState(null)
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

const navToExercisePage = (workoutID) => {
  setViewExercisesInWorkout(workoutID)
  navigate("/ViewExercises")
}

  return (
    <div>
    <h3>{workout.length > 0 && workout[0].routine.name}</h3>
    {workout.length > 0 && workout.map((workout) => (
        <div key={workout.id}>
        <MDBBtn color='info' onClick={() =>navToExercisePage(workout.id)}>{workout.workout.name} </MDBBtn>
        <MDBBtn onClick={() => setWorkoutToEdit(workout.id)}>Change Name</MDBBtn>
        <MDBBtn onClick={() => setWorkoutToDelete(workout.id)}>Delete</MDBBtn>
        <MDBBtn onClick={() => displayExercises(workout.id, workout.workout.name)}>Add Exercises To Workout</MDBBtn>
        </div>
    ))}
    {workoutToEdit && <EditWorkout workoutToEdit={workoutToEdit} editToggle={editToggle} setEditToggle={setEditToggle} setWorkoutToEdit={setWorkoutToEdit}/>}
    {workoutToDelete && <DeleteWorkout workoutToDelete={workoutToDelete} setWorkoutToDelete={setWorkoutToDelete} setDeleteToggle={setDeleteToggle} />}
    {viewExercisesInWorkout && <ViewExercises viewExercisesInWorkout={viewExercisesInWorkout} />}
    </div>
  )
}

export default FetchWorkoutByID

