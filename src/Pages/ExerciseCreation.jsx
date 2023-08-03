import React from 'react'
import { useLocation } from 'react-router-dom';
import Search from '../Components/Exercises/Search';

const ExerciseCreation = () => {

  const location = useLocation();
  const selectedWorkout = location.state?.selectedWorkout;
  const selectedWorkoutName = location.state?.selectedWorkoutName;

  return (
    <div>
    <h2>Exercise Creation</h2>
    <h4>Workout: {selectedWorkoutName}</h4>
    
    <Search />
    </div>
  )
}

export default ExerciseCreation