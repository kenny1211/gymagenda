import React from 'react';
import { CustomInput } from 'reactstrap';

const WorkoutsExcercise = props => {
  return props.excercises.map((val, excIdx) => {
    return (
      <div key={excIdx}>
        <CustomInput
          type="text"
          inline
          name={`excercise`}
          className="excercise"
          // id={exId}
          // data-id={idx}
          placeholder="excercise"
        />
        <CustomInput
          type="text"
          inline
          name="reps"
          className="reps"
          // id={rId}
          // data-id={idx}
          placeholder="reps"
        />
        <CustomInput
          type="text"
          inline
          name="sets"
          className="sets"
          // id={sId}
          // data-id={idx}
          placeholder="sets"
        />
        <br />
      </div>
    );
  });
};

export default WorkoutsExcercise;
