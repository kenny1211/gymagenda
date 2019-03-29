//root file (startup file for node project) -- sometimes called startup or server

// must use common js modules bc node only has support for them (i.e. can not use import statements)
// remember expresss sits on top of node (the actual javascript runtime) -- express just has helper functions for node
// Node.js is an environment outside of the browser for us to run javascript
const express = require('express');
// mongoose - package that helps connect to mongoDB
const mongoose = require('mongoose');
// cookie-session - enable cookies bc express does not know how to handle cookies outside the box
const cookieSession = require('cookie-session');
// passport - authentication - we  are going to tell passport we will use cookie based authentication
const passport = require('passport');
// get keys - will use one for cookie encryption
const keys = require('./config/keys');
// bodyParser - parse incoming request bodies in a middleware before handlers
const bodyParser = require('body-parser');

// execute mongoose models to let mongo know to be responsible for the collections we need
require('./models/User');
require('./models/Workouts');
// make sure we run passport config
require('./services/passport');

// From Mongoose docs: We have a pending connection to the test database running on localhost. We now need to get notified if we connect successfully or if a connection error occurs:
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/gymagenda');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB Connected!');
});

// app object used to set up configuration/association for/of route handlers
// app object represents underlying running express server
const app = express();

// general configuration for http requests so requests body will be allowed to be deeply nested and parsed into json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// instruct app to enable cookie based authentication
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // cookie auto expires after 30 days
    keys: [keys.cookieKey] // cookie encryption
  })
);
// tell passport to make use of cookies for authentication
app.use(passport.initialize());
app.use(passport.session());

// import functions to handle execution of routes and immediately invoke them with app argument
require('./routes/authRoutes')(app);
require('./routes/workoutsRoutes')(app);

// production configuration so express server knows what to serve up when it comes to certain routes
if (process.env.NODE_ENV === 'production') {
  // Express will serve up proudction assets (i.e. main.js, main.css)
  // basically tell express to look into client/build folder for unrecognized requests
  app.use(express.static('client/build'));

  // Express will serve up index.html if it does not recognize the route (react-router vs api routes)
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// dynamic port binding for production (heroku) or development (localhost:5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log(`App listening on PORT: ${PORT}`);
