//root file (startup file for node project)

// must use common js modules bc node only has support for them (i.e. can not use import statements)
// remember expresss sits on top of node (the actual javascript runtime) -- express just has helper functions for node
const express = require('express');
// app object used to set up configuration/association for/of route handlers
// app object represents underlying running express server
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'here' });
});

// dynamic port binding for production (heroku) or development (localhost:5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log(`App listening on: ${PORT}`);
