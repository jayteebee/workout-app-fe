import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import { MDBBtn } from "mdb-react-ui-kit";

const DataVisualisation = ({sortedSessionLogs}) => {
  const [fromDate, setFromDate] = useState(new Date());
  console.log("fromDate", fromDate);
  const [untilDate, setUntilDate] = useState(new Date());
  console.log("untilDate", untilDate);

  const [dataVisForm, setDataVisForm] = useState({
    startDate: "",
    endDate: "",
    frequency: ""
  });
  console.log("dataVisForm", dataVisForm);

console.log('sortedSessionLogs',sortedSessionLogs)

  useEffect(() => {
    registerLocale("en-GB", enGB);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  // array for the drop down enabling the user to change the time segments they can see on the chart
  const dataViewFrequency = ["Week", "Month", "Quarter", "Year"]

  return (
    <div>
      <h2> Data Vis.</h2>

      <form onSubmit={handleFormSubmit}>
      <div style={{border: "2px solid red" }}>
        <h3>Start / End Date</h3>
        <DatePicker
          selected={fromDate}
          onChange={(date) => {
            setDataVisForm((prevForm) => ({
              ...prevForm,
              startDate: date,
            }));
            setFromDate(date);
          }}
        />

        <DatePicker
          selected={untilDate}
          onChange={(date) => {
            setDataVisForm((prevForm) => ({
              ...prevForm,
              endDate: date,
            }));
            setUntilDate(date);
          }}
        />
        </div>

        <div style={{border: "2px solid blue"}}>
        <h3>Frequency</h3>
        <select onChange={(e) => {
            setDataVisForm((prevForm) => ({
                ...prevForm,
                frequency: e.target.value
            }))
        }}>
          {dataViewFrequency.map((freq) => (
            <option
            value={freq}
            key={`key:${freq}`}
            >
                {freq}
            </option>
          ))}
        </select>
        
        </div>

        <MDBBtn type="submit">Submit!</MDBBtn>
      </form>
    </div>
  );
};

export default DataVisualisation;
