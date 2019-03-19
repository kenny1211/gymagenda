const mongoose = require('mongoose');
// function for login check
const requireLogin = require('../middlewares/requireLogin');

const Workouts = mongoose.model('workouts');

// to use requireLogin - pass middleware function as an argument for express to handle
// an arbitrary number of functions can be passed into a route handler
module.exports = app => {
  app.post('/api/workouts', requireLogin, async (req, res) => {
    const { program, title, excercises } = req.body;

    const workouts = new Workouts({
      program,
      title,
      excercises,
      _user: req.user.id
    });

    try {
      await workouts.save();

      res.send(workouts);
    } catch (err) {
      console.log(err);
      res.status(422).send(err); // 422 - unprocessable
    }
  });
};
