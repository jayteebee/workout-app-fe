import React, { useEffect, useState } from "react";
import { getAllSessionLogs } from "../API/SessionLogs/SessionLogs";
import DatePicker, { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";

import "react-datepicker/dist/react-datepicker.css";
import ExerciseMetricTotalsByChosenTimeFrame from "../Components/Analytics/ExerciseMetricTotalsByChosenTimeFrame";

const Analytics = () => {
  const [allSessionLogs, setAllSessionLogs] = useState();
  console.log("allSessionLogs", allSessionLogs);
  const [startDate, setStartDate] = useState(new Date());
  console.log("startDate", startDate);

  const [chosenDate, setChosenDate] = useState({
    format: "",
    date: "",
  });
  console.log("chosenDate", chosenDate);

  // this controls the time frame that is being shown. Default is "All", but the user changes this via the dropdown (Week, Month, Quarter, Year)
  const [chosenFilter, setChosenFilter] = useState("All");
  console.log("chosenFilter", chosenFilter);

  const [filteredSessionLogs, setFilteredSessionLogs] = useState([])
  console.log('filteredSessionLogs',filteredSessionLogs)
  // register the en-GB locale for the date picker (prevents console error)
  useEffect(() => {
    registerLocale("en-GB", enGB);
    getAllSessionLogs()
      .then((data) => setAllSessionLogs(data))
      .catch((err) => console.log("Error Fetching All Session Logs", err));
  }, []);

  const sortedSessionLogs =
    allSessionLogs &&
    allSessionLogs.length > 0 &&
    allSessionLogs.sort(
      (a, b) => new Date(b.details.date) - new Date(a.details.date)
    );
  console.log("sortedSessionLogs", sortedSessionLogs);

 useEffect(() => {
  if (sortedSessionLogs && sortedSessionLogs.length > 0) {
    setFilteredSessionLogs(sortedSessionLogs)
  }
 }, [sortedSessionLogs])


  // this variable contains 4 different DatePicker components, each uniquely updating the chosenDate state 
  const filterToRender = {
    All: (
      <div>
        <h2>No Filter Applied</h2>
      </div>
    ),
    Week: (
      <div>
        <h2>Filter By Week</h2>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setChosenDate({
              format: "Week",
              date: date,
            });
            setStartDate(date);
          }}
          dateFormat="I/R"
          locale="en-GB"
          showWeekNumbers
          showWeekPicker
        />
      </div>
    ),
    Month: (
      <div>
        <h2>Filter By Month</h2>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setChosenDate({
              format: "Month",
              date: date,
            });
            setStartDate(date);
          }}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
        />
      </div>
    ),
    Quarter: (
      <div>
        <h2>Filter By Quarter</h2>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setChosenDate({
              format: "Quarter",
              date: date,
            });
            setStartDate(date);
          }}
          showQuarterYearPicker
          dateFormat="yyyy, QQQ"
        />
      </div>
    ),
    Year: (
      <div>
        <h2>Filter By Year</h2>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setChosenDate({
              format: "Year",
              date: date,
            });
            setStartDate(date);
          }}
          dateFormat="yyyy"
          showYearPicker
        />
      </div>
    ),
  };

  //this function is called in the return render statement, and controls which filter option is displayed. Defaults to All: "No Filter Applied"
  const renderDatePicker = () => {
    return filterToRender[chosenFilter] || null;
  };

// stores data for charts/graphs
  let arrayOfExerciseObjects = [];

// loops over every session log and collates exercise data. EG: bench done twice, sums the reps/sets etc into one object.
  filteredSessionLogs &&
    filteredSessionLogs.length > 0 &&
    filteredSessionLogs.forEach((log) => {
      const exerciseSessions = log.details.exercise_sessions;

      exerciseSessions.forEach((exercise) => {
        const existingExerciseIndex = arrayOfExerciseObjects.findIndex(
          (item) => item.exercise_id === exercise.exercise_id
        );

        if (existingExerciseIndex !== -1) {
          const currentExercise = arrayOfExerciseObjects[existingExerciseIndex];

          currentExercise.totalWeight += exercise.weight_used;
          currentExercise.totalReps += exercise.reps_completed;
          currentExercise.totalTimeUnderTension += exercise.set_timer;
          currentExercise.totalSets += 1;
          currentExercise.totalVolume =
            currentExercise.totalWeight * currentExercise.totalReps;
        } else {
          const newExercise = {
            exercise_id: exercise.exercise_id,
            exercise_name: exercise.exercise_name,
            totalWeight: exercise.weight_used,
            totalVolume: exercise.weight_used * exercise.reps_completed,
            totalReps: exercise.reps_completed,
            totalTimeUnderTension: exercise.set_timer,
            totalSets: 1,
          };
          arrayOfExerciseObjects.push(newExercise);
        }
      });
    });
  console.log("arrayOfExerciseObjects", arrayOfExerciseObjects);


  useEffect(() => {
    if (chosenDate.format) {
      const format = chosenDate.format;
      const startDate = new Date(chosenDate.date);
      const endDate = new Date(startDate.getTime());
      const startTimestamp = startDate.getTime();
      let endTimestamp;
  
      if (format === "Week") {
        endDate.setDate(endDate.getDate() + 7);
      } else if (format === "Month") {
        endDate.setDate(endDate.getDate() + 30);
      } else if (format === "Quarter") {
        endDate.setDate(endDate.getDate() + 90);
      } else if (format === "Year") {
        endDate.setDate(endDate.getDate() + 365);
      }
  
      endTimestamp = endDate.getTime();
  
      const logsFilteredForDate = sortedSessionLogs.filter(
        (log) =>
          new Date(log.details.date).getTime() >= startTimestamp &&
          new Date(log.details.date).getTime() <= endTimestamp
      );
  
      setFilteredSessionLogs(logsFilteredForDate);
    }
  }, [chosenDate]);
  

const dropdownTimeframeArray = ["All", "Week", "Month", "Quarter", "Year"]

  return (
    <div>
      <select onChange={(e) => setChosenFilter(e.target.value)}>
      {dropdownTimeframeArray.map((timeframe) => (
        <option value={timeframe}>{timeframe}</option>
      ))}
      </select>

      {renderDatePicker()}

      {filteredSessionLogs.length === 0 ? 
        <p>No Workout Data to display for this time period</p> :
        <ExerciseMetricTotalsByChosenTimeFrame
        arrayOfExerciseObjects={arrayOfExerciseObjects}
        />
      }

    </div>
  );
};

export default Analytics;
