import React, { useEffect, useState } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { getUserById, updateUser } from "../API/User/User";
import { parseJwt } from "../API/Authentication/parseJwt";
import LogOut from "../Components/LogOut/LogOut";
import BackButton from "../Components/Navigation/BackButton";
import "../CSS/Profile.css"

const Profile = ({loggedIn}) => {
  const [formInput, setFormInput] = useState({
    name: "",
    height: "",
    weight: "",
  });
  const [userID, setUserID] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [userToggle, setUserToggle] = useState(false);
  const [editDetailsForm, setEditDetailsForm] = useState(false)

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const userID = decodedToken.sub;
    setUserID(userID);
    setUserToggle((prevState) => !prevState);
  }, [loggedIn]);

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
      setEditDetailsForm(false)
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
    if (userID) {
      getUserById(userID)
      .then((data) => setUserDetails(data))
      .catch((err) => {
        console.log("getUserById API Call Failed: ", err);
      });
    }
  }, [userToggle]);

const editDetails = () => {
  setEditDetailsForm(prevState => !prevState)
}

  return (
    <div className="grid-container">
    <h3 className="pageHeader profile">Profile</h3>

    <MDBBtn onClick={editDetails} className="editDetailsCondRenderButton" >Edit Details</MDBBtn>

      <form onSubmit={handleSubmit} className={editDetailsForm ? "formContainer profile" : "hidden"}>
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
          label="Height (cm)"
          value={formInput.height}
          name="height"
          onChange={handleChange}
          contrast
        />

        <MDBInput
          className="mb-4"
          type="text"
          label="Weight (kg)"
          value={formInput.weight}
          name="weight"
          onChange={handleChange}
          contrast
        />
        <MDBBtn type="submit" className="mb-4" block>
          Update Info
        </MDBBtn>
      </form>

      <div className={editDetailsForm ? "hidden" :"userDetails" } >
     
      <div className="tableContainer">
      <div className="tableWrapper">
      <table className="customTable">
    <thead>
    <tr>
      <th>Name:</th>
      <th>Height:</th>
      <th>Weight:</th>
      <th>Email:</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>{userDetails.name}</td>
      <td>{userDetails.height} cm</td>
      <td>{userDetails.weight} lbs</td>
      <td>{userDetails.email}</td>
      </tr>
      </tbody>
      </table>
      </div>
      </div>

      </div>

      <div className="logOut">
        <LogOut />
      </div>

    </div>
  );
};

export default Profile;
