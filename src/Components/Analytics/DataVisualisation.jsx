import React, { useEffect, useState } from "react";
import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import DataVisForm from "./DataVisForm";
import "chart.js/auto";
import { CategoryScale, Chart, Bar } from "react-chartjs-2";

const DataVisualisation = ({ sortedSessionLogs }) => {
  const [dataVisForm, setDataVisForm] = useState({
    startDate: "",
    endDate: "",
    frequency: "",
    workoutToMeasure: "",
    exerciseToMeasure: "",
    metric: "",
  });
    // console.log("dataVisForm", dataVisForm);

  const [datesSegmentedByChosenFrequency, setDatesSegmentedByChosenFrequency] =
    useState([]);
    console.log(
      "datesSegmentedByChosenFrequency",
      datesSegmentedByChosenFrequency
    );
  const [sessionLogsSegmentedByFrequency, setSessionLogsSegmentedByFrequency] =
    useState([]);
  //   console.log(
  //     "sessionLogsSegmentedByFrequency",
  //     sessionLogsSegmentedByFrequency
  //   );

  const [segmentedLogsFilteredByType, setSegmentedLogsFilteredByType] =
    useState([]);
  //   console.log("segmentedLogsFilteredByType", segmentedLogsFilteredByType);

  const [dataForChart, setDataForChart] = useState([]);
  //   console.log("dataForChart", dataForChart);

  useEffect(() => {
    registerLocale("en-GB", enGB);
  }, []);

  // This useEffect will take the user chosen start/end dates and push the dates which divide the segments to state
  // EG: Jan segmented by weeks = [Jan 1st, Jan 8th, Jan 15th] etc
  useEffect(() => {
    if (dataVisForm.startDate && dataVisForm.endDate && dataVisForm.frequency) {
      const millisecondsInDay = 24 * 60 * 60 * 1000;
      const millisecondsInWeek = 7 * millisecondsInDay;
      const millisecondsInMonth = 30 * millisecondsInDay
      const millisecondsInQuarter = 13 * millisecondsInWeek;
      const millisecondsInYear = 365 * millisecondsInDay;

      const startDate = dataVisForm.startDate.getTime();
      const endDate = dataVisForm.endDate.getTime();
      const freq = dataVisForm.frequency;

      let arrayOfDates = [];
      if (freq === "Week") {
        // *** have to comment out date formatting for data transformation purposes. Reuse this later on
        // const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
        // const formatter = new Intl.DateTimeFormat('en-GB', options);

        for (let i = startDate; i <= endDate; i += millisecondsInWeek) {
          // *** same reason as above
        //   const formattedDate = formatter.format(new Date(i));
          // arrayOfDates.push(formattedDate);
          arrayOfDates.push(new Date(i));
        }
      } else if (freq === "Month") {
        for (let i = startDate; i <= endDate; i += millisecondsInMonth) {
            arrayOfDates.push(new Date(i));
          }
      } else if (freq === "Quarter") {
        for (let i = startDate; i <= endDate; i += millisecondsInQuarter) {
            arrayOfDates.push(new Date(i));
          }
      } else if (freq === "Year") {
        for (let i = startDate; i <= endDate; i += millisecondsInYear) {
            arrayOfDates.push(new Date(i));
          }
      }

      setDatesSegmentedByChosenFrequency(arrayOfDates);
    }
  }, [dataVisForm]);

  // this useEffect will look at each time period in the datesSegmented... state and search for logs which fall between each pair of dates (index 0 and 1, 1 and 2 etc)
  // it pushes those logs in an object to state
  useEffect(() => {
    if (
      datesSegmentedByChosenFrequency &&
      datesSegmentedByChosenFrequency.length > 0
    ) {
      let segmentedSessionLogs = [];
      const millisecondsInDay = 24 * 60 * 60 * 1000;

      for (let i = 0; i < datesSegmentedByChosenFrequency.length - 1; i++) {
        const currentDate = datesSegmentedByChosenFrequency[i];
        const nextDate = datesSegmentedByChosenFrequency[i + 1];

        const currentDateTimeStamp = currentDate.getTime();
        const nextDateTimeStamp = nextDate.getTime();

        const sessionLogsFilter = sortedSessionLogs.filter(
          (log) =>
            new Date(log.details.date).getTime() >= currentDateTimeStamp &&
            new Date(log.details.date).getTime() <= nextDateTimeStamp
        );
        segmentedSessionLogs.push({
          week: `Week ${i + 1}`,
          log: sessionLogsFilter,
        });
      }
      // Filter logs falling within the final segment but not in prior segments
      const finalLogsFilter = sortedSessionLogs.filter(
        (log) =>
          new Date(log.details.date).getTime() >=
            datesSegmentedByChosenFrequency[
              datesSegmentedByChosenFrequency.length - 1
            ].getTime() &&
          new Date(log.details.date).getTime() <=
            dataVisForm.endDate.getTime() + millisecondsInDay
      );

      if (finalLogsFilter.length > 0) {
        segmentedSessionLogs.push({ week: "Final", log: finalLogsFilter });
      }

      setSessionLogsSegmentedByFrequency(segmentedSessionLogs);
    }
  }, [datesSegmentedByChosenFrequency]);

  // this useEffect will take the workout logs that have been broken up into segments, and filter them to keep only the workouts/exercises that the user selects
  useEffect(() => {
    if (
      sessionLogsSegmentedByFrequency &&
      sessionLogsSegmentedByFrequency.length > 0 &&
      (dataVisForm.exerciseToMeasure || dataVisForm.workoutToMeasure)
    ) {
      const exercise = dataVisForm.exerciseToMeasure;
      const workout = dataVisForm.workoutToMeasure;

      const matchingSegments = sessionLogsSegmentedByFrequency.map(
        (segment) => {
          const week = segment.week;
          const sessionLog = segment.log;

          if (workout) {
            const logsThatMatchChosenWorkoutName = sessionLog.filter(
              (log) => log.workout_name === workout
            );
            if (logsThatMatchChosenWorkoutName.length > 0) {
              return { week: week, log: logsThatMatchChosenWorkoutName };
            }
          }
          return { week: week, log: [] };
        }
      );
      setSegmentedLogsFilteredByType(matchingSegments);
    }
  }, [sessionLogsSegmentedByFrequency]);

  // this useEffect will calculate the total user specified metric
  useEffect(() => {
    if (
      segmentedLogsFilteredByType &&
      segmentedLogsFilteredByType.length > 0 &&
      dataVisForm.metric
    ) {
      const metric = dataVisForm.metric;
      const totalMetricPerSegment = [];

      if (metric === "Total Reps") {
        segmentedLogsFilteredByType.forEach((segment) => {
          const week = segment.week;
          const logs = segment.log;

          let totalReps = 0;

          if (Array.isArray(logs) && logs.length > 0) {
            logs.forEach((log) => {
              if (
                log.details &&
                log.details.exercise_sessions &&
                log.details.exercise_sessions.length > 0
              ) {
                log.details.exercise_sessions.forEach((exSession) => {
                  if (exSession["reps_completed"]) {
                    totalReps += exSession["reps_completed"];
                  }
                });
              }
            });
          }

          totalMetricPerSegment.push({
            week,
            totalReps: totalReps,
            metric: metric,
          });
        });
      }

      setDataForChart(totalMetricPerSegment);
      // Return totalMetricPerSegment or set it to state
    }
  }, [segmentedLogsFilteredByType, dataVisForm]);

  const data = dataForChart &&
    dataForChart.length > 0 && {
      labels: dataForChart.map((segment) => segment.week),
      datasets: [
        {
          label: dataForChart.map((segment) => segment.metric)[0],
          data: dataForChart.map((segment) => segment.totalReps),
        },
      ],
    };
  //   console.log("data", data);
  return (
    <div>
      <DataVisForm
        sortedSessionLogs={sortedSessionLogs}
        setDataVisForm={setDataVisForm}
        sessionLogsSegmentedByFrequency={sessionLogsSegmentedByFrequency}
      />

      {data && (
        <div style={{ width: "50vw", height: "50vh" }}>
          <Bar data={data} />
        </div>
      )}
    </div>
  );
};

export default DataVisualisation;
