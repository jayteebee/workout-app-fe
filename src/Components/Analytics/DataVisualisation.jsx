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
  //   console.log("dataVisForm", dataVisForm);

  const [datesSegmentedByChosenFrequency, setDatesSegmentedByChosenFrequency] =
    useState([]);
  // console.log(
  //   "datesSegmentedByChosenFrequency",
  //   datesSegmentedByChosenFrequency
  // );
  const [sessionLogsSegmentedByFrequency, setSessionLogsSegmentedByFrequency] =
    useState([]);
  //   console.log(
  //     "sessionLogsSegmentedByFrequency",
  //     sessionLogsSegmentedByFrequency
  //   );

  const [segmentedLogsFilteredByType, setSegmentedLogsFilteredByType] =
    useState([]);
  //   console.log("segmentedLogsFilteredByType", segmentedLogsFilteredByType);

  const [dataForWorkoutOrExerciseBarChart, setDataForWorkoutOrExerciseBarChart] = useState([]);
  //   console.log("dataForChart", dataForChart);
  const [dataForMuscleGroupPieChart, setDataForMuscleGroupPieChart] = useState()
  console.log('dataForMuscleGroupPieChart',dataForMuscleGroupPieChart[dataForMuscleGroupPieChart.length -1])

  useEffect(() => {
    registerLocale("en-GB", enGB);
  }, []);

  // This useEffect will take the user chosen start/end dates and push the dates which divide the segments to state
  // EG: Jan segmented by weeks = [Jan 1st, Jan 8th, Jan 15th] etc
  useEffect(() => {
    if (dataVisForm.startDate && dataVisForm.endDate && dataVisForm.frequency) {
      const millisecondsInDay = 24 * 60 * 60 * 1000;
      const millisecondsInWeek = 7 * millisecondsInDay;
      const millisecondsInMonth = 30 * millisecondsInDay;
      const millisecondsInQuarter = 13 * millisecondsInWeek;
      const millisecondsInYear = 365 * millisecondsInDay;

      const startDate = dataVisForm.startDate.getTime();
      const endDate = dataVisForm.endDate.getTime();
      const freq = dataVisForm.frequency;

      let arrayOfDates = [];
      if (freq === "Week") {
        for (let i = startDate; i <= endDate; i += millisecondsInWeek) {
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

  // this useEffect will look at each time period in the setDatesSegmentedByChosenFrequency state and search for logs which fall between each pair of dates (index 0 and 1, 1 and 2 etc)
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
        const options = { day: "numeric", month: "short" };
        const formatter = new Intl.DateTimeFormat("en-GB", options);
        const formattedCurrentDate = formatter.format(new Date(currentDate));
        const formattedNextDate = formatter.format(new Date(nextDate));

        segmentedSessionLogs.push({
          timePeriod: `${formattedCurrentDate} to ${formattedNextDate}`,
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
        segmentedSessionLogs.push({
          timePeriod: "Final",
          log: finalLogsFilter,
        });
      }

      setSessionLogsSegmentedByFrequency(segmentedSessionLogs);
    }
  }, [datesSegmentedByChosenFrequency]);

  // this useEffect will take the workout logs that have been broken up into segments, and filter them to keep only the logs which contain the workouts/exercises that the user selects
  useEffect(() => {
    if (
      sessionLogsSegmentedByFrequency &&
      sessionLogsSegmentedByFrequency.length > 0 &&
      (dataVisForm.exerciseToMeasure || dataVisForm.workoutToMeasure)
    ) {
      const exercise = dataVisForm.exerciseToMeasure;
      const workout = dataVisForm.workoutToMeasure;

      //   debugger
      const matchingSegments = sessionLogsSegmentedByFrequency.map(
        (segment) => {
          const timePeriod = segment.timePeriod;
          const sessionLog = segment.log;

          if (workout) {
            const logsThatMatchChosenWorkoutName = sessionLog.filter(
              (log) => log.workout_name === workout
            );

            if (logsThatMatchChosenWorkoutName.length > 0) {
              return {
                timePeriod: timePeriod,
                log: logsThatMatchChosenWorkoutName,
              };
            }
          } else if (exercise) {
            const logsThatMatchChosenExerciseName = sessionLog.map((log) =>
              log.details.exercise_sessions.filter((exerciseSession) => {
                return exerciseSession.exercise_name === exercise;
              })
            );

            if (
              logsThatMatchChosenExerciseName &&
              logsThatMatchChosenExerciseName.length > 0
            ) {
              return {
                timePeriod: timePeriod,
                log: logsThatMatchChosenExerciseName,
              };
            }
          }
          return { timePeriod: timePeriod, log: [] };
        }
      );

      setSegmentedLogsFilteredByType(matchingSegments);
    }
  }, [sessionLogsSegmentedByFrequency]);

//   console.log("segmentedLogsFilteredByType", segmentedLogsFilteredByType);

  // this useEffect will calculate the total user specified metric
  useEffect(() => {
    //   if (dataVisForm.workoutToMeasure) {
    if (
      segmentedLogsFilteredByType &&
      segmentedLogsFilteredByType.length > 0 &&
      dataVisForm.metric
    ) {
      const metric = dataVisForm.metric;
      const totalMetricPerSegment = [];
      const exerciseIdsAndTotalMetricDataForPieChart = []

      const exercise = dataVisForm.exerciseToMeasure;
      const workout = dataVisForm.workoutToMeasure;
      let exerciseIdsAndMetricHolder = []
      console.log('exerciseIdsAndMetricHolder',exerciseIdsAndMetricHolder)

      segmentedLogsFilteredByType.forEach((segment) => {
        const timePeriod = segment.timePeriod;
        const logs = segment.log;

        let metricTotal = 0;

        // if the time segment has workouts associated with it, then cycle through them and sum the various metrics
        if (Array.isArray(logs) && logs.length > 0) {
          logs.forEach((log) => {
          console.log('log',log)
            if (workout) {
              if (
                log.details &&
                log.details.exercise_sessions &&
                log.details.exercise_sessions.length > 0
              ) {
                if (metric === "Total Reps") {
                  log.details.exercise_sessions.forEach((exSession) => {
                    if (exSession["reps_completed"]) {
                      metricTotal += exSession["reps_completed"];
                    }
                  });
                } else if (metric === "Total Sets") {
                  log.details.exercise_sessions.forEach((exSession) => {
                    if (exSession["sets_completed"]) {
                      metricTotal += exSession["sets_completed"];
                    }
                  });
                } else if (metric === "Total Time Under Tension") {
                  log.details.exercise_sessions.forEach((exSession) => {
                    if (exSession["set_timer"]) {
                      metricTotal += exSession["set_timer"];
                    }
                  });
                } else if (metric === "Total Volume") {
                  log.details.exercise_sessions.forEach((exSession) => {
                    if (
                      exSession["reps_completed"] &&
                      exSession["weight_used"]
                    ) {
                      metricTotal +=
                        exSession["reps_completed"] * exSession["weight_used"];
                    }
                  });
                }
              }
            } else if (exercise) {
              if (log && log.length > 0) {
                if (metric === "Total Reps") {
                  metricTotal += log[0].reps_completed;
                    // debugger;
                  const existingExerciseId = exerciseIdsAndMetricHolder.filter(
                    (item) => {
                        console.log('item',item, "log[0].exercise_id", log[0].exercise_id )
                       return item.exerciseId === log[0].exercise_id

                    } 
                  )
console.log('existingExerciseId',existingExerciseId)
                    if (existingExerciseId.length > 0) {
                        console.log('triggered',)
                         existingExerciseId[0].metricTotal += log[0].reps_completed

                    } else {

                        const newExerciseId = {
                            exerciseId: log[0].exercise_id,
                            exerciseName: log[0].exercise_name,
                            metricTotal: log[0].reps_completed
                        }
                        console.log('newExerciseId',newExerciseId)
                        exerciseIdsAndMetricHolder.push(newExerciseId)
                    }
                } else if (metric === "Total Sets") {
                  metricTotal += log[0].sets_completed;
                } else if (metric === "Total Time Under Tension") {
                  metricTotal += log[0].set_timer;
                } else if (metric === "Total Volume") {
                  metricTotal += log[0].reps_completed * log[0].weight_used;
                }
              }
            }
            exerciseIdsAndTotalMetricDataForPieChart.push(exerciseIdsAndMetricHolder)
          });
        }

        totalMetricPerSegment.push({
          timePeriod,
          totalMetric: metricTotal,
          metric: metric,
        });
      });
console.log('exerciseIdsAndTotalMetricDataForPieChart',exerciseIdsAndTotalMetricDataForPieChart)
      setDataForWorkoutOrExerciseBarChart(totalMetricPerSegment);
      setDataForMuscleGroupPieChart(exerciseIdsAndTotalMetricDataForPieChart)
    }
    //   } else if (dataVisForm.exerciseToMeasure) {

    //   }
  }, [segmentedLogsFilteredByType, dataVisForm]);

//   console.log("dataForWorkoutOrExerciseBarChart", dataForWorkoutOrExerciseBarChart);

  const workoutOrExerciseBarChartData = dataForWorkoutOrExerciseBarChart &&
    dataForWorkoutOrExerciseBarChart.length > 0 && {
      labels: dataForWorkoutOrExerciseBarChart.map((segment) => segment.timePeriod),
      datasets: [
        {
          label: dataForWorkoutOrExerciseBarChart.map((segment) => segment.metric)[0],
          data: dataForWorkoutOrExerciseBarChart.map((segment) => segment.totalMetric),
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

      {workoutOrExerciseBarChartData && (
        <div style={{ width: "75vw", height: "75vh" }}>
          <Bar data={workoutOrExerciseBarChartData} />
        </div>
      )}
    </div>
  );
};

export default DataVisualisation;
