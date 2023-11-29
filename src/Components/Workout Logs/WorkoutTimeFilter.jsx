import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const WorkoutTimeFilter = ({
  sortedSessionLogs,
  setSessionLogsByChosenDate,
  setSessionLogsByChosenExercise,
  setSessionLogsByChosenName,
}) => {
  const [chosenDate, setChosenDate] = useState(new Date());
  const [monthChosenByUser, setMonthChosenByUser] = useState("");
  const [filteredLogsByMonth, setFilteredLogsByMonth] = useState([]);

  useEffect(() => {
    if (chosenDate) {
      const dateToFormat = chosenDate;
      const monthName = dateToFormat.toLocaleString("default", {
        month: "long",
      });
      setMonthChosenByUser(monthName);
    }
  }, [chosenDate]);

  useEffect(() => {
    if (monthChosenByUser) {
      const filterLogsByMonth = sortedSessionLogs.filter((log) => {
        const date = log.details.date;
        const dateToCompare = new Date(date);
        const monthName = dateToCompare.toLocaleString("default", {
          month: "long",
        });

        return monthChosenByUser === monthName;
      });
      setFilteredLogsByMonth(filterLogsByMonth);
    }
  }, [monthChosenByUser]);

  useEffect(() => {
    setSessionLogsByChosenName(null);
    setSessionLogsByChosenExercise(null);
    setSessionLogsByChosenDate(filteredLogsByMonth);
  }, [filteredLogsByMonth]);

  return (
    <div>
      <DatePicker
        selected={chosenDate}
        onChange={(date) => {
          setChosenDate(date);
        }}
        dateFormat="MMMM/yyyy"
        showMonthYearPicker
        showFullMonthYearPicker
      />
    </div>
  );
};

export default WorkoutTimeFilter;
