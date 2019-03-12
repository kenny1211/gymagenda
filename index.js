//root file (startup file for node project)

// must use common js modules bc node only has support for them (i.e. can not use import statements)
// remember expresss sits on top of node (the actual javascript runtime) -- express just has helper functions for node
const express = require('express');
// passport - package to help with authentication that gives us general helper functions to connect auth w express
const passport = require('passport');
// specific strategy for Google authentication -- passport also has other strats (e.g. Facebook, Spotify etc.)
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
// app object used to set up configuration/association for/of route handlers
// app object represents underlying running express server
const app = express();

// inform passport to use google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    accessToken => {
      console.log(accessToken);
    }
  )
);

// route handler for google oauth - taken care of by passport; new GoogleStrategy represented by string 'google'
// entry point to start google oauth flow
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// route handler for code exchange (code given by google, located in our callback URL delegated in new GoogleStrategy)
// call back URL and code exchange are extra levels of google oauth flow for security reasons
// ends with code getting exchanged for access token which is handled in new GoogleStrategy
// *MUST ADD ROUTE IN AUTHORIZED REDIRECT URIS UNDER CREDENTIALS IN GOOGLE DEVELOPERS CONSOLE*
app.get('/auth/google/callback', passport.authenticate('google'));

// dynamic port binding for production (heroku) or development (localhost:5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log(`App listening on PORT: ${PORT}`);
