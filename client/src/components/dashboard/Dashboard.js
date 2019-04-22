// container from workouts/programs and excercises
// when workout/program chosen render excercises of users' choice

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DashboardPrograms from './DashboardPrograms';
import DashboardExcercises from './DashboardExcercises';
import { Button } from 'reactstrap';

class Dashboard extends Component {
  state = {
    workoutChosen: false,
    workoutPrograms: [],
    programChosen: '',
    programExcercises: []
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

  // function to get excercises for chosen program
  // in state under programChosen, use value to get relevant excercises
  // change workoutChosen to true to prepare to render DashboardExcercises program in place of DashboardPrograms
  getExcercises = async programChosen => {
    try {
      console.log(programChosen);

      const res = await axios.get(`/api/program/${programChosen}`);

      console.log(res.data);

      if (res.data) {
        this.setState({ programExcercises: res.data, workoutChosen: true });
      }
      console.log(this.state.programExcercises);
    } catch (err) {
      console.log(err);
    }
  };

  // function to handle chosen workout program
  // in the target button, data-program is the program name
  // grab the program name and set it to state
  handleChosen = event => {
    let { dataset } = event.target;

    this.setState({ programChosen: dataset.program });

    console.log(this.state.programChosen);

    if (this.state.programChosen) {
      let programChosen = this.state.programChosen;
      this.getExcercises(programChosen);
    }
  };

  handleViewPrograms = () => {
    this.setState({ workoutChosen: false, programChosen: '', programExcercises: '' });
    console.log(this.state);
  };

  handleDelete = async event => {
    let { dataset } = event.target;
    let deleteThis = dataset.program;

    if (deleteThis) {
      try {
        const res = await axios.delete(`/api/program/${deleteThis}`);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  renderUserView = () => {
    if (!this.state.workoutChosen) {
      return (
        <div className="col" style={{ textAlign: 'center' }}>
          <DashboardPrograms
            workoutPrograms={this.state.workoutPrograms}
            handleChosen={this.handleChosen}
            handleDelete={this.handleDelete}
          />
        </div>
      );
    } else {
      return (
        <div className="col" style={{ textAlign: 'center' }}>
          <DashboardExcercises
            programExcercises={this.state.programExcercises}
            handleViewPrograms={this.handleViewPrograms}
            workoutChosen={this.state.workoutChosen}
          />
        </div>
      );
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
          {/* <div className="col" style={{ textAlign: 'center' }}> */}
          {this.renderUserView()}
          {/* when workoutChosen false display workouts/programs, else display excercises
            <DashboardPrograms
              workoutPrograms={this.state.workoutPrograms}
              handleChosen={this.handleChosen}
            />
          </div>
          <div className="col">
            <DashboardExcercises
              programExcercises={this.state.programExcercises}
              handleViewPrograms={this.handleViewPrograms}
              workoutChosen={this.state.workoutChosen}
            /> */}
          {/* </div> */}
        </div>
      </div>
    );
  }
}

export default Dashboard;
