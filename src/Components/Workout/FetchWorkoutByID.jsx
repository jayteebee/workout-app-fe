import React, { useEffect, useState } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useLocation, useNavigate } from "react-router-dom";
import { getWorkoutsInRoutine } from "../../API/Routine/Routine";
import EditWorkout from "./EditWorkout";
import DeleteWorkout from "./DeleteWorkout";
import ViewExercises from "../../Pages/ViewExercises";
import deleteIcon from "../../CSS/Icons/deleteIcon.png";
import editIcon from "../../CSS/Icons/editIcon.png";

const FetchWorkoutByID = ({ setRoutineID, workoutCreated }) => {
  const [workout, setWorkout] = useState([]);
  const [workoutToEdit, setWorkoutToEdit] = useState(null);
  const [editToggle, setEditToggle] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);
  const [deleteToggle, setDeleteToggle] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState({
    selectedWorkout: 0,
    selectedWorkoutName: "",
  });
  const [viewExercisesInWorkout, setViewExercisesInWorkout] = useState(null);

  const location = useLocation();
  const selectedRoutineID = location.state?.selectedRoutineID;
  const navigate = useNavigate();

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
    console.log("WID:", workoutID);
    setViewExercisesInWorkout(workoutID);
    navigate("/ViewExercises", { state: { workoutId: workoutID } });
  };

  const editWorkoutToggle = (workoutID) => {
    workoutToEdit === null
      ? setWorkoutToEdit(workoutID)
      : setWorkoutToEdit(null);
  };

  return (
    <div>
      <h3>{workout.length > 0 && workout[0].routine.name}</h3>
      {workout.length > 0 &&
        workout.map((workout) => (
          <div key={workout.id}>
            <MDBBtn color="info" onClick={() => navToExercisePage(workout.id)}>
              {workout.workout.name}{" "}
            </MDBBtn>

            <a href onClick={() => editWorkoutToggle(workout.id)}>
              <img src={editIcon} alt="edit" className="editIcon" />
            </a>

            <a href onClick={() => setWorkoutToDelete(workout.id)}>
              <img src={deleteIcon} alt="delete" className="deleteIcon" />
            </a>
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
