import React, { useState, useEffect } from 'react'
import { getAllWorkouts } from '../../API/Workout/Workout'
import EditWorkout from './EditWorkout'
import FetchExercisesInWorkout from './FetchExercisesInWorkout'

const FetchAllWorkouts = ({workoutToggle}) => {
    const [allWorkouts, setAllWorkouts] = useState([])
    const [selectedExerciseID, setSelectedExerciseID] = useState(null)
    const [workoutToEdit, setWorkoutToEdit] = useState(null)
    const [editToggle, setEditToggle] = useState(false)

    useEffect(() => {
        getAllWorkouts()
        .then((data) => {
            setAllWorkouts(data);
        })
        .catch((err) => {console.log("getAllWorkouts API Call Failed",err)})
    },[workoutToggle, editToggle] )

  return (
    <div>
    {allWorkouts.map((workout) => (
        <div key={workout.id}> 
        <button onClick={() => setSelectedExerciseID(workout.id)}>{workout.name}</button>
        <button onClick={() => setWorkoutToEdit(workout.id)}>Change Name</button>

        </div>
    ))}
{selectedExerciseID && <FetchExercisesInWorkout selectedExerciseID={selectedExerciseID} />}
{workoutToEdit && <EditWorkout workoutToEdit={workoutToEdit} editToggle={editToggle} setEditToggle={setEditToggle}/>}
   
    </div>
  )
}

export default FetchAllWorkouts