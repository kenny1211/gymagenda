import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  CustomInput,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap';
// import WorkoutsForm from './WorkoutsForm';
import WorkoutsExcercise from './WorkoutsExcercise';
import update from 'immutability-helper';

class WorkoutsNew extends Component {
  state = {
    program: '',
    workouts: [{ group: '', excercises: [{ excercise: 'Get To Me', reps: '', sets: '' }] }]
  };

  // workout fields are printed by a map over state
  // to add a new workout field:
  // create copy of previous state
  // add an empty version afterwards
  addWorkout = event => {
    this.setState(prevState => ({
      workouts: [
        ...prevState.workouts,
        { group: '', excercises: [{ excercise: 'one', reps: '', sets: '' }] }
      ]
    }));
  };

  // to add an excercise:
  // excercises must be added to the workout they belong to
  // for example workouts[0] or workouts[1]
  addExcercise = idx => {
    const newState = update(this.state, {
      workouts: { [idx]: { excercises: { $push: [{ excercise: 'one', reps: '', sets: '' }] } } }
    });

    console.log(newState);

    this.setState(newState);
  };

  // to get to the dynamic objects in the array we find where they are by their id
  // which is set to their index in the map which is also their index in state of the workouts array
  // for example: workouts[0][group]
  // to get to excercise: workouts[0].exercises[0].excercise
  handleChange = event => {
    let { name, value, dataset } = event.target;
    if (name === 'program') {
      this.setState({ [name]: value });
    } else {
      let workouts = [...this.state.workouts];
      workouts[dataset.id][name] = value;
      this.setState({ workouts }, () => console.log(this.state));
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    // prep object to be sent to API

    // make post request
  };

  render() {
    let { program, workouts } = this.state;
    return (
      <div style={{ textAlign: 'center' }} className="container col-5">
        <h1>Create Workout Program</h1>
        <Form onChange={this.handleChange} onSubmit={this.handleFormSubmit}>
          <FormGroup>
            <Label>Program Name</Label>
            <Input type="text" name="program" id="program" value={program} />
          </FormGroup>

          {/* WORKOUTS FORM BEGIN*/}
          {workouts.map((val, idx) => {
            let groupId = `group-${idx}`;
            return (
              <FormGroup key={idx}>
                <Card>
                  <CardBody>
                    <CardTitle>
                      <CustomInput
                        type="text"
                        name="group"
                        className="group"
                        data-id={idx}
                        id={groupId}
                        placeholder={`Workout #${idx + 1}`}
                      />
                    </CardTitle>
                    <CardSubtitle>
                      <WorkoutsExcercise workouts={workouts} idx={idx} />
                    </CardSubtitle>
                    <Button onClick={() => this.addExcercise(idx)}>Add Excercise</Button>
                  </CardBody>
                </Card>
              </FormGroup>
            );
          })}

          {/* WORKOUTS FORM END */}

          <Button onClick={this.addWorkout}>Add Workout</Button>
          <br />
          <br />
          <Button type="submit" onClick={this.handleFormSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default WorkoutsNew;
