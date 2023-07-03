import React, { useState } from 'react'
import FetchAllExercises from '../Components/Exercises/FetchAllExercises'
import CreateWorkout from '../Components/Workout/CreateWorkout'
import FetchAllWorkouts from '../Components/Workout/FetchAllWorkouts'
import FetchExercisesInWorkout from '../Components/Workout/FetchExercisesInWorkout'

const Workout = () => {
  const [workoutToggle, setWorkoutToggle] = useState(false)
  const [tee, setTee] = useState(false)

  const hc = () => {setTee(true)}

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
      <CreateWorkout setWorkoutToggle={setWorkoutToggle} workoutToggle={workoutToggle}/>
    </div>
    
    <button onClick={hc}>All Exercises</button>
    {tee && <FetchAllExercises />}
    </div>
  )
}

export default Workout