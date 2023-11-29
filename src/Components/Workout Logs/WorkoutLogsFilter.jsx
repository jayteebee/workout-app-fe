import { MDBBtn } from "mdb-react-ui-kit";
import React from "react";
import WorkoutExerciseFilter from "./WorkoutExerciseFilter";
import WorkoutNameFilter from "./WorkoutNameFilter";
import WorkoutTimeFilter from "./WorkoutTimeFilter";

const WorkoutLogsFilter = ({
  allExercises,
  sortedSessionLogs,
  allWorkouts,
  setSessionLogsByChosenName,
  setSessionLogsByChosenExercise,
  setSessionLogsByChosenDate,
  setActiveFilter,
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        marginBottom: "10vh",
      }}
    >
      <WorkoutNameFilter
        sortedSessionLogs={sortedSessionLogs}
        allWorkouts={allWorkouts}
        setSessionLogsByChosenName={setSessionLogsByChosenName}
        setSessionLogsByChosenExercise={setSessionLogsByChosenExercise}
        setSessionLogsByChosenDate={setSessionLogsByChosenDate}
      />

      <WorkoutExerciseFilter
        sortedSessionLogs={sortedSessionLogs}
        allExercises={allExercises}
        setSessionLogsByChosenExercise={setSessionLogsByChosenExercise}
        setSessionLogsByChosenName={setSessionLogsByChosenName}
        setSessionLogsByChosenDate={setSessionLogsByChosenDate}
      />
      <WorkoutTimeFilter
        sortedSessionLogs={sortedSessionLogs}
        setSessionLogsByChosenDate={setSessionLogsByChosenDate}
        setSessionLogsByChosenName={setSessionLogsByChosenName}
        setSessionLogsByChosenExercise={setSessionLogsByChosenExercise}
      />
    </div>
  );
};

export default WorkoutLogsFilter;
