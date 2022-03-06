var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cooling', { title: 'Cooling' });
});

module.exports = router;
