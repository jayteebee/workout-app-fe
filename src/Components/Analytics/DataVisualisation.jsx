import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import { MDBBtn } from "mdb-react-ui-kit";

const DataVisualisation = () => {
  const [fromDate, setFromDate] = useState(new Date());
  console.log("fromDate", fromDate);
  const [untilDate, setUntilDate] = useState(new Date());
  console.log("untilDate", untilDate);

  const [dataVisForm, setDataVisForm] = useState({
    startDate: "",
    endDate: "",
  });
  console.log("dataVisForm", dataVisForm);

  useEffect(() => {
    registerLocale("en-GB", enGB);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div>
      <h2> Data Vis.</h2>

      <form onSubmit={handleFormSubmit}>
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

        <MDBBtn type="submit">Submit!</MDBBtn>
      </form>
    </div>
  );
};

export default DataVisualisation;
