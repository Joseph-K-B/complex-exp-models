const express = require('express');

const app = express();

app.use(express.json());


app.use('/api/species', require('./controllers/speciesController.js'));
app.use('/api/animals', require('./controllers/animalsController.js'));


app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
