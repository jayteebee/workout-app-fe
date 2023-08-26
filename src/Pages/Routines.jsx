import React, {useState} from "react";
import "../CSS/Routines.css";
import FetchAllRoutines from "../Components/Routine/FetchAllRoutines";
import FetchRoutineByID from "../Components/Routine/FetchRoutineByID";
import FetchWorkoutsInRoutine from "../Components/Routine/FetchWorkoutsInRoutine";
import CreateRoutine from "../Components/Routine/CreateRoutine";
import { MDBBtn } from "mdb-react-ui-kit";

const Routines = () => {
  const [routineToggle, setRoutineToggle] = useState(false)
  const [createRoutineToggle , setCreateRoutineToggle] = useState(false)

  const toggleCreateRoutine = () => {
    setCreateRoutineToggle(prevState => !prevState)
  }

  return (
    <div >
      <h3 className="pageHeader">Routines</h3>
      <div className="fetchAllRoutines">
        <FetchAllRoutines routineToggle={routineToggle}/>
      </div>

      {
        /*<div className="fetchRoutineByID">
        <FetchRoutineByID />
        </div>*/
      }
    <div className="fetchWorkoutsInRoutine">
        <FetchWorkoutsInRoutine />
      </div>
      <MDBBtn onClick={toggleCreateRoutine}>Create Routine</MDBBtn>

      {createRoutineToggle && <div className="createRoutine">
        <CreateRoutine routineToggle={routineToggle} setRoutineToggle={setRoutineToggle} />
      </div>}
      

    </div>
  );
};

export default Routines;
