import React, { useState } from "react";
import ReactSelect from "react-select";

const SetsRepsWeight = ({ searchedExerciseName, searchedMuscleGroup }) => {
  console.log("searchedExerciseName:SRW", searchedExerciseName);
  console.log("searchedMuscleGroup:SRW", searchedMuscleGroup);
  const [exerciseParameters, setExerciseParameters] = useState({
    sets: 0,
    reps: 0,
    weight: 0,
  });
  console.log("exerciseParameters", exerciseParameters);

  const [sets, setSets] = useState(null);
  const [reps, setReps] = useState(null);
  const [weight, setWeight] = useState(null);
  console.log("sets", sets);
  console.log("reps", reps);
  console.log("weight", weight);



  let setOptions = [];
  for (let i = 0; i < 21; i++) {
    setOptions.push({ label: `${i}`, value: i });
  }

  let repOptions = [];
  for (let i = 0; i < 40; i++) {
    repOptions.push({ label: `${i}`, value: i });
  }

  let weightOptions = [];
  for (let i = 0; i < 500; i += 2.5) {
    weightOptions.push({ label: `${i}`, value: i });
  }
console.log("weightOptions",weightOptions)
  const updateSets = (sets) => {
    setSets(sets);
  };

  const updateReps = (reps) => {
    setReps(reps);
  };

  const updateWeight = (weight) => {
    setWeight(weight);
  };

  return (
    <div>
      <h3>Sets</h3>
      <ReactSelect
        placeholder="Sets"
        options={setOptions}
        value={sets}
        onChange={updateSets}
      />
      <h3>Reps</h3>
      <ReactSelect
        placeholder="Reps"
        options={repOptions}
        value={reps}
        onChange={updateReps}
      />
      <h3>Weight</h3>
      <ReactSelect
        placeholder="Weight"
        options={weightOptions}
        value={weight}
        onChange={updateWeight}
      />
    </div>
  );
};

export default SetsRepsWeight;
