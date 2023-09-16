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

const FetchAllRoutines = ({ routineToggle, setRoutineFrequency }) => {
  const [allRoutines, setAllRoutines] = useState([]);
  const [selectedRoutineID, setSelectedRoutineID] = useState(null);
  const [routineToEdit, setRoutineToEdit] = useState(null);
  const [editToggle, setEditToggle] = useState(false);
  const [routineToDelete, setRoutineToDelete] = useState(null);
  const [deleteToggle, setDeleteToggle] = useState(null);
  const [userID, setUserID] = useState(null);
  const [filteredRoutines, setFilteredRoutines] = useState(null);
  // console.log("filteredRoutines", filteredRoutines)

useEffect(() => {
  const routineFrequency = filteredRoutines && filteredRoutines.map((f) => (f.frequency))
  routineFrequency && setRoutineFrequency(routineFrequency[0])
}, [filteredRoutines])


  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const userID = decodedToken.sub;
    setUserID(userID);
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

useEffect(() => {
  getAllRoutines()
  .then((data) => {
    setAllRoutines(data);
  })
  .catch((err) => {
    console.log("getAllRoutines API Call Failed", err);
  });
}, [deleteToggle])

  const displayWorkouts = (routineID) => {
    setSelectedRoutineID(routineID);
    navigate("/Workout", { state: { selectedRoutineID: routineID } });
  };

  const editRoutineToggle = (routineID) => {
    routineToEdit === null
      ? setRoutineToEdit(routineID)
      : setRoutineToEdit(null);
  };

  useEffect(() => {
    // console.log("USER ID IN FUNCTION", userID);
    const routinesFilteredForID = allRoutines.filter(
      (r) => r.user_id == userID
    );
    // console.log("routinesFilteredForID", routinesFilteredForID);
    setFilteredRoutines(routinesFilteredForID);
  }, [allRoutines]);

  return (
    <div>
      {filteredRoutines
        ? filteredRoutines.map((routine) => (
            <div key={routine.id}>
              <MDBBtn onClick={() => displayWorkouts(routine.id)}>
                View <strong>{routine.name}</strong> Workouts
              </MDBBtn>

              <button className="utilityButton" onClick={() => editRoutineToggle(routine.id)} >
                <img src={editIcon} alt="edit" className="editIcon" />
              </button>

              <button className="utilityButton" onClick={() => setRoutineToDelete(routine.id)}>
                <img src={deleteIcon} alt="delete" className="deleteIcon" />
              </button>
            </div>
          ))
        : null}
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
