import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import StopWatch from "../Components/WorkoutSession/StopWatch";
import greenRhombus from "../CSS/Icons/GreenRhombus.png";
import redRhombus from "../CSS/Icons/redRhombus.png";
import purpleRhombus from "../CSS/Icons/purpleRhombus.png";

const WorkoutSession = () => {
const [buttonColor, setButtonColor] = useState("green")
console.log("buttonColor", buttonColor)
  const location = useLocation();
  const exercisesInWorkout = location.state?.exercisesInWorkout;
  console.log("exercisesInWorkout", exercisesInWorkout);


const exerciseButton = (value) => {
setButtonColor("")
setButtonColor(value)
}

  const workoutName = exercisesInWorkout.map((exercise) => (
    <div key={exercise.id}>
      <h2>Workout Name: {exercise.workout_name}</h2>
    </div>
  ));

  const displayWorkoutData = exercisesInWorkout.map((exercise, i) => (
    <div key={exercise.id} className="exerciseSession">
      <div className="exerciseInfo">
        <p>{i + 1}:</p>
        <p>{exercise.exercise.name}</p>
        <p>Sets: {exercise.sets}</p>
        <p>Reps: {exercise.reps}</p>

        {buttonColor === "green" ? 
      <button className="button" onClick={() => exerciseButton("red")}>
          <img src={greenRhombus} alt="edit" className="rhombus" />{" "}
        </button> : null
      }
        
      {buttonColor === "red" ? <button className="button" onClick={() => exerciseButton("purple")}>
          <img src={redRhombus} alt="edit" className="rhombus" />
        </button> : null}
        
{buttonColor === "purple" ? <button className="button" onClick={() => exerciseButton("green")}>
          <img src={purpleRhombus} alt="edit" className="rhombus" />{" "}
        </button> : null}
        

      </div>
    </div>
  ));
  console.log("displayWorkoutData", displayWorkoutData);

  return (
    <div>
      <div>WorkoutSession</div>
      <StopWatch />
      {workoutName}
      {displayWorkoutData}
    </div>
  );
};

export default WorkoutSession;
