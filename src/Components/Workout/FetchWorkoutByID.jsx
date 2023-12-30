import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getWorkoutsInRoutine } from "../../API/Routine/Routine";
import EditWorkout from "./EditWorkout";
import DeleteWorkout from "./DeleteWorkout";
import ViewExercises from "../../Pages/ViewExercises";
import deleteIcon from "../../CSS/Icons/deleteIcon.png";
import editIcon from "../../CSS/Icons/editIcon.png";
import { MDBBtn } from "mdb-react-ui-kit";
import { parseJwt } from "../../API/Authentication/parseJwt";
import { RoutineAndWorkoutDataContext } from "../../Context/RoutineAndWorkoutDataContext";
import { IntroJsContext } from "../../Context/IntroJsContext";

const FetchWorkoutByID = ({ setRoutineID, workoutCreated, workout, setWorkout }) => {

  const [workoutToEdit, setWorkoutToEdit] = useState(null);
  const [editToggle, setEditToggle] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);
  const [deleteToggle, setDeleteToggle] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState({
    selectedWorkout: 0,
    selectedWorkoutName: "",
  });
  const [viewExercisesInWorkout, setViewExercisesInWorkout] = useState(null);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const userID = decodedToken.sub;
    setUserID(userID);
  }, []);

  const navigate = useNavigate();
  const {managingRoutineAndWorkoutData} = useContext(RoutineAndWorkoutDataContext)
  const {  steps, stepsEnabled, initialStep, onExit, setInitialStep, setStepsEnabled} = useContext(IntroJsContext)


  const selectedRoutineID = managingRoutineAndWorkoutData.selectedRoutineID


  useEffect(() => {
    setRoutineID(selectedRoutineID);
    getWorkoutsInRoutine(selectedRoutineID)
      .then((data) => {
        setWorkout(data);
      })
      .catch((err) => {
        console.log("getWorkoutsInRoutine API Call Failed", err);
      });
  }, [selectedRoutineID, workoutCreated, editToggle, deleteToggle]);

  const displayExercises = (workoutID, workoutName) => {
    setSelectedWorkout({
      selectedWorkout: workoutID,
      selectedWorkoutName: workoutName,
    });
    navigate("/CreateExercise", {
      state: { selectedWorkout: workoutID, selectedWorkoutName: workoutName },
    });
  };

  const navToExercisePage = (workoutID) => {
    setViewExercisesInWorkout(workoutID);
    navigate("/ViewExercises", { state: { workoutId: workoutID } });
    setTimeout(() => {
      setInitialStep(10)
      setStepsEnabled(true)
    }, 1000)
  };

  const editWorkoutToggle = (workoutID) => {
    workoutToEdit === null
      ? setWorkoutToEdit(workoutID)
      : setWorkoutToEdit(null);
  };

  return (
    <div >
      <h3 > {workout.length > 0 && "Routine:" + workout[0].routine.name}</h3>
      {workout.length > 0 &&
        workout.map((workout) => (
          <div key={workout.id} id="viewAndCreateExercisesForTutorial">
            <MDBBtn color="info" onClick={() => navToExercisePage(workout.id)}>
              View <strong>{workout.workout.name}</strong>'s Exercises
            </MDBBtn>

            <button
              className="utilityButton"
              onClick={() => editWorkoutToggle(workout.id)}
            >
              <img src={editIcon} alt="edit" className="editIcon" />
            </button>

            <button
              className="utilityButton"
              onClick={() => setWorkoutToDelete(workout.id)}
            >
              <img src={deleteIcon} alt="delete" className="deleteIcon" />
            </button>
            <MDBBtn
              onClick={() => displayExercises(workout.id, workout.workout.name)}
            >
              Add Exercises
            </MDBBtn>
          </div>
        ))}
      {workoutToEdit && (
        <EditWorkout
          workoutToEdit={workoutToEdit}
          editToggle={editToggle}
          setEditToggle={setEditToggle}
          setWorkoutToEdit={setWorkoutToEdit}
        />
      )}
      {workoutToDelete && (
        <DeleteWorkout
          workoutToDelete={workoutToDelete}
          setWorkoutToDelete={setWorkoutToDelete}
          setDeleteToggle={setDeleteToggle}
        />
      )}
    </div>
  );
};

export default FetchWorkoutByID;
