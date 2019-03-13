const passport = require('passport');

module.exports = app => {
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
};
