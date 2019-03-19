import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const Dashboard = () => {
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
};

export default Dashboard;
