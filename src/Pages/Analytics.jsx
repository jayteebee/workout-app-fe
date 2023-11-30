import React, { useEffect, useState } from 'react'
import { getAllSessionLogs } from '../API/SessionLogs/SessionLogs'
import DatePicker, { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";

import "react-datepicker/dist/react-datepicker.css";

const Analytics = () => {

const [allSessionLogs, setAllSessionLogs] = useState()
// console.log('allSessionLogs',allSessionLogs)
const [startDate, setStartDate] = useState(new Date());
console.log('startDate',startDate)

const [chosenDate, setChosenDate] = useState({
  format: "",
  date: ""
});
console.log('chosenDate',chosenDate)

const [chosenFilter, setChosenFilter] = useState("")
console.log('chosenFilter',chosenFilter)

// register the en-GB locale for the date picker (prevents console error)
useEffect(() => {
  registerLocale("en-GB", enGB);
}, []);

useEffect(() => {
  getAllSessionLogs()
  .then((data) => setAllSessionLogs(data))
  .catch((err) => console.log("Error Fetching All Session Logs", err))
}, [])

const sortedSessionLogs = allSessionLogs && allSessionLogs.length > 0 && allSessionLogs.sort(
  (a,b) => new Date(b.details.date) - new Date(a.details.date)
)
console.log('sortedSessionLogs',sortedSessionLogs)

const [analytics, setAnalytics] = useState([])
console.log('analytics',analytics)

const filterToRender = {
  Week: (
    <div>
      <h2>Filter By Week</h2>
      <DatePicker
      selected={startDate}
      onChange={(date) => {
        setChosenDate({
          format: "Week",
          date: date
        })
        setStartDate(date)
      } 
    }
      dateFormat="I/R"
      locale="en-GB"
      showWeekNumbers
      showWeekPicker
      />
    </div>
  ),
  Month: (
    <div>
    <h2>Filter By Month</h2>
    <DatePicker
    selected={startDate}
    onChange={(date) => {
      setStartDate(date);
    }}
    dateFormat="MMMM yyyy" 
    showMonthYearPicker 
  />
    </div>
  ),
  Quarter: (
    <div>
    <h2>Filter By Quarter</h2>
    <DatePicker
    selected={startDate}
    onChange={(date) => {
      setStartDate(date);
    }}
    showQuarterYearPicker
    dateFormat="yyyy, QQQ"
    />
    </div>
  ),
  Year: (
    <div>
    <h2>Filter By Year</h2>
    <DatePicker
      selected={startDate}
      onChange={(date) => {
        setStartDate(date);
      }}
      dateFormat="yyyy" 
      showYearPicker 
    />
    </div>
  )
}

const renderDatePicker = () => {
  return filterToRender[chosenFilter] || null;
};

  return (
    <div>

<select
onChange={(e) => setChosenFilter(e.target.value)}
>
    <option value="Week">Week</option>
    <option value="Month">Month</option>
    <option value="Quarter">Quarter</option>
    <option value="Year">Year</option>
</select>

{renderDatePicker()}

    </div>
  )
}

export default Analytics