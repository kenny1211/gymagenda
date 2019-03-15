const passport = require('passport');

module.exports = app => {
  // place holder root route
  app.get('/', (req, res) => {
    res.send({ hi: 'there' });
  });
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
  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/workouts');
  });

  // route handler to log out user/unset cookie
  app.get('/api/logout', (req, res) => {
    // passport attaches functions to req object - one being req.logout()
    req.logout();
    // once looged out we will respond by redirecting user to root route
    res.redirect('/');
  });

  // route handler to get req.user to make sure auth flow works correctly - user persistence achieved
  // remember w succesful auth flow, every request is prefixed with cookie/token
  // EXAMPLE OF FLOW: req -> cookie-session (cookie extraction) -> passport (pulls id out of cookie data) -> deserialize user (function to turn user id into a user) -> model inst. added to req object as req.user
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
