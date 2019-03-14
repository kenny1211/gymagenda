// passport - package to help with authentication that gives us general helper functions to connect auth w express
const passport = require('passport');
// specific strategy for Google authentication -- passport also has other strats (e.g. Facebook, Spotify etc.)
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require('mongoose');
const keys = require('../config/keys');

// get model class for user
const User = mongoose.model('users');

// pass a function to find user serialize user in order to serialize identifying piece of info to set cookie
// first argument of user is what we pulled out of the database after going through oauth flow
// --> the user with ({ googleId: profile.id })
passport.serializeUser((user, done) => {
  // done function =
  // first argument: error object: null bc we do not expect
  // second argument: give passport an identifying piece of info for user (we use mongoDB generated _id)
  done(null, user.id);
});

// pass a function to deserialize user: to deserialize cookie into identifying piece of info about into our user and find them
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// inform passport to use google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true //our requests are made through a heroku server (proxy) so let google know to trust it (https vs http)
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log(accessToken, refreshToken, profile);

      // do not forget everytime we reach out to a DB it is an async action
      // after receiving info from finished google oauth flow -->
      // first we reach out to the DB to search the user collection to see if the user exists
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // if we have a record with give profile ID we tell passport we are done
          // first argument is error object, second argument is user
          done(null, existingUser);
        } else {
          // if the user does not exists we create new model instance, save to MongoDB, then let passport know we are done
          new User({ googleId: profile.id }).save().then(user => {
            done(null, user);
          });
        }
      });
    }
  )
);
