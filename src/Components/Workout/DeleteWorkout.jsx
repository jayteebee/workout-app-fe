import React, {useEffect} from 'react'
import { deleteWorkoutByID } from '../../API/Workout/Workout'

const DeleteWorkout = ({workoutToDelete, setWorkoutToDelete, setWorkoutToggle }) => {

    useEffect(() => {
        deleteWorkoutByID(workoutToDelete)
        .then(() => {setWorkoutToDelete(null)
        })
        .catch((err) => console.error(err))
        setWorkoutToggle((prevState) => !prevState)
    }, [workoutToDelete, setWorkoutToDelete ])

  return (
    <div></div>
  )
}

export default DeleteWorkout