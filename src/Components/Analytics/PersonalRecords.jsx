import React, { useState, useEffect } from 'react';

const PersonalRecords = ({ sortedSessionLogs }) => {
    const [arrayOfExerciseObjects, setArrayOfExerciseObjects] = useState([]);
    console.log('arrayOfExerciseObjects',arrayOfExerciseObjects)
    useEffect(() => {
        let exerciseIds = new Set();

        sortedSessionLogs && sortedSessionLogs.length > 0 && 
        sortedSessionLogs.forEach((log) => {
            const exerciseSession = log.details.exercise_sessions;

            exerciseSession.forEach((exercise) => {
                exerciseIds.add(exercise.exercise_id);
            });
        });

        const newExerciseObjects = [];

        exerciseIds.forEach((id) => {
            const matchingExercise = sortedSessionLogs.find((log) =>
                log.details.exercise_sessions.some((exercise) => exercise.exercise_id === id)
            );

            if (matchingExercise) {
                const exercise = matchingExercise.details.exercise_sessions.find(
                    (ex) => ex.exercise_id === id
                );

                const newExerciseObject = {
                    exerciseName: exercise.exercise_name,
                    exerciseId: exercise.exercise_id,
                    oneRepMax: 0,
                    highestVolumeSingleSet: 0,
                    strongestTimeUnderTension: 0,
                    estimatedOneRepMax: 0,
                };

                newExerciseObjects.push(newExerciseObject);
            }
        });

        // Update the state after the loop finishes
        setArrayOfExerciseObjects((prevState) => [...prevState, ...newExerciseObjects]);
    }, [sortedSessionLogs]);

    return <div>PersonalRecords</div>;
};

export default PersonalRecords;
