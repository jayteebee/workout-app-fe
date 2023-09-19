import React, { useEffect, useState } from 'react'
import { getAllSessionLogs } from '../API/SessionLogs/SessionLogs'

const Logs = () => {
const [sessionLogs, setSessionLogs] = useState([])
console.log("sessionLogs", sessionLogs)
  useEffect(() => {
    getAllSessionLogs()
    .then((data) => {
      setSessionLogs(data)
    })
    .catch((err) => console.log("Error with getAllSessionLogs API Call", err))
  }, [])


  return (
    <div>
    <h2>Logs</h2>

    </div>
  )
}

export default Logs