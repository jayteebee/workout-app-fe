import axiosInstance from "../AxiosInstances/axiosInstance";
import axiosInstanceWithToken from "../AxiosInstances/axiosInstanceWithToken";
import { parseJwt } from "./parseJwt";

// POST
// CREATE USER - Working!

export const createUser = async (userData) => {
  // console.log(userData);
  if (!userData) {
    return;
  } else {
    const response = await axiosInstance.post("/signup", { user: userData });
    if (response.headers.authorization) {
      window.localStorage.setItem("token", response.headers.authorization);
    }
    return response.data;
  }
};

//  console.log("CU: ", createUser())

// LOG IN - Working!

export const logIn = async (logInData) => {
  if (!logInData) {
    return "Please enter a valid username and password";
  } else {
    const response = await axiosInstance.post("/login", { user: logInData });
    if (response.headers.authorization) {
      window.localStorage.setItem("token", response.headers.authorization);
      console.log("User Logged In Successfully");
    }
    return response.data;
  }
};

// console.log("LI: ", logIn())

//   GET REQUESTS
//   CURRENT USER - WORKING!

export const currentUser = async () => {
  const token = window.localStorage.getItem("token");
  const response = await axiosInstanceWithToken.get("/current_user", {
    headers: {
      Authorization: token,
    },
  });
  const decodedToken = parseJwt(token);
  const userID = decodedToken.sub;
  return userID;
};

// console.log("Current User: ", currentUser())

// DELETE REQUESTS
// LOG OUT

export const logOut = async () => {
  const token = window.localStorage.getItem("token");
if (token) {
    try {
    const response = await axiosInstanceWithToken.delete(`/logout`);
    console.log("Successful Log Out");
    window.localStorage.removeItem("token");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
};

// console.log("LogOut : ", logOut())
