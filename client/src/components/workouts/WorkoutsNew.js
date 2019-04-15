// component will house forms to create workouts, since workouts have different numbers of excercises, must be dynamic
// for now, nested state seems to be the most intuitive data model but gets complicated to set state
// use of immutability-helper to set state in deep nests

// **Currently all Components shown but in refactor they will be separated into WorkoutsExcercise and WorkoutsForm

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

//** FOR REFACTOR */
// import WorkoutsForm from './WorkoutsForm';

import update from 'immutability-helper';
import axios from 'axios';

class WorkoutsNew extends Component {
  state = {
    program: '',
    workouts: [
      {
        group: '',
        excercises: [{ excercise: 'This is Excercise', reps: 'This is Reps', sets: 'This is Sets' }]
      }
    ]
  };

  // workout fields are printed by a map over state
  // to add a new workout field:
  // create copy of previous state
  // add an empty version afterwards
  addWorkout = event => {
    this.setState(prevState => ({
      workouts: [
        ...prevState.workouts,
        { group: '', excercises: [{ excercise: 'new exc', reps: 'new reps', sets: 'new sets' }] }
      ]
    }));
  };

  // to add an excercise:
  // excercises must be added to the workout they belong to
  // for example workouts[0] or workouts[1]
  // use of immutability-helper here
  addExcercise = idx => {
    const newState = update(this.state, {
      workouts: {
        [idx]: {
          excercises: { $push: [{ excercise: 'new exc', reps: 'new reps', sets: 'new sets' }] }
        }
      }
    });

    console.log(newState);

    this.setState(newState);
  };

  // to get to the dynamic objects in the array we find where they are by their id
  // which is set to their index in the map which is also their index in state of the workouts array
  // for example: workouts[0][group]
  // to get to excercise: workouts[0].exercises[0].excercise
  handleChange = event => {
    // desctructure what we need off of the event
    let { name, value, dataset, id } = event.target;

    // since we are working with a nested state object, each level needs to be set differently
    if (name === 'program') {
      // program name will only be set once in the beginning
      this.setState({ [name]: value });
    } else if (name === 'group') {
      // each group will have a different name depending on it's index in workouts
      // i.e. workouts[0].group = 'Legs', workouts[1].group = 'Push', workouts[2].group = 'Pull'
      let workouts = [...this.state.workouts];
      workouts[dataset.id][name] = value;
      this.setState({ workouts }, () => console.log(this.state));
    } else {
      // the only state left to set will be excercises nested within workouts, with it's own dynamic input field
      // i.e. workouts[num].excercises[num].excercise = 'Squat'

      // POSSIBLE SOLUTION ONE*******************************************************
      // let workouts = [...this.state.workouts];

      // workouts[dataset.id].excercises[dataset.id][name] = value;

      // this.setState({ workouts }, () => console.log(this.state));
      // *****************************************************************************

      // POSSIBLE SOLUTION TWO********************************************************
      const newState = update(this.state, {
        workouts: {
          [id]: {
            excercises: { [dataset.id]: { [name]: { $set: value } } }
          }
        }
      });

      console.log(newState);
      this.setState(newState);
      // **********************************************************************************
    }
  };

  // on submit handle API post request
  handleFormSubmit = async event => {
    event.preventDefault();

    try {
      const res = await axios.post('/api/workouts', this.state);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
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
              //** ATTEMPTED REFACTOR */
              // <WorkoutsForm
              //   key={idx}
              //   idx={idx}
              //   groupId={`group-${idx}`}
              //   workouts={workouts}
              //   addExcercise={() => this.addExcercise(idx)}
              // />
              //** ATTEMPTED REFACTOR */

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
