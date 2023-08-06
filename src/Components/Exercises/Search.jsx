import React, { useState, useEffect } from "react";
import { getAllExercises } from "../../API/Exercise/Exercise";
import ReactSelect from "react-select";

const Search = () => {
  const [searchedExerciseName, setSearchedExerciseName] = useState(null);
  console.log("searchedExerciseName - Search", searchedExerciseName);
  const [searchedMuscleGroup, setSearchedMuscleGroup] = useState(null);
  console.log("searchedMuscleGroup - Search", searchedMuscleGroup);
  const [allExercises, setAllExercises] = useState([]);

  useEffect(() => {
    getAllExercises()
      .then((data) => {
        setAllExercises(data);
      })
      .catch((err) => {
        console.log("getAllExercises API Call Failed: ", err);
      });
  }, []);
  console.log(allExercises);

  const exerciseName = allExercises.map((exercise) => ({
    label: exercise.name,
  }));

  const handleChangeForExerciseName = (searchedExerciseName) => {
    setSearchedExerciseName(searchedExerciseName);
  };

  const handleChangeForMuscleGroup = (searchedMuscleGroup) => {
    setSearchedMuscleGroup(searchedMuscleGroup);
  };

  const muscleGroup = allExercises.map((exercise) => ({
    label: exercise.name,
    value: exercise.primary_muscles
  }));

  return (
    <div>
      <h3>Search</h3>
      <ReactSelect
        placeholder="Search By Exercise Name"
        options={exerciseName}
        value={searchedExerciseName}
        onChange={handleChangeForExerciseName}
      />

      <ReactSelect
        placeholder="Search By Muscle Group"
        options={muscleGroup}
        value={searchedMuscleGroup}
        onChange={handleChangeForMuscleGroup}
      />
    </div>
  );
};

export default Search;
