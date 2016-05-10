'use strict';

var express = require('express');
var router = express.Router();

router.use(express.static(__dirname+'/../build'));

module.exports = router;