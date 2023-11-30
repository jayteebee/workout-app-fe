import React, { useEffect, useState } from 'react'
import { getAllSessionLogs } from '../API/SessionLogs/SessionLogs'

const Analytics = () => {

const [allSessionLogs, setAllSessionLogs] = useState()
console.log('allSessionLogs',allSessionLogs)

useEffect(() => {
  getAllSessionLogs()
  .then((data) => setAllSessionLogs(data))
  .catch((err) => console.log("Error Fetching All Session Logs", err))
}, [])

  return (
    <div>Analytics</div>
  )
}

export default Analytics