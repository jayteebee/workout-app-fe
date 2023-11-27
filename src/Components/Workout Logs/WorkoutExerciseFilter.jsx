import { MDBBtn } from "mdb-react-ui-kit";
import ReactSelect from "react-select";

import React, { useState } from "react";

const WorkoutExerciseFilter = ({ sortedSessionLogs, allExercises }) => {
  console.log("sortedSessionLogs", sortedSessionLogs);
  // console.log('allExercises',allExercises)
  const [chosenExerciseToFilter, setChosenExerciseToFilter] = useState("")
console.log('chosenExerciseToFilter',chosenExerciseToFilter)


  const allExerciseNames = allExercises.map((exercise) => ({
    value: exercise.name,
    label: exercise.name,
  }));
  // console.log('allExerciseNames',allExerciseNames)

  return (
    <div>
      <ReactSelect 
      options={allExerciseNames}
      onChange={(e) => setChosenExerciseToFilter(e.value)}
      />
    </div>
  );
};

export default WorkoutExerciseFilter;
