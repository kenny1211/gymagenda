import React from 'react';
import { CustomInput } from 'reactstrap';

// field input for excercises for each group (muscle/day/week) for workout/program
// to get to excercise: workouts[0].exercises[0].excercise
// remember each excercise lies within a workout, so to refer to an excercise data-id is used
const WorkoutsExcercise = props => {
  return props.workouts[props.idx].excercises.map((val, excIdx) => {
    return (
      <div key={excIdx}>
        <CustomInput
          type="text"
          inline
          name="excercise"
          className="excercise"
          // id={exId}
          data-id={excIdx}
          data-workoutsId={props.idx}
          placeholder="excercise"
          value={props.workouts[props.idx].excercises[excIdx].name}
        />
        <CustomInput
          type="text"
          inline
          name="reps"
          className="reps"
          // id={rId}
          data-id={excIdx}
          data-workoutsId={props.idx}
          placeholder="reps"
          value={props.workouts[props.idx].excercises[excIdx].name}
        />
        <CustomInput
          type="text"
          inline
          name="sets"
          className="sets"
          // id={sId}
          data-id={excIdx}
          data-workoutsId={props.idx}
          placeholder="sets"
          value={props.workouts[props.idx].excercises[excIdx].name}
        />
        <br />
      </div>
    );
  });
};

export default WorkoutsExcercise;
