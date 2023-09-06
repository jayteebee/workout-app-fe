import React, { useEffect, useState } from "react";
import { parseJwt } from "../../API/Authentication/parseJwt";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { createRoutine } from "../../API/Routine/Routine";

const CreateRoutine = ({ routineToggle, setRoutineToggle, setCreateRoutineToggle, custom, weekly }) => {
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
  }, [routineToggle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRoutine(formInput);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setFormInput({
        name: "",
        frequency: "",
        user_id: ""
      });
      setRoutineToggle((prevState) => !prevState);
    setCreateRoutineToggle(prevState => !prevState)
    }
  };

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="formContainer">
        <MDBInput
          className="mb-4"
          type="text"
          label="Routine Name"
          value={formInput.name}
          name="name"
          onChange={handleChange}
          contrast
        />
        <div className={weekly ? "hidden" : null}>
        <MDBInput
          className="mb-4"
          type="text"
          label="Frequency"
          value={formInput.frequency}
          name="frequency"
          onChange={handleChange}
          contrast
        />
        </div>
        <MDBBtn type="submit" className="mb-4" block>
          Create Routine
        </MDBBtn>
      </form>
    </div>
  );
};

export default CreateRoutine;
