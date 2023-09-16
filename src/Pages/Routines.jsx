import React, {useState} from "react";
import "../CSS/Routines.css";
import FetchAllRoutines from "../Components/Routine/FetchAllRoutines";
import FetchRoutineByID from "../Components/Routine/FetchRoutineByID";
import FetchWorkoutsInRoutine from "../Components/Routine/FetchWorkoutsInRoutine";
import CreateRoutine from "../Components/Routine/CreateRoutine";
import { MDBBtn } from "mdb-react-ui-kit";

const Routines = ({custom, setCustom, weekly, setWeekly, setRoutineFrequency}) => {
  const [routineToggle, setRoutineToggle] = useState(false)
  const [createRoutineToggle , setCreateRoutineToggle] = useState(false)

  const toggleCreateRoutine = () => {
    setCreateRoutineToggle(prevState => !prevState)
  }
// console.log("createRoutineToggle", createRoutineToggle)
console.log("custom, weekly", custom, weekly)
  return (
    <div >
      <h3 className="pageHeader">Routines</h3>
      <p>Will you be working out in a custom or weekly frequency?</p>

      <div>
      <MDBBtn onClick={() => {setWeekly(false); setCustom(true)}}>Custom</MDBBtn>
      <MDBBtn  onClick={() => {setCustom(false); setWeekly(true)}}>Weekly</MDBBtn>
      </div>

      <div className="fetchAllRoutines">
        <FetchAllRoutines routineToggle={routineToggle} setRoutineFrequency={setRoutineFrequency}/>
      </div>

      {
        /*<div className="fetchRoutineByID">
        <FetchRoutineByID />
        </div>*/
      }
    <div className="fetchWorkoutsInRoutine">
        <FetchWorkoutsInRoutine />
      </div>

      <div className={custom || weekly ? "" : "hidden"}>
      <MDBBtn onClick={toggleCreateRoutine}>{createRoutineToggle ? "Hide Create Routine" : "Create Routine"}</MDBBtn>
      </div>
      
      {createRoutineToggle && <div className="createRoutine">
        <CreateRoutine custom={custom} weekly={weekly} routineToggle={routineToggle} setRoutineToggle={setRoutineToggle} setCreateRoutineToggle={setCreateRoutineToggle} />
      </div>}
     

    </div>
  );
};

export default Routines;
