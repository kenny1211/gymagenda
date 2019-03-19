const mongoose = require('mongoose');
const { Schema } = mongoose;

const excerciseSchema = new Schema({
  name: String,
  reps: Number,
  sets: Number,
  completed: { type: Boolean, default: false }
});

const workoutsSchema = new Schema({
  program: String,
  group: [String],
  excercises: [excerciseSchema],
  completed: { type: Boolean, default: false },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('workouts', workoutsSchema);
