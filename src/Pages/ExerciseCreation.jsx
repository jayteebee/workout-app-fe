import React from 'react'
import { useLocation } from 'react-router-dom';

const ExerciseCreation = () => {

  const location = useLocation();
  const selectedWorkoutID = location.state?.selectedWorkoutID;
console.log("SWID: ", selectedWorkoutID)
  return (
    <div>
    <p>Exercise Creation</p>

    
    </div>
  )
}

export default ExerciseCreation