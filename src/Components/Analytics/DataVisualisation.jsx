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
