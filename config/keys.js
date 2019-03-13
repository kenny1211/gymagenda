// Figure out what set of credentials to use (dev vs prod)
if (process.env.NODE_ENV === 'production') {
  // we are in prod - return prod keys
  module.exports = require('./prod');
} else {
  // we are in dev - return dev keys
  module.exports = require('./dev');
}
