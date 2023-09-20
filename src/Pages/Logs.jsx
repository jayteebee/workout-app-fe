import React, { useEffect, useState } from "react";
import { getAllSessionLogs } from "../API/SessionLogs/SessionLogs";

const Logs = () => {
  const [sessionLogs, setSessionLogs] = useState([]);
  console.log("sessionLogs", sessionLogs);
  useEffect(() => {
    getAllSessionLogs()
      .then((data) => {
        setSessionLogs(data);
      })
      .catch((err) =>
        console.log("Error with getAllSessionLogs API Call", err)
      );
  }, []);

  const workoutLogs =
    sessionLogs.length > 0 &&
    sessionLogs.map((log, index) => (
      <div key={index}>
        <h4>Workout: {log.details.routine_workout_id}</h4>
        <h4>Date Completed: {log.details.date}</h4>
        {log.details.exercise_sessions.map((exercise, exerciseIndex) => (
          <div key={exerciseIndex}>
            <p>Set: {exercise.sets_completed}</p>
            <p>Reps: {exercise.reps_completed}</p>
            <p>Weight: {exercise.weight_used}</p>
            <p>Set Duration: {exercise.set_timer} seconds</p>
          </div>
        ))}
      </div>
    ));

  return (
    <div>
      <h2>Logs</h2>
      {workoutLogs}
    </div>
  );
};

export default Logs;
