import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getExercisesInWorkout } from "../API/Workout/Workout";

const ViewExercises = () => {
  const location = useLocation();
  const workoutID = location.state?.workoutId;
  console.log("VE WID", workoutID);

  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    if (workoutID) {
      getExercisesInWorkout(workoutID)
        .then((data) => {
          setExercises(data);
        })
        .catch((err) => {
          console.log("getExercisesInWorkout API Call Failed", err);
        });
    }
  }, [workoutID]);

  console.log("exercises", exercises);
  return (
    <div>
      <h3 className="pageHeader">Exercises</h3>

      {exercises.map((exercises, index) => (
        <div key={index}>
          <p>{exercises.exercise.name}</p>
          <p>SETS: {exercises.sets}</p>
           <p>REPS:{exercises.reps}</p>
          
        </div>
      ))}
    </div>
  );
};

export default ViewExercises;
