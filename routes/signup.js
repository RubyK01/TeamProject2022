var express = require('express');
var router = express.Router();
var MySql = require('sync-mysql');
var connection_details = require("../modules/connection_details");

/* GET signup page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
  var fName = req.body.fName
  var lName = req.body.lName
  var userName = req.body.userName
  var email = req.body.email
  var password = req.body.password
  var connection = new MySql({
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  });
});

router.post('/create', function (req, res, next){
  var fName = req.body.fName
  var lName = req.body.lName
  var userName = req.body.userName
  var email = req.body.email
  var password = req.body.password
  var connection = new MySql({
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  });
  connection.query("insert into customer(fName, Lname, userName, email, password) values ((?), (?), (?), (?), (?));", [fName, lName, userName, email, password]);
  res.redirect("/login");
});

module.exports = router;
