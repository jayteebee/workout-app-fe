import React, { useState, useEffect } from 'react'
import { getAllWorkouts } from '../../API/Workout/Workout'
import DeleteWorkout from './DeleteWorkout'
import EditWorkout from './EditWorkout'
import FetchExercisesInWorkout from './FetchExercisesInWorkout'

const FetchAllWorkouts = ({workoutToggle}) => {
    const [allWorkouts, setAllWorkouts] = useState([])
    const [selectedExerciseID, setSelectedExerciseID] = useState(null)
    const [workoutToEdit, setWorkoutToEdit] = useState(null)
    const [editToggle, setEditToggle] = useState(false)
    const [workoutToDelete, setWorkoutToDelete] = useState(null)
    const [deleteToggle, setDeleteToggle] = useState(null)

    console.log(editToggle)

    useEffect(() => {
        getAllWorkouts()
        .then((data) => {
            setAllWorkouts(data);
        })
        .catch((err) => {console.log("getAllWorkouts API Call Failed",err)})
    },[workoutToggle, editToggle, deleteToggle] )

  return (
    <div>
    {allWorkouts.map((workout) => (
        <div key={workout.id}> 
        <button onClick={() => setSelectedExerciseID(workout.id)}>{workout.name}</button>
        <button onClick={() => setWorkoutToEdit(workout.id)}>Change Name</button>
        <button onClick={() => setWorkoutToDelete(workout.id)}>Delete</button>

        </div>
    ))}
{selectedExerciseID && <FetchExercisesInWorkout selectedExerciseID={selectedExerciseID} />}
{workoutToEdit && <EditWorkout workoutToEdit={workoutToEdit} editToggle={editToggle} setEditToggle={setEditToggle} setWorkoutToEdit={setWorkoutToEdit}/>}
{workoutToDelete && <DeleteWorkout workoutToDelete={workoutToDelete} setWorkoutToDelete={setWorkoutToDelete} setDeleteToggle={setDeleteToggle} />}
  
    </div>
  )
}

export default FetchAllWorkouts