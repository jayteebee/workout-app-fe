import React from 'react'
import WorkoutExerciseFilter from './WorkoutExerciseFilter'
import WorkoutNameFilter from './WorkoutNameFilter'
import WorkoutTimeFilter from './WorkoutTimeFilter'

const WorkoutLogsFilter = () => {
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