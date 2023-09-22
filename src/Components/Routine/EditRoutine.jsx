import React, { useState, useEffect } from "react";
import { parseJwt } from "../../API/Authentication/parseJwt";
import {
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { editRoutineByID } from "../../API/Routine/Routine";

const EditRoutine = ({ eID, setEditToggle, setRoutineToEdit, editToggle, editingFrequencyRoutine }) => {
  const [formInput, setFormInput] = useState({
    name: "",
    frequency: "",
    user_id: "",
  });

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const userID = decodedToken.sub;
    setFormInput((prevState) => ({ ...prevState, user_id: userID }));
  }, [editToggle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editRoutineByID(eID, formInput);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setFormInput({name: "",
      frequency: "",
      user_id: ""});
      setRoutineToEdit((prevState) => !prevState);
      setEditToggle((prevState) => !prevState);
    }
  };

  const handlechange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="inputFormEditRoutine">
      <form onSubmit={handleSubmit} className="inputForm">
        <MDBInput
          className="mb-4"
          type="text"
          label="Edit Routine Name"
          value={formInput.name}
          name="name"
          onChange={handlechange}
          contrast
        />
        <div className={editingFrequencyRoutine ? "" : "hidden"}>
        <MDBInput
          className="mb-4"
          type="text"
          label="Edit Frequency"
          value={formInput.frequency}
          name="frequency"
          onChange={handlechange}
          contrast
        />
        </div>
        <MDBBtn type="submit" className="mb-4" block>
          Edit
        </MDBBtn>
      </form>
    </div>
  );
};

export default EditRoutine;
