import React, { useEffect, useState } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { updateUser } from "../API/User/User";
import { parseJwt } from "../API/Authentication/parseJwt";

const Profile = () => {
  const [formInput, setFormInput] = useState({
    name: "",
    height: "",
    weight: "",
  });
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const userID = decodedToken.sub;
    setUserID(userID);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(userID, formInput);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setFormInput({
        name: "",
        height: "",
        weight: "",
      });
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
          label="Name"
          value={formInput.name}
          name="name"
          onChange={handleChange}
          contrast
        />
        <MDBInput
          className="mb-4"
          type="text"
          label="Height"
          value={formInput.height}
          name="height"
          onChange={handleChange}
          contrast
        />

        <MDBInput
          className="mb-4"
          type="text"
          label="Weight"
          value={formInput.weight}
          name="weight"
          onChange={handleChange}
          contrast
        />
        <MDBBtn type="submit" className="mb-4" block>
          Update Info
        </MDBBtn>
      </form>
    </div>
  );
};

export default Profile;
