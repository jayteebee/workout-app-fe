import React, { useState } from 'react'
import CreateWorkout from '../Components/Workout/CreateWorkout'
import FetchAllWorkouts from '../Components/Workout/FetchAllWorkouts'
import FetchExercisesInWorkout from '../Components/Workout/FetchExercisesInWorkout'

const Workout = () => {
  const [workoutToggle, setWorkoutToggle] = useState(false)

  return (
    <div>
    <h3>Workout</h3>
    <div className='fetchAllWorkouts'>
    <FetchAllWorkouts workoutToggle={workoutToggle}/>
    </div>
    <div className='fetchExercisesInWorkout'>
      <FetchExercisesInWorkout />
    </div>
    <div className='createWorkout'>
      <CreateWorkout setWorkoutToggle={setWorkoutToggle}/>
    </div>
    </div>
  )
}

export default Workout