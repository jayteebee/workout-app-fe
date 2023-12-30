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
      <div className="tableContainer">
      <div className="tableWrapper">
        <table className="customTable">
        <thead>
        <tr>
          <th>Exercise</th>
          <th>Set</th>
          <th>Reps</th>
          <th>Weight (kg)</th>
          <th>Rest Timer (s)</th>
        </tr>
      </thead>

      <tbody>
      {exercises.map((exercises, index) => {
return (
        <tr key={index}> 
          <td>{exercises.exercise.name}</td>
          <td>{exercises.sets}</td>
          <td>{exercises.reps}</td>
          <td>{exercises.weight}</td>
          <td>{exercises.rest_timer}</td>
        </tr>
)
      })}
      </tbody>
        </table>
      </div>
      </div>
    <BackButton />

    </div>
  );
};

export default ViewExercises;
