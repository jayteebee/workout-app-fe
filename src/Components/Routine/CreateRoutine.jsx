import React, { useEffect, useState } from "react";
import { parseJwt } from "../../API/Authentication/parseJwt";
import { MDBInput, MDBBtn, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from "mdb-react-ui-kit";
import { createRoutine } from "../../API/Routine/Routine";
import { ToastContainer, toast } from "react-toastify";


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
  };

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const frequencyDropdownOptions = [1,2,3,4,5,6,7]

  return (
    <div>
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
        />

        </div>
        <MDBBtn type="submit" className="mb-4" block>
          Create Routine
        </MDBBtn>
      </form>
      <ToastContainer />

    </div>
  );
};

export default CreateRoutine;



// <select
// // onChange={handleChange}
// >
//         {frequencyDropdownOptions.map((freq) => (
//           <option
//            value={formInput.frequency}
//            name="frequency"
// onChange={handleChange}

//            >{freq}</option>
//         ))}
//  </select>