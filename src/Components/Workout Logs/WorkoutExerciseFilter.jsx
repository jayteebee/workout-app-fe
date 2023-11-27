import { MDBBtn } from 'mdb-react-ui-kit'
import React from 'react'

const WorkoutExerciseFilter = ({sortedSessionLogs, allExercises }) => {
  console.log('sortedSessionLogs',sortedSessionLogs)
  console.log('allExercises',allExercises)

  const allExerciseNames = allExercises.map((exercise) => exercise.name)
  console.log('allExerciseNames',allExerciseNames)

  return (
    <div>
    <MDBBtn>Exercise In Workout</MDBBtn>
    </div>
  )
}

export default WorkoutExerciseFilter