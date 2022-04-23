var express = require('express');
var router = express.Router();
var session = require('express-session');
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  //login checker by Tomas.
  //If the user is not logged into an account while trying to go to this page,
  //they will be taken back to the login page with the follow error message.
  if(!req.session.loggedIn === true){
    res.redirect("/login"+"?&error=Please login to view page!");
  }
  res.render('checkOut', { title: 'cart' });
});
// the routes were done by Tomas
//Made by Jamie.
router.post('/auth',async function(req, res, next) {
	var fName = req.body.fName;
	var lName = req.body.lName
	var cardNumber = req.body.cardNumber;
	var expiration = req.body.expiration;
	var cvv = req.body.CVV;
	var customerID = req.session.userID;
  var getEmailUsername = "SELECT * FROM customer;";
	var connection = mysql.createConnection({
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  });
  connection.query(getEmailUsername, async function(err, results){
	connection.query("INSERT INTO payment(cardNum, fName, lName, secruityNum, expirayDate, customerID) VALUES (?,?,?,?,?,?)",[cardNumber,fName,lName,cvv,expiration,customerID]);
  	if(results.length){
  		var checkEmail = results[0].email;
      var checkUsername = results[0].userName;
  	}
  });
});

module.exports = router;
