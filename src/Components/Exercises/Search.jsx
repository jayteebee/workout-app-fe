import React, { useState, useEffect } from "react";
import { getAllExercises } from "../../API/Exercise/Exercise";
import ReactSelect from "react-select";
import { MDBBtn } from "mdb-react-ui-kit";

const Search = () => {
  const [searchedExerciseName, setSearchedExerciseName] = useState(null);
  console.log("searchedExerciseName - Search", searchedExerciseName);
  const [searchedMuscleGroup, setSearchedMuscleGroup] = useState(null);
  console.log("searchedMuscleGroup - Search", searchedMuscleGroup);
  const [allExercises, setAllExercises] = useState([]);
  const [barbells, setBarbells] = useState(false);
  const [dumbbells, setDumbbells] = useState(false);
  const [machines, setMachines] = useState(false);

  const barbellToggle = () => {
    setBarbells((prevState) => !prevState);
  };
  console.log("Barbells: ", barbells);

  const dumbbellToggle = () => {
    setDumbbells((prevState) => !prevState);
  };
  console.log("Dumbbells: ", dumbbells);

  const machineToggle = () => {
    setMachines((prevState) => !prevState);
  };
  console.log("Machines: ", machines);

  useEffect(() => {
    getAllExercises()
      .then((data) => {
        setAllExercises(data);
      })
      .catch((err) => {
        console.log("getAllExercises API Call Failed: ", err);
      });
  }, []);
  // console.log(allExercises);

  const exerciseName = allExercises.map((exercise) => ({
    label: exercise.name,
    value: exercise.name,
  }));

  const handleChangeForExerciseName = (searchedExerciseName) => {
    setSearchedExerciseName(searchedExerciseName);
  };

  const handleChangeForMuscleGroup = (searchedMuscleGroup) => {
    setSearchedMuscleGroup(searchedMuscleGroup);
  };

  const muscleGroup = allExercises.map((exercise) => ({
    label: exercise.name,
    value: exercise.name,
  }));

  const barbellFilter = allExercises.filter(
    (exercise) => exercise.equipment_used === "Barbell"
  );
  const barbellFilterMapped = barbellFilter.map((exercise) => ({
    label: exercise.name,
    value: exercise.name,
  }));
  // console.log("barbellFilterMapped", barbellFilterMapped)

  const dumbbellFilter = allExercises.filter(
    (exercise) => exercise.equipment_used === "Dumbbells"
  );
  const dumbbellFilterMapped = dumbbellFilter.map((exercise) => ({
    label: exercise.name,
    value: exercise.name,
  }));
  // console.log("dumbbellFilterMapped", dumbbellFilterMapped)

  const machineFilter = allExercises.filter(
    (exercise) => exercise.equipment_used === "Machine"
  );
  const machineFilterMapped = machineFilter.map((exercise) => ({
    label: exercise.name,
    value: exercise.name,
  }));
  // console.log("machineFilterMapped", machineFilterMapped)

let options = []
if (barbells && dumbbells && machines) {
  options = exerciseName
   }
else if (barbells && dumbbells) {
  options = [...barbellFilterMapped, ...dumbbellFilterMapped]
 } else if (barbells && machines) {
  options = [...barbellFilterMapped, ...machineFilterMapped]
 } else if (dumbbells && machines) {
  options = [...dumbbellFilterMapped, ...machineFilterMapped]
 } else if (barbells) {
  options = barbellFilterMapped
} else if (dumbbells) {
  options = dumbbellFilterMapped
} else if (machines) {
  options = machineFilterMapped
} else {
  options = exerciseName
}
console.log("options", options)
  return (
    <div>
      <h3>Search</h3>

      <MDBBtn onClick={barbellToggle}>Barbells</MDBBtn>
      <MDBBtn onClick={dumbbellToggle}>Dumbbells</MDBBtn>
      <MDBBtn onClick={machineToggle}>Machines</MDBBtn>

      <ReactSelect
        placeholder="Search By Exercise Name"
        options={options}
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
