import React from 'react'
import FetchAllWorkouts from '../Components/Workout/FetchAllWorkouts'
import FetchExercisesInWorkout from '../Components/Workout/FetchExercisesInWorkout'

const Workout = () => {
  return (
    <div>
    <h3>Workout</h3>
    <div className='fetchAllWorkouts'>
    <FetchAllWorkouts />
    </div>
    <div className='fetchExercisesInWorkout'>
      <FetchExercisesInWorkout />
    </div>
    </div>
  )
}

export default Workout