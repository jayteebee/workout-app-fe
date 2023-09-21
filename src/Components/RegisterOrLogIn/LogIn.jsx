import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../API/Authentication/Authentication";

import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
} from "mdb-react-ui-kit";

const LogIn = ({ setShowRegister, setLoggedIn }) => {
  const [formInput, setFormInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(formInput);
      setLoggedIn(true);
    } catch (err) {
      console.error("Error Logging In: ", err);
    } finally {
      setFormInput({ email: "", password: "" });
    }
    setShowRegister(true);
    navigate("/");
  };

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const showRegister = (e) => {
    e.preventDefault();
    setShowRegister(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <MDBInput
          className="mb-4"
          type="email"
          label="Email address"
          value={formInput.email}
          name="email"
          onChange={handleChange}
          contrast
        />
        <MDBInput
          className="mb-4"
          type="password"
          label="Password"
          value={formInput.password}
          name="password"
          onChange={handleChange}
          contrast
        />

        <MDBRow className="mb-4">
          <MDBCol className="d-flex justify-content-center">
            <MDBCheckbox label="Remember me" defaultChecked />
          </MDBCol>
          <MDBCol>
            <a href="#!">Forgot password?</a>
          </MDBCol>
        </MDBRow>

        <MDBBtn type="submit" className="mb-4" block>
          Sign in
        </MDBBtn>

        <div className="text-center">
          <p>
            Not a member?{" "}
            <a href="#!" onClick={showRegister}>
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
