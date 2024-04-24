const express = require('express');

const app = express();
const PORT = process.env.PORT || 80;

// Designate the static folder as serving static resources
app.use(express.static(__dirname + '/static'));

app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));

/** FRONTEND ROUTES */

const html_dir = __dirname + '/templates/';

app.get('/', (req, res) => {
  res.sendFile(`${html_dir}index.html`);
});

app.get('/login', (req, res) => {
    res.sendFile(`${html_dir}login.html`);
});

app.get('/profile', (req, res) => {
    res.sendFile(`${html_dir}profile.html`);
});

app.get('/game', (req, res) => {
  res.sendFile(`${html_dir}game.html`);
});


// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));