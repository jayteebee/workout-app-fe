import React from "react";
import "../CSS/Routines.css";
import FetchAllRoutines from "../Components/Routine/FetchAllRoutines";
import FetchRoutineByID from "../Components/Routine/FetchRoutineByID";
import FetchWorkoutsInRoutine from "../Components/Routine/FetchWorkoutsInRoutine";

const Routines = () => {
  return (
    <div>
      <h3>Routines</h3>
      <div className="fetchAllRoutines">
        <FetchAllRoutines />
      </div>
      <div className="fetchRoutineByID">
        <FetchRoutineByID />
      </div>
      <div>
        <FetchWorkoutsInRoutine />
      </div>
    </div>
  );
};

export default Routines;
