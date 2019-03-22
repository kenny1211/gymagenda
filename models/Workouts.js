const mongoose = require('mongoose');
const { Schema } = mongoose;

const excerciseSchema = new Schema({
  name: String,
  reps: Number,
  sets: Number
});

const workoutsSchema = new Schema({
  program: String,
  workouts: [{ group: String, excerises: [excerciseSchema] }],
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('workouts', workoutsSchema);
