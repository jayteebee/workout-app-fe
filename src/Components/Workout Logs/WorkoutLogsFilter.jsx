import React from 'react'
import WorkoutExerciseFilter from './WorkoutExerciseFilter'
import WorkoutNameFilter from './WorkoutNameFilter'
import WorkoutTimeFilter from './WorkoutTimeFilter'

const WorkoutLogsFilter = ({allExercises, sortedSessionLogs, allWorkouts  }) => {

  return (
    <div>
    <h3>--- Filter By ---</h3>
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