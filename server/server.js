'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

var user = require('./controllers/user/user');


app.use(require('./static'));
app.use('/api/user', user);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '\\app/index.html');
});

app.listen(3000, function() {
  console.log('Serwer nasluchuje na porcie numer', 3000);
});
