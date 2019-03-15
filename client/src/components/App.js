// responsible for rendering layer control (react router) - display of components
// where we wire up react-router - pairing of routes and views
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// Dummy components for now -- will be replaced w actual components
import Header from './Header';
const Dashboard = () => <h2>Dashboard</h2>;
const WorkoutsNew = () => <h2>WorkoutsNew</h2>;
const Landing = () => <h2>Landing</h2>;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/workouts" component={Dashboard} />
          <Route path="/workouts/new" component={WorkoutsNew} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
