import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Dashboard extends Component {
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
      <div style={{ textAlign: 'center' }}>
        <h1>Dashboard</h1>
        <Link to="/workouts/new">
          <Button size="sm" color="warning">
            Create Workout
          </Button>
        </Link>
      </div>
    );
  }
}

export default Dashboard;
