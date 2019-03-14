import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <a href="/auth/google">Sign In With Google</a>
        <br />
        <a href="/api/logout">Logout Of Google</a>
      </div>
    );
  }
}

export default App;
