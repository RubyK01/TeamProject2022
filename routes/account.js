var express = require('express');
var router = express.Router();
var MySql = require('sync-mysql');
var connection_details = require("../modules/connection_details")
var session = require('express-session');

//Made by Tomas.
//to get account page.
router.get('/', function(req, res, next) {
  //If the user is not logged into an account while trying to go to this page,
  //they will be taken back to the login page with the follow error message.
  if(!req.session.loggedIn === true){
    res.redirect("/login"+"?&error=Please login to view page!");
  }
  var userName = req.session.username;
  var error = req.query.error;
  res.render('account',
  { title: 'account',
    userName: userName,
    error: error
  });
});

module.exports = router;
