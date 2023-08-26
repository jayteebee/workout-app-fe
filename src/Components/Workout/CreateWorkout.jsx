import React, { useState, useEffect } from "react";
import "../../CSS/Workout.css";
import { parseJwt } from "../../API/Authentication/parseJwt";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { createWorkout } from "../../API/Workout/Workout";
import { addWorkoutToRoutine } from "../../API/Routine/Routine";

const CreateWorkout = ({
  setWorkoutToggle,
  workoutToggle,
  routineID,
  setWorkoutCreated,
  setToggleCreateWorkout
}) => {
  const [formInput, setFormInput] = useState({
    user_id: "",
    name: "",
    order: 0,
  });
  const [createdWorkout, setCreatedWorkout] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const userID = decodedToken.sub;
    setFormInput((prevState) => ({ ...prevState, user_id: userID }));
  }, [workoutToggle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = await createWorkout(formInput);
      setCreatedWorkout(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setFormInput({ user_id: "", name: "", order: 0 });
      setWorkoutToggle((prevState) => !prevState);
  setToggleCreateWorkout(prevState => !prevState)

    }
  };

  useEffect(() => {
    if (createdWorkout.id) {
      addWorkoutToRoutine(routineID, {
        workout_id: createdWorkout.id,
        order: formInput.order,
      });
      setWorkoutCreated((prevState) => !prevState);
      setCreatedWorkout([]);
    }
  }, [createdWorkout, formInput.order, routineID]);

  const handlechange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="inputForm">
        <MDBInput
          className="mb-4"
          type="text"
          label="Workout Name"
          value={formInput.name}
          name="name"
          onChange={handlechange}
          contrast
        />

        <MDBInput
          className="mb-4"
          type="text"
          label="Workout Order"
          value={formInput.order}
          name="order"
          onChange={handlechange}
          contrast
        />
        <MDBBtn type="submit" className="mb-4" block>
          Create Workout
        </MDBBtn>
      </form>
    </div>
  );
};

export default CreateWorkout;
