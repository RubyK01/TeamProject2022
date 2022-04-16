var express = require('express');
var router = express.Router();
var MySql = require('sync-mysql');
var connection_details = require("../modules/connection_details");

//Made by Tomas.
//to get signup page.
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

//for creating an account
router.post('/create', function (req, res, next){
  var fName = req.body.fName
  var lName = req.body.lName
  var userName = req.body.userName
  var email = req.body.email
  var pass_word = req.body.pass_word
  var connection = new MySql({ //to connect to mySQL
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  });
  connection.query("insert into customer(fName, Lname, userName, email, pass_word) values ((?), (?), (?), (?), (?));", [fName, lName, userName, email, pass_word]);
  console.log(req.body.fName , req.body.lName, req.body.userName, req.body.email, req.body.pass_word);
  res.redirect("/login"+"?message=Account created successfully!");
});

module.exports = router;
