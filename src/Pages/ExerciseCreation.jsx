import React from 'react'
import { useLocation } from 'react-router-dom';

const ExerciseCreation = () => {

  const location = useLocation();
  const selectedWorkout = location.state?.selectedWorkout;
  const selectedWorkoutName = location.state?.selectedWorkoutName;
console.log("SWID: ", selectedWorkout)
console.log("SWN: ", selectedWorkoutName)

  return (
    <div>
    <p>Exercise Creation</p>

    
    </div>
  )
}

export default ExerciseCreation