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
    workouts: [{ group: '', excercises: [] }]
  };

  addWorkout = event => {
    this.setState(prevState => ({
      workouts: [...prevState.workouts, { group: '', excercises: [] }]
    }));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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
        <Form onSubmit={this.handleFormSubmit}>
          <FormGroup>
            <Label>Program Name</Label>
            <Input
              type="text"
              name="program"
              id="program"
              onChange={this.handleChange}
              value={program}
            />
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
                        name={groupId}
                        className="group"
                        data-id={idx}
                        placeholder={`Workout #${idx + 1}`}
                      />
                    </CardTitle>
                    <CardSubtitle>
                      <CustomInput
                        inline
                        name={exId}
                        className="excercise"
                        id={exId}
                        data-id={idx}
                        placeholder="excercise"
                      />
                      <CustomInput
                        inline
                        name={rId}
                        className="reps"
                        id={rId}
                        data-id={idx}
                        placeholder="reps"
                      />
                      <CustomInput
                        inline
                        name={sId}
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
