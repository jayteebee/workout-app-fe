import React, { useEffect, useState } from "react";
import { getAllSessionLogs } from "../API/SessionLogs/SessionLogs";
import { getAllExercises } from "../API/Exercise/Exercise";
import { getAllWorkouts } from "../API/Workout/Workout";
import format from "date-fns/format";
import { getTime, parseISO } from 'date-fns'



const Logs = () => {
  const [sessionLogs, setSessionLogs] = useState([]);
  console.log("sessionLogs", sessionLogs);
  const [allExercises, setAllExercises] = useState([])
  // console.log("allExercises", allExercises);
  const [allWorkouts, setAllWorkouts] = useState([])
console.log('allWorkouts', allWorkouts)

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
      getAllWorkouts()
      .then((workoutData) => {
        setAllWorkouts(workoutData);
      })
      .catch((error) =>
        console.log("Error with getAllWorkouts API Call", error)
      );
  }, []);

  const workoutLogs =
    sessionLogs.length > 0 &&
    sessionLogs.map((log, index) => {
      const filteredWorkout = allWorkouts.length > 0 && allWorkouts.filter((workout) => workout.id === log.details.routine_workout_id );
      const inputDate = new Date(`${log.details.date}`);
      const formattedDate = format(inputDate, "yyyy-MM-dd");
      const formattedTime = format(inputDate, "HH:mm:ss");
      const parsedDate = parseISO(formattedDate);
      const dateToWords = format(parsedDate, "EEEE, do MMMM yyyy");

      return (
      <div key={index}>
        <h2>Workout: {filteredWorkout[0].name}</h2>
        <h4>Date Completed: {dateToWords} {formattedTime} </h4>

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
    )

      });

  return (
    <div>
      <h2 style={{textDecoration: "underline"}}>Logs</h2>
      {workoutLogs}

    </div>
  );
};

export default Logs;
