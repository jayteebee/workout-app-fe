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

  const [datesSegmentedByChosenFrequency, setDatesSegmentedByChosenFrequency] =
    useState([]);
  console.log(
    "datesSegmentedByChosenFrequency",
    datesSegmentedByChosenFrequency
  );

  useEffect(() => {
    registerLocale("en-GB", enGB);
  }, []);

  useEffect(() => {
    if (dataVisForm.startDate && dataVisForm.endDate && dataVisForm.frequency) {
      const millisecondsInDay = 24 * 60 * 60 * 1000;
      const millisecondsInWeek = 7 * millisecondsInDay;

      const startDate = dataVisForm.startDate.getTime();
      const endDate = dataVisForm.endDate.getTime();
      const freq = dataVisForm.frequency;

      let arrayOfDates = [];
      if (freq === "Week") {
        // *** have to comment out date formatting for data transformation purposes. Reuse this later on
        // const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
        // const formatter = new Intl.DateTimeFormat('en-GB', options);

        for (let i = startDate; i <= endDate; i += millisecondsInWeek) {
            // *** same reason as above
            // const formattedDate = formatter.format(new Date(i));
            // arrayOfDates.push(formattedDate);
            arrayOfDates.push(new Date(i))
        }
      }
      setDatesSegmentedByChosenFrequency(arrayOfDates);
    }
  }, [dataVisForm]);

useEffect(() => {
    if (datesSegmentedByChosenFrequency && datesSegmentedByChosenFrequency.length > 0) {
        for (let i=0; i <datesSegmentedByChosenFrequency.length - 1; i++) {
            const currentDate = datesSegmentedByChosenFrequency[i]
            const nextDate = datesSegmentedByChosenFrequency[i+1]
            console.log('current',currentDate.getTime(), "next", nextDate.getTime())
        }
    }
}, [datesSegmentedByChosenFrequency])

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
