import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";

const WorkoutNameFilter = ({ sortedSessionLogs, allWorkouts, setSessionLogsByChosenName, setSessionLogsByChosenExercise, setSessionLogsByChosenDate, setActiveFilter }) => {
//   console.log("sortedSessionLogs", sortedSessionLogs);
//   console.log("allWorkouts", allWorkouts);

  const [filteredWorkoutNameChosen, setFilteredWorkoutNameChosen] =
    useState("");
//   console.log("filteredWorkoutNameChosen", filteredWorkoutNameChosen);

// Create an array of all workout names with no duplicates
  const namesOfWorkouts = allWorkouts.map((workout) => {
    return workout.name;
  });
  const workoutNameArrayWithNoDuplicates = [...new Set(namesOfWorkouts)];


// filter the existing session logs by the workout name chosen by the user
  useEffect(() => {
    if (filteredWorkoutNameChosen) {
      const sessionLogsByChosenNameFilter = sortedSessionLogs.filter(
        (log) => log.workout_name === filteredWorkoutNameChosen
      );
      setSessionLogsByChosenDate(null)
      setSessionLogsByChosenExercise(null)
      setSessionLogsByChosenName(sessionLogsByChosenNameFilter);
      setFilteredWorkoutNameChosen("")
    }
  }, [filteredWorkoutNameChosen]);



  return (
    <div>
      <MDBDropdown>
        <MDBDropdownToggle>{filteredWorkoutNameChosen ? `${filteredWorkoutNameChosen} Workouts` : "Workout Name"}</MDBDropdownToggle>
        <MDBDropdownMenu>
        <MDBDropdownItem
        link
        onClick={() => 
          {
              setFilteredWorkoutNameChosen("")}
          }
        >-- Clear --</MDBDropdownItem>
          {workoutNameArrayWithNoDuplicates.map((name, index) => (
            <MDBDropdownItem
              key={index}
              link
              onClick={() => setFilteredWorkoutNameChosen(name)}
            >
              {name}
            </MDBDropdownItem>
          ))}
        </MDBDropdownMenu>
      </MDBDropdown>

    </div>
  );
};

export default WorkoutNameFilter;
