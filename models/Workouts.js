const mongoose = require('mongoose');
const { Schema } = mongoose;

const excerciseSchema = new Schema({
  excercise: String,
  sets: Number,
  reps: Number
});

const workoutsSchema = new Schema({
  program: String,
  workouts: [{ group: String, excercises: [excerciseSchema] }],
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('workouts', workoutsSchema);
