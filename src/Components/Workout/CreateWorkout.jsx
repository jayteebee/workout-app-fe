import React, { useState, useEffect } from "react";
import { parseJwt } from "../../API/Authentication/parseJwt";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { createWorkout } from "../../API/Workout/Workout";

const CreateWorkout = ({setWorkoutToggle, workoutToggle}) => {
  const [formInput, setFormInput] = useState({ user_id: "", name: "" });

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const userID = decodedToken.sub;
    setFormInput((prevState) => ({ ...prevState, user_id: userID }));
  }, [workoutToggle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createWorkout(formInput);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setFormInput({ user_id: "", name: "" });
      setWorkoutToggle((prevState) => !prevState);
    }
  };

  const handlechange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <MDBInput
          className="mb-4"
          type="text"
          label="Workout Name"
          value={formInput.name}
          name="name"
          onChange={handlechange}
        />

        <MDBBtn type="submit" className="mb-4" block>
          Create Workout
        </MDBBtn>
      </form>
    </div>
  );
};

export default CreateWorkout;
