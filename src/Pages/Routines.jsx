import React, { useEffect, useState } from "react";
import "../CSS/Routines.css";
import FetchAllRoutines from "../Components/Routine/FetchAllRoutines";
import FetchRoutineByID from "../Components/Routine/FetchRoutineByID";
import FetchWorkoutsInRoutine from "../Components/Routine/FetchWorkoutsInRoutine";
import CreateRoutine from "../Components/Routine/CreateRoutine";
import { MDBBtn } from "mdb-react-ui-kit";

const Routines = ({
  custom,
  setCustom,
  weekly,
  setWeekly,
  setRoutineFrequency,
  setActiveRoutine,
  activeRoutine,
  setRoutineChange
}) => {
  const [routineToggle, setRoutineToggle] = useState(false);
  const [createRoutineToggle, setCreateRoutineToggle] = useState(false);
  const [viewExistingRoutines, setViewExistingRoutines] = useState(false);
  const [createNewRoutine, setCreateNewRoutine] = useState(false);
  const [allRoutines, setAllRoutines] = useState([]);


  const toggleCreateRoutine = () => {
    setCreateRoutineToggle((prevState) => !prevState);
  };
  // console.log("createRoutineToggle", createRoutineToggle)
  // console.log("custom, weekly", custom, weekly)

  useEffect(() => {
    setCustom(false);
    setWeekly(false);
  }, []);

  const handleRoutineViewOptions = (e) => {
    setCreateRoutineToggle(false)

    let name = e.target.name;
    if (name === "createNewRoutine") {
      setViewExistingRoutines(false);
      setCreateNewRoutine(true);
      setCustom(false)
      setWeekly(false)
    }
    if (name === "viewExistingRoutines") {
      setCreateNewRoutine(false);
      setViewExistingRoutines(true);
    }
  };

  useEffect(() => {
    if (allRoutines.length === 0) {
      setCreateNewRoutine(true)
    }
  }, [])

  return (
    <div className="grid-container">
      <h3 className="pageHeader routines">Routines</h3>

      <div
        className={createNewRoutine ? "createNewRoutineOptionChosen" : "hidden"}
      >
        <p className={weekly || custom ? "hidden" : "routineQuestion"}>
          Will you be working out in a custom or weekly frequency?
        </p>
        <MDBBtn
          onClick={() => {
            setWeekly(false);
            setCustom(true);
          }}
          className={weekly || custom ? "hidden" : "routineCustomButton"}
        >
          Custom
        </MDBBtn>
        <MDBBtn
          onClick={() => {
            setCustom(false);
            setWeekly(true);
          }}
          className={weekly || custom ? "hidden" : "routineWeeklyButton"}
        >
          Weekly
        </MDBBtn>
      </div>

      <div
        className="routineViewOptions"
        
      >
        <MDBBtn  color={createNewRoutine ? "info" : ""} name="createNewRoutine" onClick={handleRoutineViewOptions}>
          Create New Routine
        </MDBBtn>

        <MDBBtn color={viewExistingRoutines ? "info" : ""} name="viewExistingRoutines" onClick={handleRoutineViewOptions}>
          View Existing Routines
        </MDBBtn>
      </div>

        <div className={viewExistingRoutines && allRoutines.length === 0 ? "noRoutines" : "hidden"}>
        <p>No Routines Created...</p>
        </div>

      <div className={viewExistingRoutines ? "fetchAllRoutines" : "hidden"}>
        <div className="fetchAllRoutines">
          <FetchAllRoutines
            routineToggle={routineToggle}
            setRoutineFrequency={setRoutineFrequency}
            weekly={weekly}
            createNewRoutine={createNewRoutine}
            allRoutines={allRoutines}
            setAllRoutines={setAllRoutines}
            setActiveRoutine={setActiveRoutine}
            activeRoutine={activeRoutine}
            setRoutineChange={setRoutineChange}
          />
        </div>
      </div>
      <div>

      </div>

      {/*<div className="fetchRoutineByID">
        <FetchRoutineByID />
        </div>*/}
      <div className="fetchWorkoutsInRoutine">
        <FetchWorkoutsInRoutine />
      </div>

      <div
        className={ viewExistingRoutines ? "hidden createRoutineToggleButton" :
          custom || weekly
            ? "createRoutineToggleButton"
            : "hidden createRoutineToggleButton"
        }
      >
       {/* <MDBBtn
          onClick={toggleCreateRoutine}
        >
          {createRoutineToggle ? "Hide Create Routine" : "Create Routine"}
       </MDBBtn>*/}
      </div>

    {/*  {createRoutineToggle && ( */}
        <div className={createNewRoutine && (custom || weekly) ? "createRoutine" : "hidden"}>
          <CreateRoutine
            custom={custom}
            weekly={weekly}
            routineToggle={routineToggle}
            setRoutineToggle={setRoutineToggle}
            setCreateRoutineToggle={setCreateRoutineToggle}
          />
        </div>

    </div>
  );
};

export default Routines;
