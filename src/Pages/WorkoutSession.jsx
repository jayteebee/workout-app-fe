import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StopWatch from "../Components/WorkoutSession/StopWatch";
import greenRhombus from "../CSS/Icons/GreenRhombus.png";
import redRhombus from "../CSS/Icons/redRhombus.png";
import purpleRhombus from "../CSS/Icons/purpleRhombus.png";

const WorkoutSession = () => {
  const [buttonColor, setButtonColor] = useState("green");
  // console.log("buttonColor", buttonColor);
  const [expandDiv, setExpandDiv] = useState(false);
  // console.log("expandDiv", expandDiv);

  const location = useLocation();
  const exercisesInWorkout = location.state?.exercisesInWorkout;
  // console.log("exercisesInWorkout", exercisesInWorkout);

  const exerciseButton = (value) => {
    setButtonColor("");
    setButtonColor(value);
  };

  const moreExerciseInfo = () => {
    setExpandDiv((prevState) => !prevState);
  };

  const workoutName = (
    <h2>Workout Name: {exercisesInWorkout[0].workout_name}</h2>
  );

  const displayWorkoutData = exercisesInWorkout.map((exercise, i) => (
    <div key={exercise.id} className="exerciseSession">
      <div className="exerciseInfo">
        <div style={{ width: "5%" }}>
          <p>
            {i + 1} {")"}
          </p>
        </div>

        <div
          className={
            expandDiv
              ? "exerciseSessionBorderExpanded"
              : "exerciseSessionBorder"
          }
          onClick={moreExerciseInfo}
        >
          <p>{exercise.exercise.name}</p>
          <p>Sets {exercise.sets}</p>
          <p>Reps {exercise.reps}</p>
        </div>

        {buttonColor === "green" ? (
          <button className="button" onClick={() => exerciseButton("red")}>
            <img src={greenRhombus} alt="edit" className="rhombus" />
          </button>
        ) : null}

        {buttonColor === "red" ? (
          <button className="button" onClick={() => exerciseButton("purple")}>
            <img src={redRhombus} alt="edit" className="rhombus" />
          </button>
        ) : null}

        {buttonColor === "purple" ? (
          <button className="button" onClick={() => exerciseButton("green")}>
            <img src={purpleRhombus} alt="edit" className="rhombus" />
          </button>
        ) : null}
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
