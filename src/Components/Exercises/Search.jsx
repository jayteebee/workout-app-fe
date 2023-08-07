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
  const [searchByExerciseName, setSearchByExerciseName] = useState(false);
  const [searchByMuscleGroup, setSearchByMuscleGroup] = useState(false);



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
    value: exercise.primary_muscles
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

let exerciseNameOptions = []
if (barbells && dumbbells && machines) {
  exerciseNameOptions = exerciseName
   }
else if (barbells && dumbbells) {
  exerciseNameOptions = [...barbellFilterMapped, ...dumbbellFilterMapped]
 } else if (barbells && machines) {
  exerciseNameOptions = [...barbellFilterMapped, ...machineFilterMapped]
 } else if (dumbbells && machines) {
  exerciseNameOptions = [...dumbbellFilterMapped, ...machineFilterMapped]
 } else if (barbells) {
  exerciseNameOptions = barbellFilterMapped
} else if (dumbbells) {
  exerciseNameOptions = dumbbellFilterMapped
} else if (machines) {
  exerciseNameOptions = machineFilterMapped
} else {
  exerciseNameOptions = exerciseName
}
console.log("exerciseNameOptions", exerciseNameOptions)


const searchViaMuscle = () => {
  setSearchByMuscleGroup((prevState) => !prevState)
  setSearchByExerciseName(false)
}
console.log("exerciseName", searchByExerciseName)
console.log("muscleGroup", searchByMuscleGroup)


  return (
    <div>
      <h3>Search</h3>

      <MDBBtn onClick={barbellToggle} color={ barbells ? "success" : ""}>Barbells</MDBBtn>
      <MDBBtn onClick={dumbbellToggle} color={ dumbbells ? "success" : ""}>Dumbbells</MDBBtn>
      <MDBBtn onClick={machineToggle} color={ machines ? "success" : ""}>Machines</MDBBtn>

      <MDBBtn onClick={searchViaMuscle} color={ searchByMuscleGroup ? "success" : ""}>Muscle Group</MDBBtn>

      {searchByMuscleGroup ? <ReactSelect
        placeholder="Search By Muscle Group"
        options={muscleGroup}
        value={searchedMuscleGroup}
        onChange={handleChangeForMuscleGroup}
      /> : <ReactSelect
      placeholder="Search By Exercise Name"
      options={exerciseNameOptions}
      value={searchedExerciseName}
      onChange={handleChangeForExerciseName}
    />}
      
      

      
    </div>
  );
};

export default Search;



// <MDBBtn onClick={searchViaName} color={ searchByExerciseName ? "success" : ""}>Exercise Name</MDBBtn>
