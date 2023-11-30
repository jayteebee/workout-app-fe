import React, { useEffect, useState } from 'react'
import { getAllSessionLogs } from '../API/SessionLogs/SessionLogs'

const Analytics = () => {

const [allSessionLogs, setAllSessionLogs] = useState()
// console.log('allSessionLogs',allSessionLogs)

useEffect(() => {
  getAllSessionLogs()
  .then((data) => setAllSessionLogs(data))
  .catch((err) => console.log("Error Fetching All Session Logs", err))
}, [])

const sortedSessionLogs = allSessionLogs && allSessionLogs.length > 0 && allSessionLogs.sort(
  (a,b) => new Date(b.details.date) - new Date(a.details.date)
)
console.log('sortedSessionLogs',sortedSessionLogs)


  return (
    <div>Analytics</div>
  )
}

export default Analytics