import axiosInstance from "../AxiosInstances/axiosInstance"

// POST 
// CREATE USER - Working!


export const createUser = async (userData = {
    email: "test@example.com",
    password: "password1"
}) => {
    console.log(userData)
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

export const logIn = async (logInData = {
    email: "test@example.com",
    password: "password1"
}) => {
    if (!logInData) {
      return "Please enter a valid username and password";
    } else {
      const response = await axiosInstance.post("/login", { user: logInData });
      if (response.headers.authorization) {
        window.localStorage.setItem("token", response.headers.authorization);
        window.localStorage.setItem("userID", response.data.data.id);
        console.log("User Logged In Successfully");
      }
      return response.data;
    }
  };

//   console.log("LI: ", logIn())


//   GET REQUESTS
// Current User

export const currentUser = async () => {
    const token = window.localStorage.getItem("token");
    const response = await axiosInstance.get("/current_user", {
      headers: {
        Authorization: token,
      },
    });
    const userID = window.localStorage.getItem("userID");
    console.log("USERID: ", userID);
    return userID;
  };

  console.log("Current User: ", currentUser())