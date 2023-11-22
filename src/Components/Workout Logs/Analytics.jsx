import React, { useState } from "react";
import "../../CSS/Analytics.css"

const Analytics = ({ currentWorkout, allExercises }) => {
  const [allExercisesState, setAllExercisesState] = useState(allExercises);

  let valueTrackerArray = [];
  let totalVolumePerExercise = []

  const analysis = currentWorkout.map((log) => {
    const sets = log.details.exercise_sessions;

    // an accumulation of each exercises data. This includes multiple sets of the same exercise
    const valueTracker = {};

    sets.forEach((set) => {
      if (!valueTracker[set.exercise_id]) {
        valueTracker[set.exercise_id] = {
          id: set.exercise_id,
          totalWeight: 0,
          totalReps: 0,
          totalTimeUnderTension: 0,
          totalSets: 0
        };
      }
      valueTracker[set.exercise_id].totalWeight += set.weight_used;
      valueTracker[set.exercise_id].totalReps += set.reps_completed;
      valueTracker[set.exercise_id].totalTimeUnderTension += set.set_timer;
      valueTracker[set.exercise_id].totalSets += 1
    });

    valueTrackerArray = Object.values(valueTracker);

    // as var name suggests
    totalVolumePerExercise = valueTrackerArray.map((exercise) => {
      return {
        id: exercise.id,
        volume: exercise.totalWeight * exercise.totalReps,
      };
    });
});

const exerciseIdToName = (exerciseID) => {
        const exercise = allExercisesState.filter((exercise) => exercise.id === exerciseID)
        return exercise[0].name 
}

const exerciseIdToVolume = (exerciseID) => {
    const volume = totalVolumePerExercise.filter((exercise) => exercise.id === exerciseID)
    return volume[0].volume
}

// overall return
return (
    <div className="tableContainer">

    <div className="tableWrapper">

      <table className="customTable">

        <thead>
          <tr>
            <th>Exercise</th>
            <th>Total Weight Volume Lifted</th>
            <th>Total Time Under Tension</th>
            <th>Total Reps</th>
            <th>Total Sets</th>
          </tr>
        </thead>
    {valueTrackerArray  && 
        valueTrackerArray.map((exercise) => (


          <tbody>
            <tr>
              <td>{exerciseIdToName(exercise.id)}</td>
              <td>{exerciseIdToVolume(exercise.id)}kg</td>
              <td>{exercise.totalTimeUnderTension}s</td>
              <td>{exercise.totalReps}</td>
              <td>{exercise.totalSets}</td>
            </tr>
          </tbody>
          ))}
          </table>
        </div>
  </div>
)
};

export default Analytics;

