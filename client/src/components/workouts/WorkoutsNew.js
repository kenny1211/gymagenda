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

class WorkoutsNew extends Component {
  state = {
    program: '',
    workouts: [{ group: '', excercises: [{ excercise: 'Get To Me', reps: '', sets: '' }] }]
  };

  addWorkout = event => {
    this.setState(prevState => ({
      workouts: [
        ...prevState.workouts,
        { group: '', excercises: [{ excercise: '', reps: '', sets: '' }] }
      ]
    }));
  };

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
            let groupId = `group-${idx}`,
              exId = `ex-${idx}`,
              rId = `rep-${idx}`,
              sId = `sets-${idx}`;
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
                      <CustomInput
                        type="text"
                        inline
                        name={`excercises[${idx}].excercise`}
                        className="excercise"
                        id={exId}
                        data-id={idx}
                        placeholder="excercise"
                      />
                      <CustomInput
                        type="text"
                        inline
                        name="reps"
                        className="reps"
                        id={rId}
                        data-id={idx}
                        placeholder="reps"
                      />
                      <CustomInput
                        type="text"
                        inline
                        name="sets"
                        className="sets"
                        id={sId}
                        data-id={idx}
                        placeholder="sets"
                      />
                    </CardSubtitle>
                    <Button>Add Excercise</Button>
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
