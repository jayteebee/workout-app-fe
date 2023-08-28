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
}) => {

  const [formInput, setFormInput] = useState({
    user_id: "",
    name: "",
  });
  console.log("** formInput: ", formInput)

  const [createdWorkout, setCreatedWorkout] = useState([]);
  console.log("** createdWorkout: ", createdWorkout)

  const [order, setOrder] = useState(0)

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
      setFormInput({ user_id: "", name: ""}); 
      setWorkoutToggle((prevState) => !prevState);
    }
  };


  useEffect(() => {
    if (createdWorkout.id) {
      addWorkoutToRoutine(routineID, {
        workout_id: createdWorkout.id,
        order: order,
      });
      setWorkoutCreated((prevState) => !prevState);
      setCreatedWorkout([]);
    }
  }, [createdWorkout, order, routineID]);


  const handleChange = (e) => {
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
          onChange={handleChange}
          contrast
        />

        <MDBInput
          className="mb-4"
          type="text"
          label="Workout Order"
          value={order}
          name="order"
          onChange={(e) => setOrder(e.target.value)}
          contrast
        />

      {/* 1) Create a new input field here that will accept
              the day of the week that workout will be done on.
          2) Add another line to the form input state object
              to accept dayOfWeek.
          3) Create a function to transform Mon-Sun to 0-6.

    */}

        <MDBBtn type="submit" className="mb-4" block>
          Create Workout
        </MDBBtn>
      </form>
    </div>
  );
};

export default CreateWorkout;
