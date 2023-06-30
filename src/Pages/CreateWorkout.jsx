import React from 'react'
import FetchAllWorkouts from '../Components/Workout/FetchAllWorkouts'
import FetchExercisesInWorkout from '../Components/Workout/FetchExercisesInWorkout'

const CreateWorkout = () => {
  return (
    <div>
    <h3>CreateWorkout</h3>
    <div className='fetchAllWorkouts'>
    <FetchAllWorkouts />
    </div>
    <div className='fetchExercisesInWorkout'>
      <FetchExercisesInWorkout />
    </div>
    </div>
  )
}

export default CreateWorkout