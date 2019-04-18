// container from workouts/programs and excercises
// when workout/program chosen render excercises of users' choice

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

class Dashboard extends Component {
  state = {
    workoutChosen: false,
    workoutPrograms: [],
    excercises: [],
    programChosen: ''
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
        this.setState({ programChosen: res.data, workoutChosen: true });
      }
      console.log(this.state.programChosen);
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

  // function to render excercises for chosen program (after program chosen workoutChosen: true)
  renderExcercises = () => {
    if (this.state.workoutChosen) {
      let workoutsArray = this.state.programChosen.workouts;
      console.log(workoutsArray);

      let excercisesArray = workoutsArray.map((workout, index) => {
        let toRender;
        workout.excercises.map((excercise, jindex) => {
          console.log(excercise.excercise, excercise.sets, excercise.reps);
          toRender = (
            <CardSubtitle>{excercise.excercise + excercise.sets + excercise.reps}</CardSubtitle>
          );
          return toRender;
        });
        return toRender;
      });

      return workoutsArray.map((workout, idx) => {
        return (
          <Card key={idx}>
            <CardBody>
              <CardTitle>{workout.group}</CardTitle>
              <CardSubtitle>{excercisesArray}</CardSubtitle>
            </CardBody>
          </Card>
        );
      });

      // how to get to workout group name:
      // let workoutsArray = this.state.programChosen.workouts;
      // console.log('workoutsArray:' + JSON.stringify(workoutsArray[0].group));
    }
  };

  // function to set workoutsChosen to false
  // then DashboardPrograms will be shown component
  handleViewPrograms = () => {
    this.setState({ workoutChosen: false });
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
            {/* when workoutChosen false display workouts/programs, else display excercises */}
            <h4>Programs List</h4>
            {this.state.workoutPrograms.map((program, idx) => {
              return (
                <Card key={idx}>
                  <CardBody>
                    <CardTitle data-program={program.program}>{program.program}</CardTitle>
                    <Button onClick={this.handleChosen} data-program={program._id}>
                      View Excercises
                    </Button>
                  </CardBody>
                </Card>
              );
            })}
          </div>
          <div className="col">
            {/* Excercises to display from chosen workout/program */}

            <h4>{this.state.programChosen.program} Excercises</h4>
            <Button onClick={this.handleViewPrograms}>View Programs</Button>
            {this.renderExcercises()}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
