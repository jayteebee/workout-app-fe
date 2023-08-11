import React, { useEffect, useState } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { getUserById, updateUser } from "../API/User/User";
import { parseJwt } from "../API/Authentication/parseJwt";

const Profile = () => {
  const [formInput, setFormInput] = useState({
    name: "",
    height: "",
    weight: "",
  });
  const [userID, setUserID] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [userToggle, setUserToggle] = useState(false);
  console.log("user deets", userDetails);
  console.log("form input: ", formInput);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const userID = decodedToken.sub;
    setUserID(userID);
    setUserToggle((prevState) => !prevState);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Input: ", formInput);

      const updatedFields = Object.fromEntries(
        Object.entries(formInput).filter(([key, value]) => value !== "")
      );

      setUserDetails((prevUserDetails) => ({
        ...prevUserDetails,
        ...updatedFields,
      }));

      await updateUser(userID, updatedFields);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setFormInput({
        name: "",
        height: "",
        weight: "",
      });
      setUserToggle((prevState) => !prevState);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevFormInput) => ({
      ...prevFormInput,
      [name]: value,
    }));
  };

  useEffect(() => {
    getUserById(userID)
      .then((data) => setUserDetails(data))
      .catch((err) => {
        console.log("getUserById API Call Failed: ", err);
      });
  }, [userToggle]);

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

      <div>
        <p>{userDetails.name}</p>
        <p>{userDetails.height} cm</p>
        <p>{userDetails.weight} lbs</p>
        <p>{userDetails.email}</p>
      </div>
    </div>
  );
};

export default Profile;
