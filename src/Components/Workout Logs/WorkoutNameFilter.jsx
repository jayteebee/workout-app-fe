import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import React, { useState } from "react";

const WorkoutNameFilter = ({ sortedSessionLogs, allWorkouts }) => {
  console.log("sortedSessionLogs", sortedSessionLogs);
  console.log("allWorkouts", allWorkouts);

const [filteredWorkoutNameChosen, setFilteredWorkoutNameChosen] = useState("")

  const namesOfWorkouts = allWorkouts.map((workout) => {
    return workout.name;
  });
  const workoutNameArrayWithNoDuplicates = [...new Set(namesOfWorkouts)];

  return (
    <div>
      <MDBDropdown>
        <MDBDropdownToggle>Workout Name</MDBDropdownToggle>
        <MDBDropdownMenu>
          {workoutNameArrayWithNoDuplicates.map((name, index) => (
            <MDBDropdownItem key={index} link>
              {name}
            </MDBDropdownItem>
          ))}
        </MDBDropdownMenu>
      </MDBDropdown>
    </div>
  );
};

export default WorkoutNameFilter;
