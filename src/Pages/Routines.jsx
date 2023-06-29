import React, {useState} from "react";
import "../CSS/Routines.css";
import FetchAllRoutines from "../Components/Routine/FetchAllRoutines";
import FetchRoutineByID from "../Components/Routine/FetchRoutineByID";
import FetchWorkoutsInRoutine from "../Components/Routine/FetchWorkoutsInRoutine";
import CreateRoutine from "../Components/Routine/CreateRoutine";

const Routines = () => {
  const [toggle, setToggle] = useState(false)


  return (
    <div>
      <h3>Routines</h3>
      <div className="fetchAllRoutines">
        <FetchAllRoutines toggle={toggle}/>
      </div>
      <div className="fetchRoutineByID">
        <FetchRoutineByID />
      </div>
      <div className="fetchWorkoutsInRoutine">
        <FetchWorkoutsInRoutine />
      </div>
      <div className="createRoutine">
        <CreateRoutine setToggle={setToggle} />
      </div>
    </div>
  );
};

export default Routines;
