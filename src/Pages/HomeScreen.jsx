import React, { useEffect, useState } from "react";
import { getAllWorkoutSchedules } from "../API/WorkoutSchedule/WorkoutSchedule";
import format from "date-fns/format";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useNavigate } from "react-router-dom";
import { getExercisesInWorkout } from "../API/Workout/Workout";
import "../App.css";

const HomeScreen = ({ routineID }) => {
  const [workoutSchedule, setWorkoutSchedule] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState(null);
  const [sortedSchedule, setSortedSchedule] = useState([]);
  const [exercisesInWorkout, setExercisesInWorkout] = useState([]);
  // console.log("exercisesInWorkout", exercisesInWorkout);
  const [idOfRoutineWorkout, setIdOfRoutineWorkout] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    getAllWorkoutSchedules()
      .then((data) => {
        setWorkoutSchedule(data);
      })
      .catch((err) => {
        console.log("getAllWorkoutSchedules API Call Failed", err);
      });
  }, []);

  // console.log("workoutSchedule", workoutSchedule);

  useEffect(() => {
    const sortSchedule = workoutSchedule.slice().sort((a, b) => a.id - b.id);
    setSortedSchedule(sortSchedule);
  }, [workoutSchedule]);

  // console.log("sortedSchedule", sortedSchedule);

  useEffect(() => {
    const events = sortedSchedule.map((data) => {
      const inputDate = new Date(`${data.date}`);
      const formattedDate = format(inputDate, "yyyy-MM-dd");
      return {
        title: `Start ${data.workout_name}`,
        start: formattedDate,
        id: data.id,
        routineWorkoutId: data.routine_workout_id,
      };
    });
    setCalendarEvents(events);
  }, [sortedSchedule]);

  // console.log("CALENDAR EVENTS: ", calendarEvents);

  // className="calendar"

  const startWorkout = (rwID) => {
    const currentDate = new Date();
    const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");

    const hasEventOnCurrentDay = calendarEvents.some(
      (event) => event.start === formattedCurrentDate
    );
    if (hasEventOnCurrentDay) {
      navigate("/Session", {
        state: { exercisesInWorkout: exercisesInWorkout, rwID: rwID },
      });
      console.log("success");
    } else {
      console.log("Failure");
    }
  };

  const handleEventClick = async (eventClickInfo) => {
    const routineWorkoutId =
      eventClickInfo.event.extendedProps.routineWorkoutId;
    // console.log("routineWorkoutId", routineWorkoutId);
    setIdOfRoutineWorkout(routineWorkoutId)

    await getExercisesInWorkout(routineWorkoutId)
      .then((data) => setExercisesInWorkout(data))
      .catch((error) => {
        console.log("Error with getExercisesInWorkout API Call: ", error);
      });
  };

  useEffect(() => {
    if (exercisesInWorkout.length > 0) {
      startWorkout(idOfRoutineWorkout)
    }
  }, [exercisesInWorkout])

  // const displayWorkoutData = exercisesInWorkout.map((exercise) => (
  //   <div key={exercise.id}>
  //     Workout Name: {exercise.workout_name}
  //     Exercise: {exercise.exercise.name}
  //     Sets: {exercise.sets}
  //     Reps: {exercise.reps}
  //   </div>
  // ));
  // console.log("displayWorkoutData", displayWorkoutData);

  return (
    <div>
    <h3>Welcome to My Workout App</h3>
    <h1 style={{textDecoration: "underline", color: "white"}}>--UNDER DEVELOPMENT--</h1>
    <div className="calendar-container" >
      <div className="calendar">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={calendarEvents}
          eventClick={handleEventClick}
          height="80vh"
        />

      </div>
</div>
      {/*<MDBBtn onClick={startWorkout}>Start Workout</MDBBtn>*/}

    </div>
  );
};

export default HomeScreen;
