import React, { useEffect, useState } from "react";
import { getAllSessionLogs } from "../API/SessionLogs/SessionLogs";
import { getAllExercises } from "../API/Exercise/Exercise";
import BackButton from "../Components/Navigation/BackButton";

const Logs = () => {
  const [sessionLogs, setSessionLogs] = useState([]);
  // console.log("sessionLogs", sessionLogs);
  const [allExercises, setAllExercises] = useState([])
  // console.log("allExercises", allExercises);

  useEffect(() => {
    getAllSessionLogs()
      .then((data) => {
        setSessionLogs(data);
      })
      .catch((err) =>
        console.log("Error with getAllSessionLogs API Call", err)
      );
      getAllExercises()
      .then((exData) => {
        setAllExercises(exData);
      })
      .catch((error) =>
        console.log("Error with getAllExercises API Call", error)
      );
  }, []);

  const workoutLogs =
    sessionLogs.length > 0 &&
    sessionLogs.map((log, index) => (
      <div key={index}>
        <h4>Workout: {log.details.routine_workout_id}</h4>
        <h4>Date Completed: {log.details.date}</h4>
        {log.details.exercise_sessions.map((exercise, exerciseIndex) => {
          const filteredExercise = allExercises.length > 0 && allExercises.filter((ex) => ex.id === exercise.exercise_id)
          return (
          <div key={exerciseIndex}>
          {filteredExercise && (
            <div>
            <p>Exercise: {filteredExercise[0].name}</p>
            <p>Set: {exercise.sets_completed}</p>
            <p>Reps: {exercise.reps_completed}</p>
            <p>Weight: {exercise.weight_used}</p>
            <p>Set Duration: {exercise.set_timer} seconds</p>
            </div>
          )}
          </div>
          )
        })}
      </div>
    ));

  return (
    <div>
      <h2>Logs</h2>
      {workoutLogs}
      <BackButton />

    </div>
  );
};

export default Logs;
