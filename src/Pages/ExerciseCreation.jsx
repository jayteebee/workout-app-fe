import { MDBBtn } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { addExerciseToWorkout } from "../API/Workout/Workout";
import Search from "../Components/Exercises/Search";
import SetsRepsWeight from "../Components/Exercises/SetsRepsWeight";
import "../CSS/ExerciseCreation.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExerciseCreation = () => {
  const location = useLocation();
  const selectedWorkout = location.state?.selectedWorkout; //id
  const selectedWorkoutName = location.state?.selectedWorkoutName;

  const [searchedExerciseName, setSearchedExerciseName] = useState(null);
  const [searchedMuscleGroup, setSearchedMuscleGroup] = useState(null);
  const [exerciseID, setExerciseID] = useState(null);
  const [exerciseParameters, setExerciseParameters] = useState({
    exercise_id: null,
    sets: 0,
    reps: 0,
    weight: 0,
    rest: 0
  });

  const addExercise = async () => {
    await addExerciseToWorkout(selectedWorkout, exerciseParameters);
    setSearchedExerciseName(null);
    setSearchedMuscleGroup(null);
    toast.success("Exercise added to workout! Head to the View Exercises page to view.", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  useEffect(() => {
    setExerciseParameters((prevParameters) => ({
      ...prevParameters,
      exercise_id: exerciseID !== null ? exerciseID : null,
    }));
  }, [exerciseID]);

  return (
    <div>
      <h2 className="pageHeader">Exercise Creation</h2>
      <h4 className="subHeader">Workout: {selectedWorkoutName}</h4>

      <div className="search">
        <Search
          setSearchedExerciseName={setSearchedExerciseName}
          searchedExerciseName={searchedExerciseName}
          searchedMuscleGroup={searchedMuscleGroup}
          setSearchedMuscleGroup={setSearchedMuscleGroup}
          setExerciseID={setExerciseID}
        />
      </div>
      <SetsRepsWeight
        searchedExerciseName={searchedExerciseName}
        searchedMuscleGroup={searchedMuscleGroup}
        setExerciseParameters={setExerciseParameters}
      />

      <MDBBtn onClick={addExercise}>Add Exercise To Workout</MDBBtn>

      <ToastContainer />
    </div>
  );
};

export default ExerciseCreation;
