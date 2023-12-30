import React, { useContext, useEffect, useState } from "react";
import { parseJwt } from "../../API/Authentication/parseJwt";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { createRoutine } from "../../API/Routine/Routine";
import { ToastContainer, toast } from "react-toastify";
import { Steps } from "intro.js-react";
import { IntroJsContext } from "../../Context/IntroJsContext";


const CreateRoutine = ({ routineToggle, setRoutineToggle, setCreateRoutineToggle, custom, weekly,}) => {

const {  steps, stepsEnabled, initialStep, onExit, setInitialStep, setStepsEnabled} = useContext(IntroJsContext)

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
    toast.success("Routine Created!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  setInitialStep(4); 
  };


  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name
    if (name === "frequency") {
      if (/^\d*$/.test(value)) { // if the value given is a number, then proceed
        setFormInput({
          ...formInput,
          [name]: value,
        });
        e.target.setCustomValidity(''); // clear any previous custom validation messages
      } else {
        e.target.setCustomValidity('Please enter only numbers.'); // set a custom validation message
      }
      e.target.reportValidity(); // display the custom validation message
    } else {
      setFormInput({
        ...formInput,
        [name]: value,
      });
    }
  };

  const frequencyDropdownOptions = [1,2,3,4,5,6,7]

  return (
    <div className="createRoutineFormContainer" id="createRoutineTutorial">
    <h2>Create Routine</h2>
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
        <div className={weekly ? "hidden" : null} style={{marginBottom: "10vh"}}>
        
        <MDBInput
        className="mb-4"
        type="text"
        label="Frequency: Every 1,2,3... Days"
        value={formInput.frequency}
        name="frequency"
        onChange={handleChange}
        contrast
        pattern="\d*"
        />

        </div>
        <MDBBtn type="submit" className="mb-4" block>
          Create Routine
        </MDBBtn>
      </form>
      <ToastContainer />

      <Steps
      enabled={stepsEnabled}
      steps={steps}
      initialStep={initialStep}
      onExit={onExit}
    />
    </div>
  );
};

export default CreateRoutine;

