import { combineReducers } from 'redux';
import authReducer from './authReducer';

// remember whatever keys we provide for the combine reducers object will be the keys for our state
// the values for those keys are then produced by their respective reducer
export default combineReducers({
  auth: authReducer
});
