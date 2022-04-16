var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection_details = require("../modules/connection_details")
var session = require('express-session');
var favicon = require('serve-favicon')
var path = require('path');

//Made by Tomas.
//to get login page.
router.get('/', function(req, res, next) {
  var email = req.body.email;
	var pass_word = req.body.pass_word;
  var error = req.query.error;
  var message = req.query.message;
  res.render('login', { title: 'Login', error: error, message: message });
});

//for logining into an account
router.post('/auth', function(req, res) { //https://codeshack.io/basic-login-system-nodejs-express-mysql/
  var connection = mysql.createConnection({
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  });
  // To take the users inputs from the text fields.
	var userName = req.body.userName
	var pass_word = req.body.pass_word;
  var error = req.query.error; // Didnt want to use express flash so I made a variable to pass an error message out if needed.
	//https://coderszine.com/user-login-and-registration-with-node-js-express-mysql/
  var sql = "SELECT customerID, fName, lName, userName, email, pass_word FROM customer WHERE userName='"+userName+"' and pass_word = '"+pass_word+"';";
  connection.query(sql, function(err, results){
   if(results.length){
    // Saving the mysql query results in the session for further use.
    req.session.user = results[0]; //saved the whole query as an object just incase.
    req.session.userID = results[0].customerID;
    req.session.firstName = results[0].fName;
    req.session.lastName = results[0].lName;
    req.session.password = results[0].pass_word;
    req.session.email = results[0].email;
    req.session.username = results[0].userName;
    req.session.loggedIn = true;
    //logs for testing purposes.
    // console.log("ID: "+results[0].customerID);
    // console.log("Username: "+results[0].userName);
    console.log(req.session); //Check the termincal for session details i.e cookie and user details.
    res.redirect('/account');
   }
   else{
      //If the inputed details are incorrect or the account doesnt exist,
      //the user is taken back to the login page and is greeted with the error below.
      //Had to to split the redirect into two strings as it would cause a 404 error when trying to login again.
      res.redirect("/login"+"?&error=Details provided are invalid!");
  	}
  });
})



module.exports = router;
