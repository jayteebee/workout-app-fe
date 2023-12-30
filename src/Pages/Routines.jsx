import React, { useContext, useEffect, useState } from "react";
import "../CSS/Routines.css";
import FetchAllRoutines from "../Components/Routine/FetchAllRoutines";
import FetchWorkoutsInRoutine from "../Components/Routine/FetchWorkoutsInRoutine";
import CreateRoutine from "../Components/Routine/CreateRoutine";
import { MDBBtn } from "mdb-react-ui-kit";
import { Steps } from "intro.js-react";
import { IntroJsContext } from "../Context/IntroJsContext";

// acts as a parent component for all the elements required for creating a routine

const Routines = ({
  custom,
  setCustom,
  weekly,
  setWeekly,
  setRoutineFrequency,
  setActiveRoutine,
  activeRoutine,
  setRoutineChange,
}) => {
  const [routineToggle, setRoutineToggle] = useState(false);
  const [createRoutineToggle, setCreateRoutineToggle] = useState(false);
  const [viewExistingRoutines, setViewExistingRoutines] = useState(false);
  const [createNewRoutine, setCreateNewRoutine] = useState(false);
  const [allRoutines, setAllRoutines] = useState([]);
const [checkboxToggle, setCheckboxToggle] = useState(false)

const {steps, stepsEnabled, initialStep, onExit, setInitialStep, setStepsEnabled} = useContext(IntroJsContext)

  const toggleCreateRoutine = () => {
    setCreateRoutineToggle((prevState) => !prevState);
  };


  useEffect(() => {
    setCustom(false);
    setWeekly(false);
  }, []);

  const handleRoutineViewOptions = (e) => {
    setCreateRoutineToggle(false);
    console.log('yes',)

    let name = e.target.name;
    
    if (name === "createNewRoutine") {
      setViewExistingRoutines(false);
      setCreateNewRoutine(true);
      setCustom(false);
      setWeekly(false);
    }
    if (name === "viewExistingRoutines") {
      setCreateNewRoutine(false);
      setViewExistingRoutines(true);
      setStepsEnabled(true)
      setInitialStep(5)
    }
  };

  useEffect(() => {
    if (allRoutines.length === 0) {
      setCreateNewRoutine(true);
    }
  }, []);

const routineConfigFrequencyButtons = (e) => {
const name = e.target.name
if (name === "flexible") {
  setWeekly(false);
  setCustom(true);
} else {
  setCustom(false);
  setWeekly(true);
}
}

useEffect(() => {
if (weekly || custom) {
  setInitialStep(3); 
  setStepsEnabled(true);
}
}, [weekly, custom])

  return (
    <div className="grid-container">
      <h3 className="pageHeader routines">Routines</h3>

      <div
        className={createNewRoutine ? "createNewRoutineOptionChosen" : "hidden"}
      >
        <p className={weekly || custom ? "hidden" : "routineQuestion"}>
          Do you prefer a fixed weekly schedule (e.g., Monday, Wednesday,
          Friday) <br /> or a flexible routine (e.g: every 4th day) for your
          workouts?
        </p>
        <div id="routineOptions" style={{display: "flex", justifyContent: "space-around"}}>
        <MDBBtn
            name="flexible"
onClick={(e) => routineConfigFrequencyButtons(e)}
          className={weekly || custom ? "hidden" : "routineCustomButton"}
        >
          Flexible
        </MDBBtn>
        <MDBBtn
        name="weekly"
        onClick={(e) => routineConfigFrequencyButtons(e)}

          className={weekly || custom ? "hidden" : "routineWeeklyButton"}
        >
          Fixed Weekly
        </MDBBtn>
        </div>
      </div>

      <div className="routineViewOptions">
        <MDBBtn
          color={createNewRoutine ? "info" : ""}
          name="createNewRoutine"
          onClick={handleRoutineViewOptions}
        >
          Create New Routine
        </MDBBtn>

        <MDBBtn
        id="viewExistingRoutinesTutorialButton"
          color={viewExistingRoutines ? "info" : ""}
          name="viewExistingRoutines"
          onClick={handleRoutineViewOptions}
        >
          View Existing Routines
        </MDBBtn>

        {allRoutines && allRoutines.length > 0 && 
          <div style={{paddingTop: "10px"}} className={viewExistingRoutines ? "editDeleteRoutinesShowing" : "hidden"}>
           <input type="checkbox"
           onClick={() => setCheckboxToggle(!checkboxToggle)}
           />Edit/Delete Routines?
            </div>
        }

      </div>

      <div
        className={
          viewExistingRoutines && allRoutines.length === 0
            ? "noRoutines"
            : "hidden"
        }
      >
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
            checkboxToggle={checkboxToggle}
          />
        </div>
      </div>
      <div></div>

      <div className="fetchWorkoutsInRoutine">
        <FetchWorkoutsInRoutine />
      </div>

      <div
        className={
          viewExistingRoutines
            ? "hidden createRoutineToggleButton"
            : custom || weekly
            ? "createRoutineToggleButton"
            : "hidden createRoutineToggleButton"
        }
      >
      </div>

      <div
        className={
          createNewRoutine && (custom || weekly) ? "createRoutine" : "hidden"
        }
      >
        <CreateRoutine
          custom={custom}
          weekly={weekly}
          routineToggle={routineToggle}
          setRoutineToggle={setRoutineToggle}
          setCreateRoutineToggle={setCreateRoutineToggle}
        />
      </div>

      <Steps
      enabled={stepsEnabled}
      steps={steps}
      initialStep={initialStep}
      onExit={onExit}
    />
    </div>
  );
};

export default Routines;
