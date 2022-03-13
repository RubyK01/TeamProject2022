var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('accountInfo', { title: 'Info' });
});

module.exports = router;
