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

const WorkoutsForm = props => {
  return (
    <FormGroup>
      <Card>
        <CardBody>
          <CardTitle>
            <CustomInput placeholder="group" />
          </CardTitle>
          <CardSubtitle>
            <CustomInput inline name="excercise" placeholder="excercise" />
            <CustomInput inline name="reps" placeholder="reps" />
            <CustomInput inline name="sets" placeholder="sets" />
          </CardSubtitle>
          <Button>Add Excercise</Button>
        </CardBody>
      </Card>
    </FormGroup>
  );
};

export default WorkoutsForm;
