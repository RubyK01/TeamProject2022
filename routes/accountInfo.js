var express = require('express');
var router = express.Router();
var MySql = require('sync-mysql');
var connection_details = require("../modules/connection_details");
var session = require('express-session');

//Made by Tomas.
//to get accountInfo page.
router.get('/', function(req, res, next) {
  var connection = new MySql({
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  });
  //If the user is not logged into an account while trying to go to this page,
  //they will be taken back to the login page with the follow error message.
  if(!req.session.loggedIn === true){
    res.redirect("/login"+"?&error=Please login to view page!");
  }
  var customer = req.session;
  var email = req.session.email;
  var fName = req.session.firstName;
  var lName = req.session.lastName;
  var userName = req.session.username;
  var password = req.session.password;
  console.log(customer);
  res.render('accountInfo', {
    title: 'Info',
    customer: customer,
    email: email,
    fName: fName,
    lName: lName,
    userName: userName,
    password: password
   });
});

module.exports = router;
