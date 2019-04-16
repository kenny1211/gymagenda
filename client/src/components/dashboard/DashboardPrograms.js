// render list of all workout programs users have created
import React, { Component } from 'react';
import axios from 'axios';

class DashboardPrograms extends Component {
  state = {
    workouts: []
  };

  // when component mounts immediately getPrograms()
  componentDidMount() {
    this.getPrograms();
  }

  //axios get function to retrieve workouts lists from db
  getPrograms = async () => {
    try {
      const res = await axios.get('/api/workouts');
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>Programs List</h1>
        {/* render all workouts/programs from user submissions */}
      </React.Fragment>
    );
  }
}

export default DashboardPrograms;