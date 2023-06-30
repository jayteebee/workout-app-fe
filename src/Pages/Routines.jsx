import React, {useState} from "react";
import "../CSS/Routines.css";
import FetchAllRoutines from "../Components/Routine/FetchAllRoutines";
import FetchRoutineByID from "../Components/Routine/FetchRoutineByID";
import FetchWorkoutsInRoutine from "../Components/Routine/FetchWorkoutsInRoutine";
import CreateRoutine from "../Components/Routine/CreateRoutine";

const Routines = () => {
  const [routineToggle, setRoutineToggle] = useState(false)


  return (
    <div className='scrollableDiv'>
      <h3>Routines</h3>
      <div className="fetchAllRoutines">
        <FetchAllRoutines routineToggle={routineToggle}/>
      </div>
      <div className="fetchRoutineByID">
        <FetchRoutineByID />
      </div>
      <div className="fetchWorkoutsInRoutine">
        <FetchWorkoutsInRoutine />
      </div>
      <div className="createRoutine">
        <CreateRoutine setRoutineToggle={setRoutineToggle} />
      </div>
    </div>
  );
};

export default Routines;
