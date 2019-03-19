// next is similiar to the passport done function, simply a function called to signal completion and calls the next function in line
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }

  next();
};
