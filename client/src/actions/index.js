// Action creators are used to initiate change of state inside of redux side of application
// i.e. used to modify state contained inside of redux store
// action creator produces an action and passes it to a dispatch function (handled by reduxThunk)

import axios from 'axios';
import { FETCH_USER } from './types';

// reduxThunk passes in dispatch as an argument when it sees a function is returned by applyMiddleware
export const fetchUser = () => {
  return function(dispatch) {
    axios.get('/api/current_user').then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};
