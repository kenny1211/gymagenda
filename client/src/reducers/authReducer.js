// responsible for deciding whether or a not a user is logged in (determines what routes user can see)
/**
 * EXAMPLE FLOW:
 * react boots up
 * app.js calls action creator (fetch_user)
 * action creator does axios get request to current user api
 * once req is resolved, we get access to dispatch
 * we then manually dispatch(action) which is sent to all reducers
 * then here, the reducer decides the what state to return
 */
import { FETCH_USER } from '../actions/types';
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; // " " || false returns false, SO action.payload is the user model OR false
    default:
      return state;
  }
}
