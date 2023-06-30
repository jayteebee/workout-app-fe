import React, { useState, useEffect } from 'react'
import { getExercisesInWorkout } from '../../API/Workout/Workout'

const FetchExercisesInWorkout = ({selectedExerciseID}) => {
    const [exercisesInWorkout, setExercisesInWorkout] = useState([])

    useEffect(() => {
        if(selectedExerciseID) {
        getExercisesInWorkout(selectedExerciseID)
        .then((data) => {
            setExercisesInWorkout(data)
            console.log(data)
        })
        .catch((err) => console.log("getExercisesInWorkout API Call Failed",err))
    }}, [selectedExerciseID])
  return (
    <div>
    {exercisesInWorkout.map((exercise) => (
        <div key={exercise.id}>
        <h3>Exercise</h3>
        <p>{exercise.exercise.name}</p>
        <h4>Primary Muscle</h4>
        {exercise.exercise.primary_muscles.map((muscle, index) => (
            <div key={index}>
                {muscle}
            </div>
        ))}
        <h4>Secondary Muscle</h4>
        {exercise.exercise.secondary_muscles.map((muscle, index) => (
            <div key={index}>
                {muscle}
            </div>
        ))}
        
        </div>
    ))}
    </div>
  )
}

export default FetchExercisesInWorkout