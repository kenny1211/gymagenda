// responsible for rendering layer control (react router) - display of components
// where we wire up react-router - pairing of routes and views
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// CONNECT is a helper from 'react-redux' that will give a component the abiliy to CALL ACTIONS
import { connect } from 'react-redux';
import * as actions from '../actions';

// Dummy components for now -- will be replaced w actual components
import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>;
const WorkoutsNew = () => <h2>WorkoutsNew</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
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
  }
}

// connect takes in two arguments. the first is to map state to props - unnecessary here
// the second is the actions we would like to connect
export default connect(
  null,
  actions
)(App);
