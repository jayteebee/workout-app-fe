import React, { useState, useEffect } from "react";
import { getAllExercises } from "../../API/Exercise/Exercise";

const PersonalRecords = ({ sortedSessionLogs }) => {
//   console.log("sortedSessionLogs", sortedSessionLogs);
  const [arrayOfExerciseObjects, setArrayOfExerciseObjects] = useState([]);
//   console.log("arrayOfExerciseObjects", arrayOfExerciseObjects);
const [allExercises, setAllExercises] = useState()


useEffect(() => {
  getAllExercises()
  .then((data) => setAllExercises(data))
  .catch((err) => console.log('error getting all exercises',err))
}, [])

const allExerciseNames = allExercises && allExercises.length > 0 &&
allExercises.map((exercise) => exercise.name)
// console.log('allExerciseNames',allExerciseNames)

// *** cycles through the sortedSessionLogs, removes duplicate exercise ID's then adds the logs belonging to the exercise
// *** to arrayOfExerciseObjects state
  useEffect(() => {
    let exerciseIds = new Set();

    sortedSessionLogs &&
      sortedSessionLogs.length > 0 &&
      sortedSessionLogs.forEach((log) => {
        const exerciseSession = log.details.exercise_sessions;

        exerciseSession.forEach((exercise) => {
          exerciseIds.add(exercise.exercise_id);
        });
      });

    const newExerciseObjects = [];

    exerciseIds.forEach((id) => {
      const matchingExercise = sortedSessionLogs.find((log) =>
        log.details.exercise_sessions.some(
          (exercise) => exercise.exercise_id === id
        )
      );
// console.log('matchingExercise',matchingExercise)
      if (matchingExercise) {
        const exercise = matchingExercise.details.exercise_sessions.find(
          (ex) => ex.exercise_id === id
        );

const exerciseName = allExercises && allExercises.length > 0 && allExercises.filter((e) => e.id === exercise.exercise_id)[0].name
   
const newExerciseObject = {
          exerciseName: exerciseName,
          exerciseId: exercise.exercise_id,
          oneRepMax: 0,
          highestVolumeSingleSet: 0,
          strongestTimeUnderTension: 0,
          estimatedOneRepMax: 0,
        };
// console.log('newExerciseObject',newExerciseObject)
        newExerciseObjects.push(newExerciseObject);
      }
    });

    // Update the state after the loop finishes
    setArrayOfExerciseObjects((prevState) => [
      // ...prevState,
      ...newExerciseObjects,
    ]);
  }, [sortedSessionLogs, allExercises]);


  useEffect(() => {
    if (arrayOfExerciseObjects && arrayOfExerciseObjects.length > 0) {
      let exerciseIds = new Set();

      sortedSessionLogs &&
        sortedSessionLogs.length > 0 &&
        sortedSessionLogs.forEach((log) => {
          const exerciseSession = log.details.exercise_sessions;

          exerciseSession.forEach((exercise) => {
            exerciseIds.add(exercise.exercise_id);
          });
        });
      exerciseIds.forEach((id) => {
        const matchingExercise = sortedSessionLogs.filter((log) =>
          log.details.exercise_sessions.some(
            (exercise) => exercise.exercise_id === id
          )
        );

        // console.log("matchingExercise", matchingExercise);

        matchingExercise.forEach((exObj) => {
          exObj.details.exercise_sessions.forEach((exercise) => {
            const reps = exercise.reps_completed;
            const weight = exercise.weight_used;
            const exerciseID = exercise.exercise_id;
            const timeUnderTension = exercise.set_timer;
            const estimated1RM = reps * 1.1307 + 0.6998;

            const currentExerciseObject = arrayOfExerciseObjects.find(
              (item) => item.exerciseId === exerciseID
            );

            if (currentExerciseObject) {
              const volume = reps * weight;
              const strongestTUT = timeUnderTension * weight;

              if (volume > currentExerciseObject.highestVolumeSingleSet) {
                const updatedArrayOfExercises = arrayOfExerciseObjects.map(
                  (item) =>
                    item.exerciseId === exerciseID
                      ? { ...item, highestVolumeSingleSet: volume }
                      : item
                );

                setArrayOfExerciseObjects(updatedArrayOfExercises);
              }
              if (
                strongestTUT > currentExerciseObject.strongestTimeUnderTension
              ) {
                const updatedArrayOfExercises = arrayOfExerciseObjects.map(
                  (item) =>
                    item.exerciseId === exerciseID
                      ? { ...item, strongestTimeUnderTension: strongestTUT }
                      : item
                );

                setArrayOfExerciseObjects(updatedArrayOfExercises);
              }

              if (exerciseID === 1 || exerciseID === 14 || exerciseID === 15) {
                if (estimated1RM > currentExerciseObject.estimatedOneRepMax) {
                  const updatedArrayOfExercises = arrayOfExerciseObjects.map(
                    (item) =>
                      item.exerciseId === exerciseID
                        ? { ...item, estimatedOneRepMax: estimated1RM }
                        : item
                  );
                  setArrayOfExerciseObjects(updatedArrayOfExercises);
                }
              } else (<div>N/A</div>)
            }
          });
        });
      });
    }
  }, [arrayOfExerciseObjects]);

  return (
    <div className="tableContainer individualLog">
    <h2>Personal Records</h2>
      <div className="tableWrapper">
        <table className="customTable">
          <thead>
            <tr>
              <th>Exercise</th>
              <th>One Rep Max (kg)</th>
              <th>Estimated One Rep Max (kg)</th>
              <th>Highest Volume Single Set (kg)</th>
              <th>Strongest Time Under Tension (kg)</th>
            </tr>
          </thead>

          {arrayOfExerciseObjects &&
            arrayOfExerciseObjects.length > 0 &&
            arrayOfExerciseObjects.map((exerciseObject, index) => (
              <tbody key={index}>
                <tr>
                  <td>{exerciseObject.exerciseName}</td>
                  <td>
                    {exerciseObject.oneRepMax
                      ? Number(exerciseObject.oneRepMax.toFixed(2))
                      : "N/A"}
                  </td>
                  <td>
                    {exerciseObject.estimatedOneRepMax
                      ? Number(exerciseObject.estimatedOneRepMax.toFixed(2))
                      : "N/A"}
                  </td>
                  <td>{exerciseObject.highestVolumeSingleSet}</td>
                  <td>{exerciseObject.strongestTimeUnderTension}</td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
};

export default PersonalRecords;
