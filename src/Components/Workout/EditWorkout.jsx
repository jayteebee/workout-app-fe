import React, { useState, useEffect } from "react";
import { parseJwt } from "../../API/Authentication/parseJwt";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { editWorkoutByID } from "../../API/Workout/Workout";

const EditWorkout = ({
  workoutToEdit,
  editToggle,
  setEditToggle,
  setWorkoutToEdit,
}) => {
  const [formInput, setFormInput] = useState({ user_id: "", name: "" });

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const userID = decodedToken.sub;
    setFormInput((prevState) => ({ ...prevState, user_id: userID }));
  }, [editToggle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editWorkoutByID(workoutToEdit, formInput);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setFormInput({ user_id: "", name: "" });
      setEditToggle((prevState) => !prevState);
      setWorkoutToEdit((prevState) => !prevState);
    }
  };

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="inputFormEditWorkout">
      <form onSubmit={handleSubmit} className="inputForm">
        <MDBInput
          className="mb-4"
          type="text"
          label="Edit Workout Name"
          value={formInput.name}
          name="name"
          onChange={handleChange}
          contrast
        />
        <MDBBtn type="submit" className="mb-4" block>
          Edit
        </MDBBtn>
      </form>
    </div>
  );
};

export default EditWorkout;
