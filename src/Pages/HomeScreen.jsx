import React, { useEffect, useState } from "react";
import { getAllWorkoutSchedules } from "../API/WorkoutSchedule/WorkoutSchedule";
import format from "date-fns/format";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Timer from "../Components/WorkoutSession/Timer";
import { MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const HomeScreen = ({routineID}) => {
  const [workoutSchedule, setWorkoutSchedule] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState(null);
  const [sortedSchedule, setSortedSchedule] = useState([]);
console.log("routineID", routineID)
  const navigate = useNavigate()

  useEffect(() => {
    getAllWorkoutSchedules()
      .then((data) => {
        setWorkoutSchedule(data);
      })
      .catch((err) => {
        console.log("getAllWorkoutSchedules API Call Failed", err);
      });
  }, []);

  console.log("workoutSchedule", workoutSchedule);

  useEffect(() => {
    const sortSchedule = workoutSchedule.slice().sort((a, b) => a.id - b.id);
    setSortedSchedule(sortSchedule)
  }, [workoutSchedule]);

  // console.log("sortedSchedule", sortedSchedule);

  useEffect(() => {
    const events = sortedSchedule.map((data) => {
      const inputDate = new Date(`${data.date}`);
      const formattedDate = format(inputDate, "yyyy-MM-dd");
      return {
        title: data.workout_name,
        start: formattedDate,
        id: data.id,
      };
    });
    setCalendarEvents(events);
  }, [sortedSchedule]);

  console.log("CALENDAR EVENTS: ", calendarEvents);

  // className="calendar"

const startWorkout = () => {
  navigate("/Session")
}

  return (
    <div className="calendar"> 


      <FullCalendar
      plugins={[ dayGridPlugin ]}
      initialView="dayGridMonth"
      events={calendarEvents}
    />

<MDBBtn onClick={startWorkout} >Start Workout</MDBBtn>
    </div>
  );
};

export default HomeScreen;
