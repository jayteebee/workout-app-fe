import React from "react";

const Analytics = ({ currentWorkout }) => {

  const analysis = currentWorkout.map((log, index) => {

    return (
      <div key={index}>
        <h2 style={{ textDecoration: "underline" }}>Analytics</h2>
        {log.details.exercise_sessions.map((exercise, exIndex) => {
            const sets = log.details.exercise_sessions
            console.log('sets', sets)

            const valueTracker = {}

            sets.forEach((set) => {
                if (!valueTracker[set.exercise_id]) {
                    valueTracker[set.exercise_id] = {id: set.exercise_id, totalWeight: 0, totalReps: 0, totalTimeUnderTension: 0 }
                }
                valueTracker[set.exercise_id].totalWeight += set.weight_used
                valueTracker[set.exercise_id].totalReps += set.reps_completed
                valueTracker[set.exercise_id].totalTimeUnderTension += set.set_timer

            })
            const valueTrackerArray = Object.values(valueTracker)
            console.log('valueTrackerArray', valueTrackerArray)

          return <div key={exIndex}>{exercise.sets_completed}</div>;
        })}

      </div>
    );
  });

  return (
    <div>
      {analysis}
      <table>
      <thead>
        <tr>
          <th>Exercise</th>
          <th>Total Weight Volume Lifted</th>
          <th>Total Time Under Tension</th>
          <th>Total Reps</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Bench</td>
            <td>Volume</td>
            <td>TUT</td>
            <td>Reps</td>
        </tr>
    </tbody>    
      </table>
    </div>
  );
};

export default Analytics;
