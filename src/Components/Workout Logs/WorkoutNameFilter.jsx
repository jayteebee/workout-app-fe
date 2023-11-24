import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";

const WorkoutNameFilter = ({ sortedSessionLogs, allWorkouts, setSessionLogsByChosenName }) => {
//   console.log("sortedSessionLogs", sortedSessionLogs);
//   console.log("allWorkouts", allWorkouts);

  const [filteredWorkoutNameChosen, setFilteredWorkoutNameChosen] =
    useState("");
//   console.log("filteredWorkoutNameChosen", filteredWorkoutNameChosen);


  const namesOfWorkouts = allWorkouts.map((workout) => {
    return workout.name;
  });
  const workoutNameArrayWithNoDuplicates = [...new Set(namesOfWorkouts)];

  useEffect(() => {
    if (filteredWorkoutNameChosen) {
      const sessionLogsByChosenNameFilter = sortedSessionLogs.filter(
        (log) => log.workout_name === filteredWorkoutNameChosen
      );
      setSessionLogsByChosenName(sessionLogsByChosenNameFilter);
    }
  }, [filteredWorkoutNameChosen]);



  return (
    <div>
      <MDBDropdown>
        <MDBDropdownToggle>Workout Name</MDBDropdownToggle>
        <MDBDropdownMenu>
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
