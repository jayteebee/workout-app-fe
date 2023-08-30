import React, { useState, useEffect } from "react";
import "../../CSS/Workout.css";
import { parseJwt } from "../../API/Authentication/parseJwt";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { createWorkout } from "../../API/Workout/Workout";
import { addWorkoutToRoutine } from "../../API/Routine/Routine";

const CreateWorkout = ({
  setWorkoutToggle,
  workoutToggle,
  routineID,
  setWorkoutCreated,
  dayOfWeek,
  setDayOfWeek,
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
  const [workoutDay, setWorkoutDay] = useState("");
  const [workoutDayIndex, setWorkoutDayIndex] = useState(false);
  // console.log("** workoutDayINDEX", workoutDayIndex);

  const daysOfWeekArray = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  useEffect(() => {
    if (workoutDayIndex !== false) {
      toggleDaysOfWeekBoolean(workoutDayIndex);
    }
  }, [workoutDayIndex]);

  const toggleDaysOfWeekBoolean = (workoutIndex) => {
    console.log("clickedIndex INSIDE:", workoutIndex);

    const updatedDaysOfWeek = dayOfWeek.map((day) => {
      if (day.value === workoutIndex) {
        return {
          ...day,
          [daysOfWeekArray[workoutIndex]]: !day[daysOfWeekArray[workoutIndex]], // toggles the boolean
        };
      }
      // console.log("day:", day);
      return day;
    });

    setDayOfWeek(updatedDaysOfWeek);
  };

  console.log("dayOfWeek ***", dayOfWeek);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = await createWorkout(formInput);
      setCreatedWorkout(data);

      const dayNameToIndex = {
        monday: 0,
        tuesday: 1,
        wednesday: 2,
        thursday: 3,
        friday: 4,
        saturday: 5,
        sunday: 6,
      };

      const lowercaseDay = workoutDay.toLowerCase();
      if (dayNameToIndex.hasOwnProperty(lowercaseDay)) {
        setWorkoutDayIndex(dayNameToIndex[lowercaseDay]);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setFormInput({ user_id: "", name: ""});
      setWorkoutToggle((prevState) => !prevState);
    }
  };

  useEffect(() => {
    if (createdWorkout.id) {
      addWorkoutToRoutine(routineID, {
        workout_id: createdWorkout.id,
        order: order,
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

        <MDBInput
          className="mb-4"
          type="text"
          label="Workout Order"
          value={order}
          name="order"
          onChange={(e) => setOrder(e.target.value)}
          contrast
        />

        <MDBInput
          className="mb-4"
          type="text"
          label="Workout Day"
          value={workoutDay}
          name="day"
          onChange={(e) => setWorkoutDay(e.target.value)}
          contrast
        />

        <MDBBtn type="submit" className="mb-4" block>
          Create Workout
        </MDBBtn>
      </form>
    </div>
  );
};

export default CreateWorkout;
