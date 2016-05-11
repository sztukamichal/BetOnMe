'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

app.use(require('./static'));

app.use(require('./auth'));
app.use('/api/users', require('./controllers/api/users'));
app.use('/api/sessions', require('./controllers/api/sessions'));

var server = app.listen(3000, function() {
  console.log('Serwer nasluchuje na porcie numer', 3000);
});

require('./websockets').connect(server);
