import React from 'react'
import WorkoutExerciseFilter from './WorkoutExerciseFilter'
import WorkoutNameFilter from './WorkoutNameFilter'
import WorkoutTimeFilter from './WorkoutTimeFilter'

const WorkoutLogsFilter = ({allExercises, sortedSessionLogs, allWorkouts  }) => {
    console.log('allExercises, sortedSessionLogs, allWorkouts', allExercises, sortedSessionLogs, allWorkouts)
  return (
    <div>
    <h3>--- Filter By ---</h3>
    <WorkoutNameFilter />
    <WorkoutExerciseFilter />
    <WorkoutTimeFilter />
    </div>
  )
}

export default WorkoutLogsFilter