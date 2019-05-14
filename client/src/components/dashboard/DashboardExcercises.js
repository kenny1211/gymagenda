import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button } from 'reactstrap';

const DashboardExcercises = props => {
  //once user has chosen a program display respective excercises

  // function to render excercises for chosen program (after program chosen workoutChosen: true)
  let renderExcercises = () => {
    if (props.workoutChosen) {
      let workoutsArray = props.programExcercises.workouts;
      // console.log(workoutsArray);

      let excercisesArray = workout => {
        return workout.excercises.map((excercise, jindex) => {
          // console.log(excercise.excercise, excercise.sets, excercise.reps);
          return (
            <tr key={jindex}>
              <th>{excercise.excercise}</th>
              <th>{excercise.sets}</th>
              <th>{excercise.reps}</th>
            </tr>
          );
        });
      };

      return workoutsArray.map((workout, idx) => {
        return (
          <Card key={idx}>
            <CardBody>
              <CardTitle style={{ textAlign: 'center' }}>
                <h4>{workout.group}</h4>
                <Button size="small" data-workoutid={idx} onClick={props.handleToday}>
                  Start
                </Button>
              </CardTitle>
              <CardSubtitle>
                <Table>
                  <thead>
                    <tr>
                      <th>Excercise</th>
                      <th>Sets</th>
                      <th>Reps</th>
                    </tr>
                  </thead>
                  <tbody>{excercisesArray(workout)}</tbody>
                </Table>
              </CardSubtitle>
            </CardBody>
          </Card>
        );
      });

      // how to get to workout group name:
      // let workoutsArray = this.state.programChosen.workouts;
      // console.log('workoutsArray:' + JSON.stringify(workoutsArray[0].group));
    }
  };

  return (
    <React.Fragment>
      <h4>{props.programExcercises.program} Excercises</h4>
      <Button onClick={props.handleViewPrograms}> View Programs </Button>
      {renderExcercises()}
    </React.Fragment>
  );
};

export default DashboardExcercises;
