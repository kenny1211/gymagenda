// container from workouts/programs and excercises
// when workout/program chosen render excercises of users' choice

import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    } catch (err) {
      console.log(err);
    }
  };

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
            <h4>Programs List</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
