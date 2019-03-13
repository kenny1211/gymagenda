// create mongoose model class from Users to store profile.id
const mongoose = require('mongoose');
const { Schema } = mongoose;

// define schema for new collection
const userSchema = new Schema({
  googleId: String
});

// tell mongo we want to create a new collection called users
mongoose.model('users', userSchema);
