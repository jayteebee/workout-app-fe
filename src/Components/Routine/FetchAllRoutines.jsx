import React from 'react'
import { useState, useEffect } from 'react'
import { getAllRoutines } from '../../API/Routine/Routine'

const FetchAllRoutines = () => {

const [allRoutines, setAllRoutines] = useState([])
useEffect(() => {
    getAllRoutines()
    .then((data) => {
        setAllRoutines(data);
        console.log(allRoutines)
    })
    .catch((err) => {console.log("getAllRoutines API Call Failed",err)})
},[] )


  return (
    <div>
    
    </div>
  )
}

export default FetchAllRoutines