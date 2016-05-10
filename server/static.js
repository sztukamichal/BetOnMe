'use strict';

var express = require('express');
var router = express.Router();

router.use(express.static(__dirname+'/../../../BetOnMe'));

module.exports = router;