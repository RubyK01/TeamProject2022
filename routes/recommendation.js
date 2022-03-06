var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('recommendation', { title: 'Recommendation' });
});

module.exports = router;
