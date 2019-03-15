// responsible for data layer contorl (redux)
// root/startup file for application - only react-esque thing here is rendering root component
// in this file we create a redux store (i.e. global state) to connect with react with help from react-redux
// react-redux gives us a provider tag - glue btwn react and redux, so components can reach into store
// end-goal: allow access to state from deeply nested component vs having to constantly pass state through props
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';

// creation of redux store for global state
// first argument - all the reducers inside of app that help define state
// second argument - initial state of app
// third argument - applyMiddleware in place of redux-thunk for now
const store = createStore(reducers, {}, applyMiddleware());

// Provider tag houses redux store and provides state for child component - App
// ReactDOM.render has two args: first - root component. second - where we will render that component in DOM
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
