import React, { useState, useEffect, useContext } from "react";
import "../../CSS/Workout.css";
import { parseJwt } from "../../API/Authentication/parseJwt";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { createWorkout } from "../../API/Workout/Workout";
import { addWorkoutToRoutine, getAllRoutines } from "../../API/Routine/Routine";
import { ToastContainer, toast } from "react-toastify";
import { IntroJsContext } from "../../Context/IntroJsContext";
import { Steps } from "intro.js-react";

const CreateWorkout = ({
  setWorkoutToggle,
  workoutToggle,
  routineID,
  setWorkoutCreated,
  dayOfWeek,
  setDayOfWeek,
  setLogOfRoutineDaysOfWeek,
}) => {
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const userID = decodedToken.sub;
    setFormInput((prevState) => ({ ...prevState, user_id: userID }));
  }, [workoutToggle]);

  const [formInput, setFormInput] = useState({
    user_id: "",
    name: "",
  });

  const [createdWorkout, setCreatedWorkout] = useState([]);
  const [order, setOrder] = useState(0);
  const [workoutDay, setWorkoutDay] = useState("");
  const [workoutDayIndex, setWorkoutDayIndex] = useState(false);
  const [allRoutines, setAllRoutines] = useState([]);

  const {  steps, stepsEnabled, initialStep, onExit, setInitialStep, setStepsEnabled} = useContext(IntroJsContext)


  useEffect(() => {
    getAllRoutines()
      .then((data) => {
        setAllRoutines(data);
      })
      .catch((err) => {
        console.log("getAllRoutines API Call Failed", err);
      });
  }, []);

  let currentRoutine;
  if (allRoutines && allRoutines.length > 0) {
    currentRoutine = allRoutines.filter(
      (routines) => routines.id === routineID
    )[0];
  }

  const daysOfWeekArray = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const [updatedDays, setUpdatedDays] = useState([]);

  useEffect(() => {
    if (workoutDayIndex !== false) {
      toggleDaysOfWeekBoolean(workoutDayIndex);
    }
  }, [workoutDayIndex]);

  const toggleDaysOfWeekBoolean = (workoutIndex) => {
    const updatedDaysOfWeek = dayOfWeek.map((day) => {
      if (day.value === workoutIndex) {
        return {
          ...day,
          [daysOfWeekArray[workoutIndex]]: !day[daysOfWeekArray[workoutIndex]], // toggles the boolean
        };
      }
      return day;
    });

    setDayOfWeek(updatedDaysOfWeek);
    setUpdatedDays(updatedDaysOfWeek);
  };

  useEffect(() => {
    setLogOfRoutineDaysOfWeek({
      routineID: routineID,
      daysOfWeek: updatedDays,
    });
  }, [updatedDays]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = await createWorkout(formInput);
      setCreatedWorkout(data);

      const dayNameToIndex = {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6,
      };

      const lowercaseDay = workoutDay.toLowerCase();
      if (dayNameToIndex.hasOwnProperty(lowercaseDay)) {
        setWorkoutDayIndex(dayNameToIndex[lowercaseDay]);
      }

      toast.success(
        "Workout Created! Don't forget to click on Create Workout Schedule below when you've created all your workouts.",
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setFormInput({ user_id: "", name: "" });
      setOrder((prevOrder) => (prevOrder += 1));
      setWorkoutToggle((prevState) => !prevState);
      if (initialStep === 6) {
        setTimeout(() => {
          setStepsEnabled(false); 
          setInitialStep(7)
          setStepsEnabled(true)
        }, 1000)
      }
    }
  };

  useEffect(() => {
    if (createdWorkout.id) {
      addWorkoutToRoutine(routineID, {
        workout_id: createdWorkout.id,
        order: order,
        day: [workoutDay],
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
    <div id="createWorkoutFormForTutorial">
      <h2>Create Workout</h2>
      <div className="inputFormContainer">
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

          <div className="hidden">
            <MDBInput
              className="mb-4"
              type="text"
              label="Workout Order"
              value={order}
              name="order"
              onChange={(e) => setOrder(e.target.value)}
              contrast
            />
          </div>
          {currentRoutine && (
            <div className={currentRoutine.frequency ? "hidden" : null}>
              <select
                className="form-control contrast-dropdown"
                value={workoutDay}
                name="day"
                onChange={(e) => setWorkoutDay(e.target.value)}
              >
                {daysOfWeekArray.map((day, i) => {
                  const newDay = day.charAt(0).toUpperCase() + day.slice(1);
                  return (
                    <option
                      key={i}
                      value={newDay}
                      className={
                        workoutDay === newDay ? "select-selected-option" : ""
                      }
                    >
                      {newDay}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          <MDBBtn type="submit" className="mb-4" block>
            Create Workout
          </MDBBtn>
        </form>
        <ToastContainer />
      </div>

      <Steps
      enabled={stepsEnabled}
      steps={steps}
      initialStep={initialStep}
      onExit={onExit}
    />

    </div>
  );
};

export default CreateWorkout;
