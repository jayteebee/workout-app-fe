import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRoutines } from "../../API/Routine/Routine";
import FetchWorkoutByID from "../Workout/FetchWorkoutByID";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import DeleteRoutine from "./DeleteRoutine";
import EditRoutine from "./EditRoutine";
import FetchWorkoutsInRoutine from "./FetchWorkoutsInRoutine";
import deleteIcon from "../../CSS/Icons/deleteIcon.png";
import editIcon from "../../CSS/Icons/editIcon.png";
import { parseJwt } from "../../API/Authentication/parseJwt";

const FetchAllRoutines = ({ routineToggle }) => {
  const [allRoutines, setAllRoutines] = useState([]);
  const [selectedRoutineID, setSelectedRoutineID] = useState(null);
  const [routineToEdit, setRoutineToEdit] = useState(null);
  const [editToggle, setEditToggle] = useState(false);
  const [routineToDelete, setRoutineToDelete] = useState(null);
  const [deleteToggle, setDeleteToggle] = useState(null);
  const [userID, setUserID] = useState(null)
  console.log("userID From UseEffect", userID)
  const [filteredRoutines, setFilteredRoutines] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const userID = decodedToken.sub;
    setUserID(userID)
  }, []);

  useEffect(() => {
    getAllRoutines()
      .then((data) => {
        setAllRoutines(data);
      })
      .catch((err) => {
        console.log("getAllRoutines API Call Failed", err);
      });
  }, [routineToggle, editToggle, deleteToggle]);

  const displayWorkouts = (routineID) => {
    setSelectedRoutineID(routineID);
    navigate("/Workout", { state: { selectedRoutineID: routineID } });
  };

  const editRoutineToggle = (routineID) => {
    routineToEdit === null
      ? setRoutineToEdit(routineID)
      : setRoutineToEdit(null);
  };

console.log("all routines", allRoutines)

const routineFilter = () => {
// console.log("USER ID IN FUNCTION", userID)
// const routinesFilteredForID = allRoutines.filter((r) => r.user_id == userID)
// console.log("routinesFilteredForID", routinesFilteredForID)
// setFilteredRoutines(routinesFilteredForID)
}

useEffect(() => {
  console.log("USER ID IN FUNCTION", userID)
  const routinesFilteredForID = allRoutines.filter((r) => r.user_id == userID)
  console.log("routinesFilteredForID", routinesFilteredForID)
  setFilteredRoutines(routinesFilteredForID)
},[allRoutines])


console.log("filteredRoutines: ", filteredRoutines)
  return (
    <div>
    <button onClick={routineFilter}> test </button>

      {filteredRoutines ? filteredRoutines.map((routine) => (
        <div key={routine.id}>
          <MDBBtn onClick={() => displayWorkouts(routine.id)}>
            {routine.name}
          </MDBBtn>

          <a onClick={() => editRoutineToggle(routine.id)} href="#E">
            <img src={editIcon} alt="edit" className="editIcon" />
          </a>

          <a onClick={() => setRoutineToDelete(routine.id)} href="#D">
            <img src={deleteIcon} alt="delete" className="deleteIcon" />
          </a>
        </div>
      )) : null}
      {selectedRoutineID && <FetchWorkoutsInRoutine rID={selectedRoutineID} />}
      {routineToEdit && (
        <EditRoutine
          eID={routineToEdit}
          editToggle={editToggle}
          setEditToggle={setEditToggle}
          setRoutineToEdit={setRoutineToEdit}
        />
      )}
      {routineToDelete && (
        <DeleteRoutine
          routineToDelete={routineToDelete}
          setRoutineToDelete={setRoutineToDelete}
          setDeleteToggle={setDeleteToggle}
        />
      )}
    </div>
  );
};

export default FetchAllRoutines;
