import React, { useState, useEffect } from 'react'
import { getAllWorkouts } from '../../API/Workout/Workout'
import FetchExercisesInWorkout from './FetchExercisesInWorkout'

const FetchAllWorkouts = ({workoutToggle}) => {
    const [allWorkouts, setAllWorkouts] = useState([])
    const [selectedExerciseID, setSelectedExerciseID] = useState(null)

    useEffect(() => {
        getAllWorkouts()
        .then((data) => {
            setAllWorkouts(data);
        })
        .catch((err) => {console.log("getAllWorkouts API Call Failed",err)})
    },[workoutToggle] )

  return (
    <div>
    {allWorkouts.map((workout) => (
        <div key={workout.id}> 
        <button onClick={() => setSelectedExerciseID(workout.id)}>{workout.name}</button>
        
        </div>
    ))}
{selectedExerciseID && <FetchExercisesInWorkout selectedExerciseID={selectedExerciseID} />}
    
    </div>
  )
}

export default FetchAllWorkouts