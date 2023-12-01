import React from "react";

const ExerciseMetricTotalsByChosenTimeFrame = ({ arrayOfExerciseObjects }) => {
  console.log("arrayOfExerciseObjects", arrayOfExerciseObjects);
  const table = arrayOfExerciseObjects.map((data, index) => (
    <div key={index} className="tableContainer individualLog">
      <div className="tableWrapper">
        <table className="customTable">
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Total Volume (kg)</th>
              <th>Total Weight (kg)</th>
              <th>Total Reps</th>
              <th>Total Sets</th>
              <th>Total Time Under Tension (s)</th>
            </tr>
          </thead>

          <tbody>
            <tr key={index}>
              <td>{data.exercise_name}</td>
              <td>{data.totalVolume}</td>
              <td>{data.totalWeight}</td>
              <td>{data.totalReps}</td>
              <td>{data.totalSets}</td>
              <td>{data.totalTimeUnderTension}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ));
  return (
    <div>
    <h2>Exercise Metric Totals</h2>
    {table}
    </div>
  ) 
};

export default ExerciseMetricTotalsByChosenTimeFrame;
