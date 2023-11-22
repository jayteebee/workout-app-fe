import React, { useState } from "react";

const Analytics = ({ currentWorkout, allExercises }) => {
  const [allExercisesState, setAllExercisesState] = useState(allExercises);

  const analysis = currentWorkout.map((log, index) => {

    return (
        
      <div key={index}>
        <h2 style={{ textDecoration: "underline" }}>Analytics</h2>

        {log.details.exercise_sessions.map((exercise, exIndex) => {

            // each set in a workout, multiple exercises 
          const sets = log.details.exercise_sessions;
          console.log("sets", sets);

          // an accumulation of each exercises data. This includes multiple sets of the same exercise
          const valueTracker = {};

          sets.forEach((set) => {
            if (!valueTracker[set.exercise_id]) {
              valueTracker[set.exercise_id] = {
                id: set.exercise_id,
                totalWeight: 0,
                totalReps: 0,
                totalTimeUnderTension: 0,
              };
            }
            valueTracker[set.exercise_id].totalWeight += set.weight_used;
            valueTracker[set.exercise_id].totalReps += set.reps_completed;
            valueTracker[set.exercise_id].totalTimeUnderTension +=
              set.set_timer;
          });

          const valueTrackerArray = Object.values(valueTracker);
          console.log("valueTrackerArray", valueTrackerArray);

          // as var name suggests
          const totalVolumePerExercise = valueTrackerArray.map((exercise) => {
            return {
              id: exercise.id,
              volume: exercise.totalWeight * exercise.totalReps,
            };
          });
          console.log("totalVolumePerExercise", totalVolumePerExercise);

          // this return belongs to the initial map
          return (
            <div>
             <p>hi</p>
            </div>
          );
        })}
      </div>
    );
  });

  return <div>{analysis}</div>;
};

export default Analytics;


// <table>
// <thead>
//   <tr>
//     <th>Exercise</th>
//     <th>Total Weight Volume Lifted</th>
//     <th>Total Time Under Tension</th>
//     <th>Total Reps</th>
//   </tr>
// </thead>
// <tbody>
//   <tr>
//     <td>Bench</td>
//     <td>Volume</td>
//     <td>TUT</td>
//     <td>Reps</td>
//   </tr>
// </tbody>
// </table>