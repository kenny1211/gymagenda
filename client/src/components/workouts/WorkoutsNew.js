import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

class WorkoutsNew extends Component {
  state = {
    program: '',
    workouts: []
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
    return (
      <div style={{ textAlign: 'center' }} className="container">
        <h1>Create Workout Program</h1>
        <Form onSubmit={this.handleFormSubmit}>
          <FormGroup>
            <Label>Program Name</Label>
            <Input
              type="text"
              name="program"
              onChange={this.handleChange}
              value={this.state.program}
            />
          </FormGroup>
          <Button type="submit" onClick={this.handleFormSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default WorkoutsNew;
