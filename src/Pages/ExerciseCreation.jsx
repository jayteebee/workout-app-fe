import { MDBBtn } from "mdb-react-ui-kit";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { addExerciseToWorkout } from "../API/Workout/Workout";
import Search from "../Components/Exercises/Search";
import SetsRepsWeight from "../Components/Exercises/SetsRepsWeight";
import "../CSS/ExerciseCreation.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IntroJsContext } from "../Context/IntroJsContext";
import { Steps } from "intro.js-react";


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
  const [addExerciseButton, setAddExerciseButton] = useState(false)
  const [parameterReset, setParameterReset] = useState(false)

  const {  steps, stepsEnabled, initialStep, onExit, setInitialStep, setStepsEnabled} = useContext(IntroJsContext)


  const addExercise = async () => {
    await addExerciseToWorkout(selectedWorkout, exerciseParameters);
    setSearchedExerciseName(null);
    setSearchedMuscleGroup(null);
    setAddExerciseButton(false)
    setParameterReset(true)
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
    if (initialStep === 11) {
      setTimeout(() => {
        setStepsEnabled(false); 
        setInitialStep(12)
        setStepsEnabled(true)
      }, 1000)
    }
  };

  useEffect(() => {
    setExerciseParameters((prevParameters) => ({
      ...prevParameters,
      exercise_id: exerciseID !== null ? exerciseID : null,
    }));
  }, [exerciseID]);

useEffect(() => {
if (exerciseParameters.exercise_id &&
   exerciseParameters.reps &&
    exerciseParameters.rest &&
     exerciseParameters.sets &&
      exerciseParameters.weight &&
      initialStep === 10) {
        setStepsEnabled(false); 
        setInitialStep(11)
        setStepsEnabled(true)
}
}, [exerciseParameters])

  return (
    <div className="grid-container">
      <h2 className="pageHeader exerciseCreation">Exercise Creation</h2>
      <h4 className="subHeader exerciseCreation">Workout: {selectedWorkoutName}</h4>

      <div id="searchForTutorial" className="search">
        <Search
          setSearchedExerciseName={setSearchedExerciseName}
          searchedExerciseName={searchedExerciseName}
          searchedMuscleGroup={searchedMuscleGroup}
          setSearchedMuscleGroup={setSearchedMuscleGroup}
          setExerciseID={setExerciseID}
        />
      </div>

      <div className="setsRepsWeightRender">
      <SetsRepsWeight
        searchedExerciseName={searchedExerciseName}
        searchedMuscleGroup={searchedMuscleGroup}
        setExerciseParameters={setExerciseParameters}
        setAddExerciseButton={setAddExerciseButton}
        parameterReset={parameterReset}
      />
      </div>

      { searchedExerciseName || searchedMuscleGroup ? 
      <div className="buildingExerciseContainer">
      <div className="buildingExerciseNames">
      {searchedExerciseName && searchedExerciseName.label && <p>{searchedExerciseName.label}</p>}
      {searchedMuscleGroup && searchedMuscleGroup.label && <p>{searchedMuscleGroup.label}</p>}
      </div>
      <div className="buildingExercise">
        {exerciseParameters.sets !== 0 && <p>Sets: {exerciseParameters.sets}</p>}
        {exerciseParameters.reps !== 0 && <p>Reps: {exerciseParameters.reps}</p>}
        {exerciseParameters.weight !== 0 && <p>Weight: {exerciseParameters.weight}kg</p>}
        {exerciseParameters.rest !== 0 && <p>Rest: {exerciseParameters.rest} sec</p>}

      </div>
      </div>
  : null}
      <div className={addExerciseButton ? "addExerciseButton" : "hidden"} id={addExerciseButton ? "addExerciseButton" : undefined}>
      <MDBBtn onClick={addExercise}>Add Exercise To Workout</MDBBtn>
      </div>
      <ToastContainer />

      <Steps
      enabled={stepsEnabled}
      steps={steps}
      initialStep={initialStep}
      onExit={onExit}
    />
    </div>
  );
};

export default ExerciseCreation;
