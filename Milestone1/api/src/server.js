const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const port = process.env.PORT || 80;

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

const routes = require('./routes');

app.use('/routes', routes);

app.get('/', (req,  res) => {
  res.json({your_api: 'it works'});
});

// As our server to listen for incoming connections
app.listen(port, () => console.log(`Server listening on port: ${port}`));