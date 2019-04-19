// render list of all workout programs users have created
import React from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';

const DashboardPrograms = props => {
  return (
    <React.Fragment>
      <h4>Programs List</h4>
      {props.workoutPrograms.map((program, idx) => {
        return (
          <Card key={idx}>
            <CardBody>
              <CardTitle data-program={program.program}>{program.program}</CardTitle>
              <Button onClick={props.handleChosen} data-program={program._id}>
                View Excercises
              </Button>
            </CardBody>
          </Card>
        );
      })}
    </React.Fragment>
  );
};

export default DashboardPrograms;
