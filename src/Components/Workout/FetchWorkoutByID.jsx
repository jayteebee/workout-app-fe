import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getWorkoutsInRoutine } from "../../API/Routine/Routine";
import EditWorkout from "./EditWorkout";
import DeleteWorkout from "./DeleteWorkout";
import ViewExercises from "../../Pages/ViewExercises";
import deleteIcon from "../../CSS/Icons/deleteIcon.png";
import editIcon from "../../CSS/Icons/editIcon.png";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { createWorkoutDay } from "../../API/WorkoutDays/WorkoutDays";
import { parseJwt } from "../../API/Authentication/parseJwt";

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
  const [userID, setUserID] = useState(null);
  const [workoutDays, setWorkoutDays] = useState([]);
  const [idOfRoutine, setIdOfRoutine] = useState(null);
  const [createWorkoutDayToggle, setCreateWorkoutDayToggle] = useState(false);
  const [daysOfWeek, setDaysOfWeek] = useState([
    { Monday: false, value: 0 },
    { Tuesday: false, value: 1 },
    { Wednesday: false, value: 2 },
    { Thursday: false, value: 3 },
    { Friday: false, value: 4 },
    { Saturday: false, value: 5 },
    { Sunday: false, value: 6 },
  ]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const userID = decodedToken.sub;
    setUserID(userID);
  }, []);

  const location = useLocation();
  const selectedRoutineID = location.state?.selectedRoutineID;
  const navigate = useNavigate();

  useEffect(() => {
    setIdOfRoutine(selectedRoutineID);
  }, []);
  console.log(" selected routineID: ", selectedRoutineID);
  console.log(" routineID state: ", idOfRoutine);

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

  const toggleDaysOfWeekBoolean = (clickedIndex) => {
    const updatedDaysOfWeek = daysOfWeek.map((day) => {
      if (day.value === clickedIndex) {
        return {
          ...day,
          [daysOfWeekArray[clickedIndex]]: !day[daysOfWeekArray[clickedIndex]], // toggles the boolean
        };
      }
      console.log("day:", day);
      return day;
    });

    setDaysOfWeek(updatedDaysOfWeek);
  };
  console.log("DAYS OF WEEK", daysOfWeek);


  const daysOfWeekArray = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [createWorkoutDayData, setCreateWorkoutDayData] = useState({
    user_id: userID,
    days_of_week: workoutDays,
    routine_id: 0,
  });

  const apiCall = () => {
    const newWorkoutDays = daysOfWeek
      .filter((day) => day[daysOfWeekArray[day.value]])
      .map((day) => day.value);
    console.log("newWorkoutDays: ", newWorkoutDays);
    if (newWorkoutDays.length <= workout.length) {
      setWorkoutDays(newWorkoutDays);

      setCreateWorkoutDayData((prevData) => ({
        ...prevData,
        user_id: userID,
        days_of_week: newWorkoutDays,
        routine_id: idOfRoutine,
      }));
    }

    setCreateWorkoutDayToggle((prevState) => !prevState);
  };
  console.log("workoutDays: ", workoutDays);
  console.log("createWorkoutDayData", createWorkoutDayData);


  useEffect(() => {
    createWorkoutDay(createWorkoutDayData)
      .then((response) => {
        console.log("Response: ", response);
      })
      .catch((err) => {
        console.log("createWorkoutDay API Call Failed", err);
      });
  }, [createWorkoutDayToggle]);

  return (
    <div>
      <h3>{workout.length > 0 && workout[0].routine.name}</h3>
      {workout.length > 0 &&
        workout.map((workout) => (
          <div key={workout.id}>
            <MDBBtn color="info" onClick={() => navToExercisePage(workout.id)}>
              View <strong>{workout.workout.name}</strong>'s Exercises
            </MDBBtn>
            
            <button className="utilityButton" onClick={() => editWorkoutToggle(workout.id)}>
              <img src={editIcon} alt="edit" className="editIcon" />
            </button>

            <button className="utilityButton" onClick={() => setWorkoutToDelete(workout.id)}>
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

      <MDBDropdown>
        <MDBDropdownToggle>Days</MDBDropdownToggle>
        <MDBDropdownMenu>
          {daysOfWeekArray.map((day, index) => (
            <MDBDropdownItem
              key={index}
              onClick={() => toggleDaysOfWeekBoolean(index)}
              link
            >
              {day}
            </MDBDropdownItem>
          ))}
        </MDBDropdownMenu>
      </MDBDropdown>

      {daysOfWeek.map((day, index) => (
        day[Object.keys(day)[0]] && (
          <div key={index}>
            <p>{Object.keys(day)[0]}</p>
          </div>
        )
      ))}

      <MDBBtn onClick={apiCall}>Finalise Days</MDBBtn>
    </div>
  );
};

export default FetchWorkoutByID;
