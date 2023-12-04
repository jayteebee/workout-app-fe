import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import { MDBBtn } from "mdb-react-ui-kit";

const DataVisualisation = ({ sortedSessionLogs }) => {
  const [fromDate, setFromDate] = useState(new Date());
  console.log("fromDate", fromDate);
  const [untilDate, setUntilDate] = useState(new Date());
  console.log("untilDate", untilDate);

  const [dataVisForm, setDataVisForm] = useState({
    startDate: "",
    endDate: "",
    frequency: "",
    workoutToMeasure: "",
    exerciseToMeasure: "",
    metric: "",
  });
  console.log("dataVisForm", dataVisForm);

  console.log("sortedSessionLogs", sortedSessionLogs);

  useEffect(() => {
    registerLocale("en-GB", enGB);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  // array for the drop down enabling the user to change the time segments they can see on the chart
  const dataViewFrequency = ["Week", "Month", "Quarter", "Year"];

  const exerciseNamesFromWorkoutLogsArray =
    sortedSessionLogs &&
    sortedSessionLogs.length > 0 &&
    sortedSessionLogs.flatMap((log) => {
      const exerciseSession = log.details.exercise_sessions;
      return exerciseSession.map((session) => session.exercise_name);
    });

  const exerciseNameArrayWithNoDuplicates = [
    ...new Set(exerciseNamesFromWorkoutLogsArray),
  ];
  console.log(
    "workoutNameArrayWithNoDuplicates",
    exerciseNameArrayWithNoDuplicates
  );

  const workoutNamesFromWorkoutLogsArray =
    sortedSessionLogs &&
    sortedSessionLogs.length > 0 &&
    sortedSessionLogs.map((log) => log.workout_name);

  const workoutNamesArrayWithNoDuplicates = [
    ...new Set(workoutNamesFromWorkoutLogsArray),
  ];
  console.log(
    "workoutNamesArrayWithNoDuplicates",
    workoutNamesArrayWithNoDuplicates
  );

  const metricToMeasure = ["Total Volume", "Total Reps", "Total Sets", "Total Time Under Tension"]

  return (
    <div>
      <h2> Data Vis.</h2>

      <form onSubmit={handleFormSubmit}>
        <div style={{ border: "2px solid red" }}>
          <h3>Start / End Date</h3>
          <DatePicker
            selected={fromDate}
            onChange={(date) => {
              setDataVisForm((prevForm) => ({
                ...prevForm,
                startDate: date,
              }));
              setFromDate(date);
            }}
          />

          <DatePicker
            selected={untilDate}
            onChange={(date) => {
              setDataVisForm((prevForm) => ({
                ...prevForm,
                endDate: date,
              }));
              setUntilDate(date);
            }}
          />
        </div>

        <div style={{ border: "2px solid blue" }}>
          <h3>Frequency</h3>
          <select
            onChange={(e) => {
              setDataVisForm((prevForm) => ({
                ...prevForm,
                frequency: e.target.value,
              }));
            }}
          >
            {dataViewFrequency.map((freq) => (
              <option value={freq} key={`key:${freq}`}>
                {freq}
              </option>
            ))}
          </select>
        </div>

        <div style={{ border: "2px solid green" }}>
          <h3> Workout / Exercise To Measure</h3>

          <select
            onChange={(e) => {
              setDataVisForm((prevForm) => ({
                ...prevForm,
                workoutToMeasure: e.target.value,
              }));
            }}
          >
            <option>---Select---</option>
            {workoutNamesArrayWithNoDuplicates.map((workout) => (
              <option value={workout} key={`key:${workout}`}>
                {workout}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => {
              setDataVisForm((prevForm) => ({
                ...prevForm,
                exerciseToMeasure: e.target.value,
              }));
            }}
          >
            <option>---Select---</option>
            {exerciseNameArrayWithNoDuplicates.map((exercise) => (
              <option value={exercise} key={`key:${exercise}`}>
                {exercise}
              </option>
            ))}
          </select>
        </div>

        <div style={{border: "2px solid black"}}>
        <h3>Metric To Measure</h3>
        <select
            onChange={(e) => {
              setDataVisForm((prevForm) => ({
                ...prevForm,
                metric: e.target.value,
              }));
            }}
          >
          <option>---Select---</option>
            {metricToMeasure.map((metric) => (
              <option value={metric} key={`key:${metric}`}>
                {metric}
              </option>
            ))}
          </select>
        
        </div>

        <MDBBtn type="submit">Submit!</MDBBtn>
      </form>
    </div>
  );
};

export default DataVisualisation;
