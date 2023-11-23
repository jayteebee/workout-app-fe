import React from 'react'
import WorkoutExerciseFilter from './WorkoutExerciseFilter'
import WorkoutNameFilter from './WorkoutNameFilter'
import WorkoutTimeFilter from './WorkoutTimeFilter'

const WorkoutLogsFilter = ({allExercises, sortedSessionLogs, allWorkouts  }) => {

  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: "center", marginBottom: "10vh" }}>
    <WorkoutNameFilter
    sortedSessionLogs={sortedSessionLogs}
    allWorkouts={allWorkouts}
    />
    <WorkoutExerciseFilter
    sortedSessionLogs={sortedSessionLogs}
    allExercises={allExercises}
    />
    <WorkoutTimeFilter
    sortedSessionLogs={sortedSessionLogs}
    />
    </div>
  )
}

export default WorkoutLogsFilter