import { MDBBtn } from "mdb-react-ui-kit";
import React from "react";
import { useNavigate } from "react-router-dom";
import {logOut} from "../../API/Authentication/Authentication"

const LogOut = () => {
const navigate = useNavigate()

const signOut = async () => {
    await logOut()
    navigate("/GettingStarted")
}

  return (
    <div>
      <MDBBtn className="me-1" color="danger" onClick={signOut}>
        Log Out
      </MDBBtn>
    </div>
  );
};

export default LogOut;
