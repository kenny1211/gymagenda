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

      res.json(workoutsList);
    } catch (err) {
      console.log(err);
      res.status(422).send(err);
    }
  });

  // public route to view given excercies for chosen program by captured value in route parameter
  // colon: req.params
  app.get('/api/program/:program', async (req, res) => {
    let id = req.params.program;

    try {
      const programExcercises = await Workouts.findById(id);

      res.json(programExcercises);
    } catch (err) {
      console.log(err);
      res.status(422).send(err);
    }
  });

  // route to delete program
  app.delete('/api/program/:program', requireLogin, async (req, res) => {
    let id = req.params.program;

    try {
      const programDelete = await Workouts.deleteOne({ _id: id });

      res.json(programDelete);
    } catch (err) {
      console.log(err);
      res.status(422).send(err);
    }
  });

  // route to access a single excercise -- figure out correct query for nested object
  app.get('/api/excercise/:id', requireLogin, async (req, res) => {
    let id = req.params.id;

    try {
      const excercise = await Workouts.findById(id);
      res.json(excercise);
    } catch (err) {
      console.log(err);
      res.status(422).send(err);
    }
  });

  // route to update weight for excercise -- front end still needs to be created for editing
  app.put('/api/excercise/:id', requireLogin, async (req, res) => {
    let id = req.params.id;

    try {
      const excercise = await Workouts.findByIdAndUpdate(id, { $set: req.body });
      res.json(excercise);
    } catch (err) {
      console.log(err);
      res.status(422).send(err);
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

  // save todays workout for user
  app.post('/api/today', requireLogin, async (req, res) => {
    const { todaysWorkout } = await req.body;

    try {
      console.log(res);
      res.send(todaysWorkout);
    } catch (err) {
      console.log(err);
      res.status(422).send(err); // 422 - unprocessable
    }
  });
};
