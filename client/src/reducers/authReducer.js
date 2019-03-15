// responsible for deciding whether or a not a user is logged in (determines what routes user can see)
export default function(state = {}, action) {
  console.log(action);
  switch (action.type) {
    default:
      return state;
  }
}
