const mongoose = require('mongoose');
const { Schema } = mongoose;

const excerciseSchema = new Schema({
  title: String,
  reps: Number,
  sets: Number
});

module.exports = excerciseSchema;
