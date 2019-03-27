import React from 'react';
import { CustomInput } from 'reactstrap';

// field input for excercises for each group (muscle/day/week) for workout/program
// to get to excercise: workouts[0].exercises[0].excercise
const WorkoutsExcercise = props => {
  return props.workouts[props.idx].excercises.map((val, excIdx) => {
    return (
      <div key={excIdx}>
        <CustomInput
          type="text"
          inline
          name={`excercise`}
          className="excercise"
          // id={exId}
          data-id={excIdx}
          placeholder="excercise"
        />
        <CustomInput
          type="text"
          inline
          name="reps"
          className="reps"
          // id={rId}
          data-id={excIdx}
          placeholder="reps"
        />
        <CustomInput
          type="text"
          inline
          name="sets"
          className="sets"
          // id={sId}
          data-id={excIdx}
          placeholder="sets"
        />
        <br />
      </div>
    );
  });
};

export default WorkoutsExcercise;
