const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/workouts', requireLogin, (req, res) => {});
};
