import React from 'react'
import "../CSS/Routines.css"
import FetchAllRoutines from '../Components/Routine/FetchAllRoutines'
import FetchRoutineByID from '../Components/Routine/FetchRoutineByID'

const Routines = () => {
  return (
    <div>
   <h3>Routines</h3> 
   <div className='fetchAllRoutines'>
   <FetchAllRoutines />
   </div>
   <div>
   <FetchRoutineByID />
   </div>
    </div>
  )
}

export default Routines