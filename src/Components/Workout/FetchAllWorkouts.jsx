import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllWorkouts } from '../../API/Workout/Workout'
import DeleteWorkout from './DeleteWorkout'
import EditWorkout from './EditWorkout'
import FetchExercisesInWorkout from './FetchExercisesInWorkout'

const FetchAllWorkouts = ({workoutToggle}) => {
    const navigate = useNavigate()

    const [allWorkouts, setAllWorkouts] = useState([])
    const [selectedExerciseID, setSelectedExerciseID] = useState(null)
    // const [workoutToEdit, setWorkoutToEdit] = useState(null)
    // const [editToggle, setEditToggle] = useState(false)
    // const [workoutToDelete, setWorkoutToDelete] = useState(null)
    // const [deleteToggle, setDeleteToggle] = useState(null)
    const [showExerciseCreation, setShowExerciseCreation] = useState(false)
    

    useEffect(() => {
        getAllWorkouts()
        .then((data) => {
            setAllWorkouts(data);
        })
        .catch((err) => {console.log("getAllWorkouts API Call Failed",err)})
    },[workoutToggle, /*editToggle, deleteToggle */ ] )

    const showExerciseCreationPage = (workoutId) => {
        setShowExerciseCreation(true)
    }

    useEffect(() => {
        if (showExerciseCreation) {
            navigate("/CreateExercise")
        }
    }, [showExerciseCreation, navigate])

  return (
    <div>
    {allWorkouts.map((workout) => (
        <div key={workout.id}> 
        <button onClick={() => setSelectedExerciseID(workout.id)}>{workout.name}</button>
        {/*<button onClick={() => setWorkoutToEdit(workout.id)}>Change Name</button>*/}
        {/*<button onClick={() => setWorkoutToDelete(workout.id)}>Delete</button>*/}
        <button onClick={() => showExerciseCreationPage(workout.id)}>Add Exercises To Workout</button>
        </div>
    ))}
{selectedExerciseID && <FetchExercisesInWorkout selectedExerciseID={selectedExerciseID} />}
    {/*{workoutToEdit && <EditWorkout workoutToEdit={workoutToEdit} editToggle={editToggle} setEditToggle={setEditToggle} setWorkoutToEdit={setWorkoutToEdit}/>}
{workoutToDelete && <DeleteWorkout workoutToDelete={workoutToDelete} setWorkoutToDelete={setWorkoutToDelete} setDeleteToggle={setDeleteToggle} />}*/}
    </div>
  )
}

export default FetchAllWorkouts


// move workout to edit and edit toggle states over to the Workout.jsx page
// render EditWorkout from the workout page
