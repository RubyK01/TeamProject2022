var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PcPartsElect' });
  console.log("ID: "+results[0].customerID);
  console.log("Username: "+results[0].userName);
});

module.exports = router;
