// container from workouts/programs and excercises
// when workout/program chosen render excercises of users' choice

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';

class Dashboard extends Component {
  state = {
    workoutChosen: false,
    workoutPrograms: [],
    excercises: []
  };

  // when component mounts immediately getPrograms()
  componentDidMount() {
    this.getPrograms();
  }

  //axios get function to retrieve workouts lists from db
  getPrograms = async () => {
    try {
      const res = await axios.get('/api/workouts');
      console.log(res.data);
      // after fetching workouts set to state
      this.setState({ workoutPrograms: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  //function to get excercises for chosen program
  getExcercises = async () => {};

  //function to render excercises for chosen program (after program chosen workoutChosen: true)
  renderExcercises = () => {};

  render() {
    return (
      <div>
        <div className="row">
          <div className="col" style={{ textAlign: 'center' }}>
            <h1>Dashboard</h1>
            <Link to="/workouts/new">
              <Button size="sm" color="warning">
                Create Workout
              </Button>
            </Link>
            <hr className="my-2" />
          </div>
        </div>
        <div className="row">
          <div className="col" style={{ textAlign: 'center' }}>
            {/* when workoutChosen false display workouts/programs, else display excercises */}
            <h4>Programs List</h4>
            {this.state.workoutPrograms.map(program => {
              return (
                <Card>
                  <CardBody>
                    <CardTitle>{program.program}</CardTitle>
                    <Button>View Excercises</Button>
                  </CardBody>
                </Card>
              );
            })}
          </div>
          <div className="col">
            {/* Excercises to display from chosen workout/program */}
            <h4>Excercises</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
