import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getWorkoutsInRoutine } from '../../API/Routine/Routine'

const FetchWorkoutsInRoutine = ({rID}) => {
    const [workoutsInRoutine, setWorkoutsInRoutine] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        if(rID) {
        getWorkoutsInRoutine(rID)
        .then((data) => {
            setWorkoutsInRoutine(data)
            console.log(data)
        })
        .catch((err) => console.log("getWorkoutsInRoutine API Call Failed",err))
    }}, [rID])
    
const showWorkout = () => {
  navigate("/Workout")
}

  return (
    <div>
    {workoutsInRoutine.map((workouts) => (
        <div key={workouts.id}> 
        <button onClick={() => showWorkout()}>{workouts.workout.name}</button>
        
        </div>
    ))}
    </div>
  )
}

export default FetchWorkoutsInRoutine