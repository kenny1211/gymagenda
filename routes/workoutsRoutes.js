const mongoose = require('mongoose');
// function for login check
const requireLogin = require('../middlewares/requireLogin');

const Workouts = mongoose.model('workouts');

// to use requireLogin - pass middleware function as an argument for express to handle
// an arbitrary number of functions can be passed into a route handler
module.exports = app => {
  // public route to view all workouts created in database
  app.get('/api/workouts', async (req, res) => {
    try {
      const workoutsList = await Workouts.find({});

      res.send(workoutsList);
    } catch (err) {
      console.log(err);
    }
  });

  // public route to view given excercies for chosen program
  // colon: req.params
  app.get('api/workouts/:program', async (req, res) => {
    try {
      const programExcercises = await Workouts.find({ program: req.params.program });

      res.send(programExcercises);
    } catch (err) {
      console.log(err);
    }
  });

  // a user must be logged in to create a workout
  app.post('/api/workouts', requireLogin, async (req, res) => {
    console.log(req.body);

    const { program, workouts } = req.body;

    const newWorkout = new Workouts({
      program,
      workouts,
      _user: req.user.id
    });

    try {
      await newWorkout.save();

      res.send(newWorkout);
    } catch (err) {
      console.log(err);
      res.status(422).send(err); // 422 - unprocessable
    }
  });
};
