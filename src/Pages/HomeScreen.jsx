import React, { useEffect, useState } from "react";
import { getAllWorkoutSchedules } from "../API/WorkoutSchedule/WorkoutSchedule";
import format from "date-fns/format";

const HomeScreen = () => {
  const [workoutSchedule, setWorkoutSchedule] = useState([]);

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
  const sortedSchedule = workoutSchedule.slice().sort((a, b) => a.id - b.id);
  console.log("sortedSchedule", sortedSchedule);

  // const schedule = workoutSchedule.map((date, index) => {
  //   const inputDate = new Date (`${date.date}`)
  //   const formattedDate = format(inputDate, 'EEEE do MMMM yyyy')
  //   console.log("DC",date.completed)
  //   return (
  //     <div>
  //     <p>{formattedDate}</p>
  //     <p>{date.completed ? <p>Completed</p> : <p>Not Completed</p>}</p>
  //     </div>
  //     )
  // })
  // console.log("schedule", schedule)

  return (
    <div className="scrollableDiv">
      {sortedSchedule.map((date, index) => {
        const inputDate = new Date(`${date.date}`);
        const formattedDate = format(inputDate, "EEEE do MMMM yyyy");
        return (
          <div key={index}>
            <h3>{formattedDate}</h3>
            {date.completed ? <p>Completed</p> : <p>Not Completed</p>}
          </div>
        );
      })}
    </div>
  );
};

export default HomeScreen;
