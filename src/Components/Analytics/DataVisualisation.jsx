import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import { MDBBtn } from "mdb-react-ui-kit";
import DataVisForm from "./DataVisForm";

const DataVisualisation = ({ sortedSessionLogs }) => {
  const [dataVisForm, setDataVisForm] = useState({
    startDate: "",
    endDate: "",
    frequency: "",
    workoutToMeasure: "",
    exerciseToMeasure: "",
    metric: "",
  });
  console.log("dataVisForm", dataVisForm);

useEffect(() => {
    if (dataVisForm.startDate && dataVisForm.endDate && dataVisForm.frequency) {
        const millisecondsInDay = 24 * 60 * 60 * 1000;
        const millisecondsInWeek = 7 * millisecondsInDay;

        const startDate = dataVisForm.startDate.getTime()
        const endDate = dataVisForm.endDate.getTime()
        const freq = dataVisForm.frequency
        console.log('',startDate, endDate)

        if (freq === "Week") {
            for (let i = startDate; i <= endDate; i += millisecondsInWeek) {
                console.log('yes!', new Date(i))
            }
        }

// console.log('startDate',startDate, "endDate",endDate )

    }
}, [dataVisForm])

  return (
    <div>
      <DataVisForm
        sortedSessionLogs={sortedSessionLogs}
        setDataVisForm={setDataVisForm}
      />
    </div>
  );
};

export default DataVisualisation;
