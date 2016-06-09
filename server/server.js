'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var footballApi = require('./football-api-integration/run');

app.use(bodyParser.json());

app.use(require('./static'));

app.use(require('./auth'));
app.use('/api/users', require('./controllers/api/users'));
app.use('/api/sessions', require('./controllers/api/sessions'));
app.use('/api/seasons', require('./controllers/api/soccerSeasons'));
app.use('/api/teams', require('./controllers/api/teams'));
app.use('/api/bets', require('./controllers/api/bets'));
app.use('/api/tournament', require('./controllers/api/tournament'));


var server = app.listen(3000, function() {
  console.log('Serwer nasluchuje na porcie numer', 3000);
});

footballApi();

require('./websockets').connect(server);
