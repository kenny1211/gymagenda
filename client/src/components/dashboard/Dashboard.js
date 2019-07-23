// container from workouts/programs and excercises
// when workout/program chosen render excercises of users' choice

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DashboardPrograms from './DashboardPrograms';
import DashboardExcercises from './DashboardExcercises';
import { Button } from 'reactstrap';
import Container from '../common/Container';

class Dashboard extends Component {
  state = {
    workoutChosen: false,
    workoutPrograms: [],
    programChosen: '',
    programExcercises: [],
    todaysWorkout: []
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

    //WORKING
    this.setState({ programChosen: dataset.program }, () => {
      this.getExcercises(this.state.programChosen);
    });

    //OLD
    // console.log(this.state.programChosen);

    // if (this.state.programChosen) {
    //   let programChosen = this.state.programChosen;
    //   this.getExcercises(programChosen);
    // }
  };

  // once a program is chosen, the current view will the its respective excercises
  // this function handles the process of going back to view programs
  handleViewPrograms = () => {
    this.setState({
      workoutChosen: false,
      programChosen: '',
      programExcercises: ''
    });
    console.log(this.state);
  };

  handleDelete = async event => {
    let { dataset } = event.target;
    let deleteThis = dataset.program;

    if (deleteThis) {
      try {
        const res = await axios.delete(`/api/program/${deleteThis}`);
        if (res) {
          this.getPrograms();
        }
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // when viewing the excercise list for the current chosen program
  // this function handles beginning a single workout in the list of workouts
  handleToday = event => {
    // clear todays workout in case another was previously chosen
    this.setState({ todaysWorkout: [] });

    let { dataset } = event.target;

    // grab the single workout chosen from the workouts array in the programExcercises
    // console.log(this.state.programExcercises.workouts[dataset.workoutid]);
    this.setState({ todaysWorkout: this.state.programExcercises.workouts[dataset.workoutid] });
    console.log(`TODAYS WORKOUT: ${JSON.stringify(this.state.todaysWorkout)}`);
  };

  // two views are possible - a list of all programs OR excercises for a single program chosen by the user
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
            handleToday={this.handleToday}
          />
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <Container>
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
        </Container>
      </div>
    );
  }
}

export default Dashboard;
