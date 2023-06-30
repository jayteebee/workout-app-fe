import React from 'react'
import CreateWorkout from '../Components/Workout/CreateWorkout'
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
    <div className='createWorkout'>
      <CreateWorkout />
    </div>
    </div>
  )
}

export default Workout