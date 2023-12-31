import React, { useState, useEffect } from "react";
import { getAllExercises } from "../../API/Exercise/Exercise";
import ReactSelect from "react-select";
import { MDBBtn } from "mdb-react-ui-kit";

const Search = ({
  setSearchedExerciseName,
  searchedExerciseName,
  searchedMuscleGroup,
  setSearchedMuscleGroup,
  setExerciseID,
}) => {
  const [allExercises, setAllExercises] = useState([]);
  const [barbells, setBarbells] = useState(false);
  const [dumbbells, setDumbbells] = useState(false);
  const [machines, setMachines] = useState(false);
  const [searchByMuscleGroup, setSearchByMuscleGroup] = useState(false);

  const barbellToggle = () => {
    setBarbells((prevState) => !prevState);
  };

  const dumbbellToggle = () => {
    setDumbbells((prevState) => !prevState);
  };

  const machineToggle = () => {
    setMachines((prevState) => !prevState);
  };

  useEffect(() => {
    getAllExercises()
      .then((data) => {
        setAllExercises(data);
      })
      .catch((err) => {
        console.log("getAllExercises API Call Failed: ", err);
      });
  }, []);

  const exerciseName = allExercises.map((exercise) => ({
    label: exercise.name,
    value: exercise.name,
  }));

  const handleChangeForExerciseName = (searchedExerciseName) => {
    const idFinder = allExercises.filter(
      (exercise) => exercise.name === searchedExerciseName.value
    );
    let exerciseID = idFinder[0];
    setSearchedExerciseName(searchedExerciseName);
    setSearchedMuscleGroup(null);
    setExerciseID(exerciseID.id);
  };

  const handleChangeForMuscleGroup = (searchedMuscleGroup) => {
    const idFinder = allExercises.filter(
      (exercise) => exercise.name === searchedMuscleGroup.label
    );
    let exerciseID = idFinder[0];
    setSearchedMuscleGroup(searchedMuscleGroup);
    setSearchedExerciseName(null);
    setExerciseID(exerciseID.id);
  };

  const getEquipmentOptions = (equipmentType, searchByMuscleGroup) => {
    let filteredExercises = allExercises;

    if (equipmentType !== "All") {
      filteredExercises = allExercises.filter(
        (exercise) => exercise.equipment_used === equipmentType
      );
    }

    return filteredExercises.map((exercise) => ({
      label: exercise.name,
      value: searchByMuscleGroup ? exercise.primary_muscles : exercise.name,
    }));
  };

  const [exerciseOptions, setExerciseOptions] = useState([]);

  useEffect(() => {
    const calculateExerciseOptions = () => {
      let newExerciseOptions = [];
      if (!barbells && !dumbbells && !machines) {
        newExerciseOptions = getEquipmentOptions("All", searchByMuscleGroup);
      } else if (barbells && dumbbells && machines) {
        newExerciseOptions = exerciseName;
      } else if (barbells && dumbbells) {
        newExerciseOptions = [
          ...getEquipmentOptions("Barbell", searchByMuscleGroup),
          ...getEquipmentOptions("Dumbbells", searchByMuscleGroup),
        ];
      } else if (barbells && machines) {
        newExerciseOptions = [
          ...getEquipmentOptions("Barbell", searchByMuscleGroup),
          ...getEquipmentOptions("Machine", searchByMuscleGroup),
        ];
      } else if (dumbbells && machines) {
        newExerciseOptions = [
          ...getEquipmentOptions("Dumbbells", searchByMuscleGroup),
          ...getEquipmentOptions("Machine", searchByMuscleGroup),
        ];
      } else if (barbells) {
        newExerciseOptions = getEquipmentOptions(
          "Barbell",
          searchByMuscleGroup
        );
      } else if (dumbbells) {
        newExerciseOptions = getEquipmentOptions(
          "Dumbbells",
          searchByMuscleGroup
        );
      } else if (machines) {
        newExerciseOptions = getEquipmentOptions(
          "Machine",
          searchByMuscleGroup
        );
      } else {
        newExerciseOptions = exerciseName;
      }

      setExerciseOptions(newExerciseOptions);
    };

    calculateExerciseOptions();
  }, [allExercises, barbells, dumbbells, machines, searchByMuscleGroup]);

  const searchViaMuscle = () => {
    setSearchByMuscleGroup((prevState) => !prevState);
  };

  return (
    <div className="" >
    <div className="exerciseFilters">
      <MDBBtn onClick={barbellToggle} color={barbells ? "success" : ""}>
        Barbells
      </MDBBtn>
      <MDBBtn onClick={dumbbellToggle} color={dumbbells ? "success" : ""}>
        Dumbbells
      </MDBBtn>
      <MDBBtn onClick={machineToggle} color={machines ? "success" : ""}>
        Machines
      </MDBBtn>

      <MDBBtn
        onClick={searchViaMuscle}
        color={searchByMuscleGroup ? "success" : ""}
      >
        Muscle Group
      </MDBBtn>
</div>
<div className="searchBar">
      {searchByMuscleGroup ? (
        <ReactSelect
          placeholder="Search By Muscle Group"
          options={exerciseOptions}
          value={searchedMuscleGroup}
          onChange={handleChangeForMuscleGroup}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              width: "40vw",
              '@media (max-width: 600px)': { 
                width: "90vw",
              }
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "rgba(11, 12, 16, 0.3)",
              width: "40vw",
              '@media (max-width: 600px)': { 
                width: "90vw",
              }
            }),
            option: (baseStyles, { isFocused }) => ({
              ...baseStyles,
              backgroundColor: isFocused ? "#1F2833" : "rgba(11, 12, 16, 0.6)",
              color: "#66fcf1",
            }),
          }}
        />
      ) : (
        <ReactSelect
          placeholder="Search By Exercise Name"
          options={exerciseOptions}
          value={searchedExerciseName}
          onChange={handleChangeForExerciseName}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              width: "40vw",
              justifyContent: "center",
              '@media (max-width: 600px)': { 
                width: "90vw",
              }
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "rgba(11, 12, 16, 0.3)",
              width: "40vw",
              '@media (max-width: 600px)': { 
                width: "90vw",
              }
            }),
            option: (baseStyles, { isFocused }) => ({
              ...baseStyles,
              backgroundColor: isFocused ? "#1F2833" : "rgba(11, 12, 16, 0.6)",
              color: "#66fcf1",
            }),
          }}
        />
      )}
      </div>
    </div>
  );
};

export default Search;
