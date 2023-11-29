import { MDBBtn } from "mdb-react-ui-kit";
import ReactSelect from "react-select";

import React, { useEffect, useState } from "react";

const WorkoutExerciseFilter = ({ sortedSessionLogs, allExercises, setSessionLogsByChosenExercise, setSessionLogsByChosenName }) => {
  console.log("sortedSessionLogs", sortedSessionLogs);
  // console.log('allExercises',allExercises)
  const [chosenExerciseToFilter, setChosenExerciseToFilter] = useState("")
// console.log('chosenExerciseToFilter',chosenExerciseToFilter)

  const allExerciseNames = allExercises.map((exercise) => ({
    value: exercise.id,
    label: exercise.name,
  }));
  console.log('allExerciseNames',allExerciseNames) 

const [temp, setTemp] = useState([])
console.log('temp',temp)

  useEffect(() => {
    if (chosenExerciseToFilter) {
      const sessionLogsByChosenExerciseFilter = sortedSessionLogs.filter((log) =>
        log.details.exercise_sessions.some(
          (exerciseSession) => exerciseSession.exercise_id === chosenExerciseToFilter
        )
      );
      console.log('sessionLogsByChosenExerciseFilter',sessionLogsByChosenExerciseFilter)
      setTemp(sessionLogsByChosenExerciseFilter)
      setSessionLogsByChosenExercise(sessionLogsByChosenExerciseFilter);

    }
  }, [chosenExerciseToFilter]);

  return (
    <div>
      <ReactSelect 
      options={allExerciseNames}
      onChange={(e) => {
        setSessionLogsByChosenName(null);
        setChosenExerciseToFilter(e.value);
      }}
      />
    </div>
  );
};

export default WorkoutExerciseFilter;
