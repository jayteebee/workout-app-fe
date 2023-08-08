import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Search from "../Components/Exercises/Search";
import SetsRepsWeight from "../Components/Exercises/SetsRepsWeight";

const ExerciseCreation = () => {
  const location = useLocation();
  const selectedWorkout = location.state?.selectedWorkout; //id
  const selectedWorkoutName = location.state?.selectedWorkoutName;

  const [searchedExerciseName, setSearchedExerciseName] = useState(null);
  console.log("searchedExerciseName - EC", searchedExerciseName);

  const [searchedMuscleGroup, setSearchedMuscleGroup] = useState(null);
  console.log("searchedMuscleGroup - EC", searchedMuscleGroup);
  return (
    <div>
      <h2>Exercise Creation</h2>
      <h4>Workout: {selectedWorkoutName}</h4>

      <Search
        setSearchedExerciseName={setSearchedExerciseName}
        searchedExerciseName={searchedExerciseName}
        searchedMuscleGroup={searchedMuscleGroup}
        setSearchedMuscleGroup={setSearchedMuscleGroup}
      />

      <SetsRepsWeight
        searchedExerciseName={searchedExerciseName}
        searchedMuscleGroup={searchedMuscleGroup}
      />
    </div>
  );
};

export default ExerciseCreation;
