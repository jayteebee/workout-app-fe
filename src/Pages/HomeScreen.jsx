import React, { useEffect, useState } from "react";
import { getAllWorkoutSchedules } from "../API/WorkoutSchedule/WorkoutSchedule";
import format from "date-fns/format";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Timer from "../Components/WorkoutSession/Timer";

const HomeScreen = () => {
  const [workoutSchedule, setWorkoutSchedule] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState(null);
  const [sortedSchedule, setSortedSchedule] = useState([]);

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

  // console.log("CALENDAR EVENTS: ", calendarEvents);

  // className="calendar"
  return (
    <div className="calendar"> 


      <FullCalendar
      plugins={[ dayGridPlugin ]}
      initialView="dayGridMonth"
      events={calendarEvents}
    />

<Timer />
    </div>
  );
};

export default HomeScreen;
