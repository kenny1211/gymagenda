// need to setup proxy for devlopment routes so otherwise requests will be made from localhost:3000
// so we wire up relative route prefixes
// DO NOT FORGET TO ADD AUTHORIZED REDIRECT URI  TO GOOGLE: http://localhost:3000/auth/google/callback
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/auth/google', { target: 'http://localhost:5000' }));

  app.use(proxy('/api/*', { target: 'http://localhost:5000' }));
};
