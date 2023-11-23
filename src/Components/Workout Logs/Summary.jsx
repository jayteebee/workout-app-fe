import React, { useState } from "react";
import "../../CSS/Summary.css";

const Summary = ({ currentWorkout, allExercises }) => {
  const [allExercisesState, setAllExercisesState] = useState(allExercises);

  let valueTrackerArray = [];
  let totalVolumePerExercise = [];

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
          totalSets: 0,
        };
      }
      valueTracker[set.exercise_id].totalWeight += set.weight_used;
      valueTracker[set.exercise_id].totalReps += set.reps_completed;
      valueTracker[set.exercise_id].totalTimeUnderTension += set.set_timer;
      valueTracker[set.exercise_id].totalSets += 1;
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
    // console.log('allExercisesState in faulty ', allExercisesState)
    if (allExercisesState.length > 0) {
        const exercise = allExercisesState.filter(
          (exercise) => exercise.id === exerciseID
        );
        // console.log('exercise',exercise, "ex 0 name", exercise[0].name)
            return exercise[0].name;
    }
  };

  const exerciseIdToVolume = (exerciseID) => {
    const volume = totalVolumePerExercise.filter(
      (exercise) => exercise.id === exerciseID
    );
    return volume[0].volume;
  };
  console.log('valueTrackerArray',valueTrackerArray)
//   console.log('totalVolumePerExercise',totalVolumePerExercise)

  let totalWorkoutVolume = totalVolumePerExercise.reduce((acc, exercise) => {
    return acc + exercise.volume
  }, 0)

let totalWorkoutTimeUnderTension = 0
let totalWorkoutReps = 0
let totalWorkoutSets = 0

 valueTrackerArray.forEach((exercise) => {
    totalWorkoutTimeUnderTension += exercise.totalTimeUnderTension
    totalWorkoutReps += exercise.totalReps
    totalWorkoutSets += exercise.totalSets

})

  // overall return
  return (
    <div>
    <h2>Summary</h2>
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
          {valueTrackerArray &&
            valueTrackerArray.map((exercise, index) => (
              <tbody key={index}>
                <tr>
                  <td>{exerciseIdToName(exercise.id)}</td>
                  <td>{exerciseIdToVolume(exercise.id)}kg</td>
                  <td>{exercise.totalTimeUnderTension}s</td>
                  <td>{exercise.totalReps}</td>
                  <td>{exercise.totalSets}</td>
                </tr>
              </tbody>
            ))}
            <tfoot>
            <tr>
            <th>Workout Totals</th>
            <td>{totalWorkoutVolume}kg</td>
            <td>{totalWorkoutTimeUnderTension}'s</td>
            <td>{totalWorkoutReps}</td>
            <td>{totalWorkoutSets}</td>
            </tr>
            </tfoot>
        </table>
      </div>
    </div>

  </div>
  );
};

export default Summary;
