import React, { useState, useEffect } from "react";
import "../../CSS/Workout.css";
import { parseJwt } from "../../API/Authentication/parseJwt";
import {
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { createWorkout } from "../../API/Workout/Workout";
import { addWorkoutToRoutine } from "../../API/Routine/Routine";
import { ToastContainer, toast } from "react-toastify";


const CreateWorkout = ({
  setWorkoutToggle,
  workoutToggle,
  routineID,
  setWorkoutCreated,
  dayOfWeek,
  setDayOfWeek,
  weekly,
  custom,
  logOfRoutineDaysOfWeek,
  setLogOfRoutineDaysOfWeek
}) => {
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const userID = decodedToken.sub;
    setFormInput((prevState) => ({ ...prevState, user_id: userID }));
  }, [workoutToggle]);

  const [formInput, setFormInput] = useState({
    user_id: "",
    name: "",
  });
  // console.log(formInput);

  const [createdWorkout, setCreatedWorkout] = useState([]);
  const [order, setOrder] = useState(0);
  // console.log("order", order)
  const [workoutDay, setWorkoutDay] = useState("");
  const [workoutDayIndex, setWorkoutDayIndex] = useState(false);
  // console.log("** workoutDayINDEX", workoutDayIndex);

  const daysOfWeekArray = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
const [updatedDays, setUpdatedDays] = useState([])
// console.log('updatedDays state', updatedDays)
  useEffect(() => {
    if (workoutDayIndex !== false) {
      toggleDaysOfWeekBoolean(workoutDayIndex);
    }
  }, [workoutDayIndex]);

  const toggleDaysOfWeekBoolean = (workoutIndex) => {
    // console.log("clickedIndex INSIDE:", workoutIndex);

    const updatedDaysOfWeek = dayOfWeek.map((day) => {
      if (day.value === workoutIndex) {
        return {
          ...day,
          [daysOfWeekArray[workoutIndex]]: !day[daysOfWeekArray[workoutIndex]], // toggles the boolean
        };
      }
      return day;
    });

    setDayOfWeek(updatedDaysOfWeek);
    setUpdatedDays(updatedDaysOfWeek)
  };

useEffect(() => {
  setLogOfRoutineDaysOfWeek({routineID: routineID, daysOfWeek: updatedDays})
}, [updatedDays])

  // console.log("dayOfWeek ***", dayOfWeek);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = await createWorkout(formInput);
      setCreatedWorkout(data);

      const dayNameToIndex = {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6,
      };

      const lowercaseDay = workoutDay.toLowerCase();
      if (dayNameToIndex.hasOwnProperty(lowercaseDay)) {
        setWorkoutDayIndex(dayNameToIndex[lowercaseDay]);
      }

      toast.success(
        "Workout Created!",
        {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );

    } catch (err) {
      console.error("Error:", err);
    } finally {
      setFormInput({ user_id: "", name: "" });
      setOrder((prevOrder) => (prevOrder += 1));
      // setWorkoutDay("");
      setWorkoutToggle((prevState) => !prevState);
    }
  };

  // console.log("order", order);

  useEffect(() => {
    if (createdWorkout.id) {
      // console.log("workoutDay", workoutDay);
      addWorkoutToRoutine(routineID, {
        workout_id: createdWorkout.id,
        order: order,
        day: [workoutDay],
      });
      setWorkoutCreated((prevState) => !prevState);
      setCreatedWorkout([]);
    }
  }, [createdWorkout, order, routineID]);

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
    <h2>Create Workout</h2>
      <form onSubmit={handleSubmit} className="inputForm">
        <MDBInput
          className="mb-4"
          type="text"
          label="Workout Name"
          value={formInput.name}
          name="name"
          onChange={handleChange}
          contrast
        />

        {/*<div className={weekly ? "hidden" : null}>*/}
        <div className="hidden">
          <MDBInput
            className="mb-4"
            type="text"
            label="Workout Order"
            value={order}
            name="order"
            onChange={(e) => setOrder(e.target.value)}
            contrast
          />
        </div>
        <div className={custom ? "hidden" : null}>
          <select
            className="form-control contrast-dropdown"
            value={workoutDay}
            name="day"
            onChange={(e) => setWorkoutDay(e.target.value)}
          >
            {daysOfWeekArray.map((day, i) => {
              const newDay = day.charAt(0).toUpperCase() + day.slice(1);
              return (
                <option
                  key={i}
                  value={newDay}
                  className={
                    workoutDay === newDay ? "select-selected-option" : ""
                  }
                >
                  {newDay}
                </option>
              );
            })}
          </select>
        </div>

        <MDBBtn type="submit" className="mb-4" block>
          Create Workout
        </MDBBtn>
      </form>
<ToastContainer />
    </div>
  );
};

export default CreateWorkout;
