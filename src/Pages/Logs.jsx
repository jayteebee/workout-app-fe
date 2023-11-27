import React, { useEffect, useState } from "react";
import { getAllSessionLogs } from "../API/SessionLogs/SessionLogs";
import { getAllExercises } from "../API/Exercise/Exercise";
import { getAllWorkouts } from "../API/Workout/Workout";
import format from "date-fns/format";
import { getTime, parseISO } from "date-fns";
import "../CSS/Logs.css";
import Summary from "../Components/Workout Logs/Summary";
import WorkoutLogsFilter from "../Components/Workout Logs/WorkoutLogsFilter";

// stores the workout logs

const Logs = () => {
  const [sessionLogs, setSessionLogs] = useState([]);
  // console.log("sessionLogs", sessionLogs);
  const [allExercises, setAllExercises] = useState([]);
  // console.log("allExercises", allExercises);
  const [allWorkouts, setAllWorkouts] = useState([]);
  // console.log('allWorkouts', allWorkouts)
  const [sessionLogsByChosenName, setSessionLogsByChosenName] = useState();
  // console.log("sessionLogsByChosenName", sessionLogsByChosenName);

  const sortedSessionLogs = sessionLogs.sort(
    (a, b) => new Date(b.details.date) - new Date(a.details.date)
  );

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
    sortedSessionLogs.length > 0 &&
    // matches the session log with the workout id, this gives us access to the name of the workout
    sortedSessionLogs.map((log, index) => {

      const filteredWorkout =
        allWorkouts.length > 0 &&
        allWorkouts.filter(
          (workout) => workout.id === log.details.routine_workout_id
        );

      const inputDate = new Date(`${log.details.date}`);
      const formattedDate = format(inputDate, "yyyy-MM-dd");
      const formattedTime = format(inputDate, "HH:mm:ss");
      const parsedDate = parseISO(formattedDate);
      const dateToWords = format(parsedDate, "EEEE, do MMMM yyyy");

      const currentWorkout =
        filteredWorkout &&
        sortedSessionLogs.filter(
          (log) => log.details.routine_workout_id === filteredWorkout[0].id
        );
      //  console.log('currentWorkout',currentWorkout)

      return (
        <div key={index} className="tableContainer individualLog">
          <h2 className="workoutName">
            Workout: {filteredWorkout && filteredWorkout[0].name}
          </h2>
          <h4 style={{ textDecoration: "underline" }}>
            Date Completed: {dateToWords}, {formattedTime}.{" "}
          </h4>

          <div className="tableWrapper">
            <table className="customTable">
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Set</th>
                  <th>Reps</th>
                  <th>Weight</th>
                  <th>Set Duration</th>
                </tr>
              </thead>

              <tbody>
                {log.details.exercise_sessions.map(
                  (exercise, exerciseIndex) => {
                    const filteredExercise =
                      allExercises.length > 0 &&
                      allExercises.filter(
                        (ex) => ex.id === exercise.exercise_id
                      );

                    return (
                      filteredExercise && (
                        <tr key={exerciseIndex}>
                          <td>{filteredExercise[0].name}</td>
                          <td>{exercise.sets_completed}</td>
                          <td>{exercise.reps_completed}</td>
                          <td>{exercise.weight_used}kg</td>
                          <td>{exercise.set_timer} s</td>
                        </tr>
                      )
                    );
                  }
                )}
              </tbody>
            </table>
          </div>

          {currentWorkout && (
            <Summary
              currentWorkout={currentWorkout}
              allExercises={allExercises}
            />
          )}

        </div>
      );
    });

const workoutLogsFilteredByName = sessionLogsByChosenName && sessionLogsByChosenName.length > 0 &&
sessionLogsByChosenName.map((log, index) => {

        const inputDate = new Date(`${log.details.date}`);
      const formattedDate = format(inputDate, "yyyy-MM-dd");
      const formattedTime = format(inputDate, "HH:mm:ss");
      const parsedDate = parseISO(formattedDate);
      const dateToWords = format(parsedDate, "EEEE, do MMMM yyyy");

      const currentWorkout = sessionLogsByChosenName

      return (
        <div key={index} className="tableContainer individualLog">
          <h2 className="workoutName">{log.workout_name}</h2>
            <h4 style={{ textDecoration: "underline" }}>
              Date Completed: {dateToWords}, {formattedTime}.
            </h4>

            <div className="tableWrapper">
            <table className="customTable">
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Set</th>
                  <th>Reps</th>
                  <th>Weight</th>
                  <th>Set Duration</th>
                </tr>
              </thead>
                <tbody>
                                  {log.details.exercise_sessions.map(
                  (exercise, exerciseIndex) => {
                    const filteredExercise =
                      allExercises.length > 0 &&
                      allExercises.filter(
                        (ex) => ex.id === exercise.exercise_id
                      );

                    return (
                      filteredExercise && (
                        <tr key={exerciseIndex}>
                          <td>{filteredExercise[0].name}</td>
                          <td>{exercise.sets_completed}</td>
                          <td>{exercise.reps_completed}</td>
                          <td>{exercise.weight_used}kg</td>
                          <td>{exercise.set_timer} s</td>
                        </tr>
                      )
                    );
                  }
                )}
                </tbody>
              </table>
        </div>

        {currentWorkout && (
          <Summary
            currentWorkout={currentWorkout}
            allExercises={allExercises}
          />
        )}
        </div>
      )
})

  return (
    <div className="grid-container">
      <h2 className="pageHeader logs">Logs</h2>
      <div className="workoutLogs">
      {sortedSessionLogs && 
        allWorkouts &&
        <div>
    <h3>--- Filter By ---</h3>

        <WorkoutLogsFilter
        allExercises={allExercises}
        sortedSessionLogs={sortedSessionLogs}
        allWorkouts={allWorkouts}
        setSessionLogsByChosenName={setSessionLogsByChosenName}
        />
      </div>
      }
      {sessionLogsByChosenName ? workoutLogsFilteredByName :  workoutLogs}
      </div>
    </div>
  );
};

export default Logs;
