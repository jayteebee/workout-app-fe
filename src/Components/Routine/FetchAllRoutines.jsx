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

const FetchAllRoutines = ({ routineToggle, setRoutineFrequency, createNewRoutine, allRoutines, setAllRoutines}) => {
  // const [allRoutines, setAllRoutines] = useState([]);
  const [selectedRoutineID, setSelectedRoutineID] = useState(null);
  const [routineToEdit, setRoutineToEdit] = useState(null);
  const [editToggle, setEditToggle] = useState(false);
  const [routineToDelete, setRoutineToDelete] = useState(null);
  const [deleteToggle, setDeleteToggle] = useState(null);
  const [userID, setUserID] = useState(null);
  const [filteredRoutines, setFilteredRoutines] = useState(null);
  // console.log("filteredRoutines", filteredRoutines)
  const [editingFrequencyRoutine, setEditingFrequencyRoutine] = useState(false)

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

  const displayWorkouts = (routineID, routineFreq) => {
    setSelectedRoutineID(routineID);
    if (routineFreq) {
    navigate("/Workout", { state: { selectedRoutineID: routineID, routineFrequencyExists: routineFreq } });
    } else {
      navigate("/Workout", { state: { selectedRoutineID: routineID } });
    }
  };

  const editRoutineToggle = (routineID, routineFreq) => {
    routineToEdit === null
      ? setRoutineToEdit(routineID)
      : setRoutineToEdit(null);
      routineFreq ? setEditingFrequencyRoutine(true) :
      setEditingFrequencyRoutine(false)
  };

  useEffect(() => {
    // console.log("USER ID IN FUNCTION", userID);
    const routinesFilteredForID = allRoutines.filter(
      (r) => r.user_id == userID
    );
    // console.log("routinesFilteredForID", routinesFilteredForID);
    setFilteredRoutines(routinesFilteredForID);
  }, [allRoutines]);

useEffect(() => {
  if (createNewRoutine) {
    setRoutineToEdit(null)
  }
}, [createNewRoutine])

  return (
    <div>
      {filteredRoutines
        && filteredRoutines.map((routine) => (
            <div key={routine.id}>
            {localStorage.setItem("routineID", routine.id)} 
              <MDBBtn onClick={() => displayWorkouts(routine.id, routine.frequency)}>
                <strong>{routine.name}</strong>: View / Create Workouts
              </MDBBtn>

              <button className="utilityButton" onClick={() => editRoutineToggle(routine.id, routine.frequency)} >
                <img src={editIcon} alt="edit" className="editIcon" />
              </button>

              <button className="utilityButton" onClick={() => setRoutineToDelete(routine.id)}>
                <img src={deleteIcon} alt="delete" className="deleteIcon" />
              </button>
            </div>
          ))
       }
      {selectedRoutineID && <FetchWorkoutsInRoutine rID={selectedRoutineID} />}
      
      <div className="editRoutine">
      {routineToEdit && (
        <EditRoutine
          eID={routineToEdit}
          editToggle={editToggle}
          setEditToggle={setEditToggle}
          setRoutineToEdit={setRoutineToEdit}
          editingFrequencyRoutine={editingFrequencyRoutine}
        />
      )}
      </div>

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
