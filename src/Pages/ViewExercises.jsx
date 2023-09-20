import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getExercisesInWorkout } from "../API/Workout/Workout";
import BackButton from "../Components/Navigation/BackButton";
import "../CSS/Exercises.css";

const ViewExercises = () => {
  const location = useLocation();
  const workoutID = location.state?.workoutId;

  const [exercises, setExercises] = useState([]);
  console.log("Exercises", exercises);
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

  return (
    <div>
      <h3 className="pageHeader">Exercises</h3>
      <div className="scrollableDivForViewExercises">
        {exercises.map((exercises, index) => (
          <div key={index} className="exerciseSession">
          <div> 
            <p>{exercises.exercise.name}</p>
            <p>Sets: {exercises.sets}</p>
            <p>Reps: {exercises.reps}</p>
            <p>Rest: {exercises.rest_timer} seconds</p>
            </div>
          </div>
        ))}
      </div>
    <BackButton />

    </div>
  );
};

export default ViewExercises;
