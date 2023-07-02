import React, {useEffect} from 'react'
import { deleteWorkoutByID } from '../../API/Workout/Workout'

const DeleteWorkout = ({workoutToDelete, setWorkoutToDelete, setDeleteToggle }) => {

    useEffect(() => {
        console.log(workoutToDelete)
        deleteWorkoutByID(workoutToDelete)
        .then(() => {
            setWorkoutToDelete(null)
            setDeleteToggle((prevState) => !prevState)
        })
        .catch((err) => console.log("ERROR IN: deleteWorkoutByID API CALL",err))
    
    }, [workoutToDelete, setDeleteToggle ])

  return (
    <div>
    
    </div>
  )
}

export default DeleteWorkout