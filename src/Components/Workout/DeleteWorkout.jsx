import React, {useEffect} from 'react'
import { deleteWorkoutByID } from '../../API/Workout/Workout'

const DeleteWorkout = ({workoutToDelete, setWorkoutToDelete, setDeleteToggle }) => {

    useEffect(() => {
        deleteWorkoutByID(workoutToDelete)
        .then(() => {setWorkoutToDelete(null)
        })
        .catch((err) => console.error(err))
        setDeleteToggle((prevState) => !prevState)
    }, [workoutToDelete, setWorkoutToDelete ])

  return (
    <div>
    
    </div>
  )
}

export default DeleteWorkout