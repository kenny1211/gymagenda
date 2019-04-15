// Form to create a single workout
// Will have title (i.e. muscle group, day one, week one etc.)
// One field for excercise, reps, sets (maybe add weight later)
// Then button to dynamically generate another excercise field
// ^^ every workout has a diff amount of excercises

import React from 'react';
import {
  FormGroup,
  CustomInput,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';
import WorkoutExcercise from './WorkoutsExcercise';

const WorkoutsForm = props => {
  return (
    <FormGroup key={props.key}>
      <Card>
        <CardBody>
          <CardTitle>
            <CustomInput
              type="text"
              name="group"
              className="group"
              data-id={props.idx}
              id={props.groupId}
              placeholder={`Workout #${props.idx + 1}`}
            />
          </CardTitle>
          <CardSubtitle>
            <WorkoutExcercise workouts={props.workouts} idx={props.idx} />
          </CardSubtitle>
          <Button onClick={props.addExcercise}>Add Excercise</Button>
        </CardBody>
      </Card>
    </FormGroup>
  );
};

export default WorkoutsForm;
