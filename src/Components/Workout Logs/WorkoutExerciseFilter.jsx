import { MDBBtn } from "mdb-react-ui-kit";
import ReactSelect from "react-select";

import React, { useEffect, useState } from "react";

const WorkoutExerciseFilter = ({
  sortedSessionLogs,
  allExercises,
  setSessionLogsByChosenExercise,
  setSessionLogsByChosenName,
  setSessionLogsByChosenDate
}) => {
  const [chosenExerciseToFilter, setChosenExerciseToFilter] = useState("");

  // create an object for the reactSelect component to cycle through
  const allExerciseNames = allExercises.map((exercise) => ({
    value: exercise.id,
    label: exercise.name,
  }));

  // match the existing session logs with the id of the chosen exercise in the drop down
  useEffect(() => {
    if (chosenExerciseToFilter) {
      const sessionLogsByChosenExerciseFilter = sortedSessionLogs.filter(
        (log) =>
          log.details.exercise_sessions.some(
            (exerciseSession) =>
              exerciseSession.exercise_id === chosenExerciseToFilter
          )
      );
      setSessionLogsByChosenDate(null)
      setSessionLogsByChosenName(null)
      setSessionLogsByChosenExercise(sessionLogsByChosenExerciseFilter);
    }
  }, [chosenExerciseToFilter]);


  // filter
  return (
    <div>
      <ReactSelect
        options={allExerciseNames}
        onChange={(e) => {
          setChosenExerciseToFilter(e.value);
        }}
      />
    </div>
  );
};

export default WorkoutExerciseFilter;
