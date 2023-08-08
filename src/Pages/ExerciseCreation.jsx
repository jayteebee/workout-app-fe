import { MDBBtn } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { addExerciseToWorkout } from "../API/Workout/Workout";
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

  const [exerciseID, setExerciseID] = useState(null)
  console.log("exerciseID", exerciseID)

  const [exerciseParameters, setExerciseParameters] = useState({
    exercise_id: null,
    sets: 0,
    reps: 0,
    weight: 0,
  });
  console.log("exerciseParameters", exerciseParameters);

  const addExercise = () => {
    console.log("addExerciseToWorkout",selectedWorkout,exerciseParameters)
    addExerciseToWorkout(selectedWorkout,exerciseParameters)
  }

  useEffect(() => {
    setExerciseParameters((prevParameters) => ({
      ...prevParameters,
      exercise_id: exerciseID !== null ? exerciseID : null,
    }))
  },[exerciseID])

  return (
    <div>
      <h2>Exercise Creation</h2>
      <h4>Workout: {selectedWorkoutName}</h4>

      <Search
        setSearchedExerciseName={setSearchedExerciseName}
        searchedExerciseName={searchedExerciseName}
        searchedMuscleGroup={searchedMuscleGroup}
        setSearchedMuscleGroup={setSearchedMuscleGroup}
        setExerciseID={setExerciseID}
      />

      <SetsRepsWeight
        searchedExerciseName={searchedExerciseName}
        searchedMuscleGroup={searchedMuscleGroup}
        setExerciseParameters={setExerciseParameters}
      />

      <MDBBtn onClick={addExercise}>Add Exercise To Workout</MDBBtn>
    </div>
  );
};

export default ExerciseCreation;
