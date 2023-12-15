import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import { MDBBtn } from "mdb-react-ui-kit";
import "../../CSS/DataVisForm.css"

const DataVisForm = ({
  sortedSessionLogs,
  setDataVisForm,
  sessionLogsSegmentedByFrequency,
  setFormSubmitted
}) => {
  const [fromDate, setFromDate] = useState(new Date());
  //   console.log("fromDate", fromDate);
  const [untilDate, setUntilDate] = useState(new Date());
  //   console.log("untilDate", untilDate);

  useEffect(() => {
    registerLocale("en-GB", enGB);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(formSubmitted => !formSubmitted)
  };

  // array for the drop down enabling the user to change the time segments they can see on the chart
  const dataViewFrequency = ["Workout", "Week", "Month", "Quarter", "Year"];

  // const exerciseNamesFromWorkoutLogsArray =
  //   sortedSessionLogs &&
  //   sortedSessionLogs.length > 0 &&
  //   sortedSessionLogs.flatMap((log) => {
  //     const exerciseSession = log.details.exercise_sessions;
  //     return exerciseSession.map((session) => session.exercise_name);
  //   });

  const exerciseNamesFromSegmentedLogs =
    sessionLogsSegmentedByFrequency &&
    sessionLogsSegmentedByFrequency.length > 0 &&
    sessionLogsSegmentedByFrequency.flatMap((segment) => {
      // Access the 'log' array within each segment
      const logs = segment.log;

      // Extract exercise names from each log
      return logs.flatMap((log) => {
        const exerciseSession = log.details.exercise_sessions;
        return exerciseSession.map((session) => session.exercise_name);
      });
    });
  // console.log('exerciseNamesFromSegmentedLogs',exerciseNamesFromSegmentedLogs)

  const exerciseNameArrayWithNoDuplicates = exerciseNamesFromSegmentedLogs &&
    exerciseNamesFromSegmentedLogs.length > 0 && [
      ...new Set(exerciseNamesFromSegmentedLogs),
    ];
  // console.log(
  //   "exerciseNameArrayWithNoDuplicates",
  //   exerciseNameArrayWithNoDuplicates
  // );

  const workoutNamesFromSegmentedLogs =
    sessionLogsSegmentedByFrequency &&
    sessionLogsSegmentedByFrequency.length > 0 &&
    sessionLogsSegmentedByFrequency.flatMap((segment) => {
      const logs = segment.log;
      const workoutNames = logs.map((log) => log.workout_name);
      return workoutNames;
    });
  // console.log('workoutNamesFromSegmentedLogs',workoutNamesFromSegmentedLogs)

  const workoutNamesArrayWithNoDuplicates = workoutNamesFromSegmentedLogs &&
    workoutNamesFromSegmentedLogs.length > 0 && [
      ...new Set(workoutNamesFromSegmentedLogs),
    ];
  // console.log(
  //   "workoutNamesArrayWithNoDuplicates",
  //   workoutNamesArrayWithNoDuplicates
  // );

  const metricToMeasure = [
    "Total Volume",
    "Total Reps",
    "Total Sets",
    "Total Time Under Tension",
  ];

const [exerciseOrWorkout, setExerciseOrWorkout] = useState({
  exercise: false,
  workout: false
})
console.log('exerciseOrWorkout',exerciseOrWorkout)

const handleCheckChange = (e) => {
const name = e.target.name
setExerciseOrWorkout(prevState => ({
  ...prevState,
  [name]: !prevState[name]
}))
}

  return (
    <div className="form-container">
      <form onSubmit={handleFormSubmit}>
      <h3>Start / End Date</h3>
      <div className="datePicker">
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

        <div >
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

        <div >
          <h3> Workout / Exercise To Measure</h3>
<div style={{display: "flex", justifyContent: "space-evenly"}}>
             <div> <input type="checkbox" checked={exerciseOrWorkout.workout} name="workout" onChange={(e) =>handleCheckChange(e)} />Workout</div>

              <div><input type="checkbox" checked={exerciseOrWorkout.exercise} name="exercise" onChange={(e) =>handleCheckChange(e)} />Exercise</div>
              </div>
          <select
          className={exerciseOrWorkout.workout ? "" : "hidden"}
            onChange={(e) => {
              setDataVisForm((prevForm) => ({
                ...prevForm,
                workoutToMeasure: e.target.value,
              }));
            }}
          >
            <option>---Select---</option>
            {workoutNamesArrayWithNoDuplicates &&
              workoutNamesArrayWithNoDuplicates.length > 0 &&
              workoutNamesArrayWithNoDuplicates.map((workout) => (
                <option value={workout} key={`key:${workout}`}>
                  {workout}
                </option>
              ))}
          </select>

          <select
          className={exerciseOrWorkout.exercise ? "" : "hidden"}

            onChange={(e) => {
              setDataVisForm((prevForm) => ({
                ...prevForm,
                exerciseToMeasure: e.target.value,
              }));
            }}
          >
            <option>---Select---</option>
            {exerciseNameArrayWithNoDuplicates &&
              exerciseNameArrayWithNoDuplicates.length > 0 &&
              exerciseNameArrayWithNoDuplicates.map((exercise) => (
                <option value={exercise} key={`key:${exercise}`}>
                  {exercise}
                </option>
              ))}
          </select>
        </div>

        <div >
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

export default DataVisForm;
