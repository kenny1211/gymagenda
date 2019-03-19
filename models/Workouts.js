const mongoose = require('mongoose');
const { Schema } = mongoose;
const ExcerciseSchema = require('./Excercise');

const workoutsSchema = new Schema({
  program: String,
  title: String,
  excercises: [ExcerciseSchema],
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('workouts', workoutsSchema);
