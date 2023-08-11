import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";

const SetsRepsWeight = ({ searchedExerciseName, searchedMuscleGroup, setExerciseParameters }) => {

  const [sets, setSets] = useState(null);
  const [reps, setReps] = useState(null);
  const [weight, setWeight] = useState(null);

  useEffect(() => {
    if (sets !== null || reps !== null || weight !== null) {
      setExerciseParameters((prevParameters) => ({
        ...prevParameters,

        name:
          searchedExerciseName !== null ? searchedExerciseName.value :
            searchedMuscleGroup !== null ? searchedMuscleGroup.label :
            prevParameters.name,

        sets: sets !== null ? sets.value : prevParameters.sets,
        reps: reps !== null ? reps.value : prevParameters.reps,
        weight: weight !== null ? weight.value : prevParameters.weight,
      }));
    }
  }, [sets, reps, weight, searchedExerciseName, searchedMuscleGroup]);

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
      {searchedExerciseName || searchedMuscleGroup ? (
        <div>
          
          <ReactSelect
            placeholder="Sets"
            options={setOptions}
            value={sets}
            onChange={updateSets}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                width: "7vw",
              }),
              menu: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: "rgba(11, 12, 16, 0.3)",
                width: "7vw"
              }),
              option: (baseStyles, { isFocused }) => ({
                ...baseStyles,
                backgroundColor: isFocused ? "#1F2833" :"rgba(11, 12, 16, 0.6)" , 
                color: "#66fcf1", 
              }),
            }}
          />
          <h3 className="subHeader">Reps</h3>
          <ReactSelect
            placeholder="Reps"
            options={repOptions}
            value={reps}
            onChange={updateReps}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                width: "7vw",
              }),
              menu: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: "rgba(11, 12, 16, 0.3)",
                width: "7vw"
              }),
              option: (baseStyles, { isFocused }) => ({
                ...baseStyles,
                backgroundColor: isFocused ? "#1F2833" :"rgba(11, 12, 16, 0.6)" , 
                color: "#66fcf1", 
              }),
            }}
          />
          <h3 className="subHeader">Weight</h3>
          <ReactSelect
            placeholder="Weight"
            options={weightOptions}
            value={weight}
            onChange={updateWeight}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                width: "7vw",
              }),
              menu: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: "rgba(11, 12, 16, 0.3)",
                width: "7vw"
              }),
              option: (baseStyles, { isFocused }) => ({
                ...baseStyles,
                backgroundColor: isFocused ? "#1F2833" :"rgba(11, 12, 16, 0.6)" , 
                color: "#66fcf1", 
              }),
            }}
          />{" "}
        </div>
      ) : null}
    </div>
  );
};

export default SetsRepsWeight;
