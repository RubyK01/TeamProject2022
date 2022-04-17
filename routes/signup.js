var express = require('express');
var router = express.Router();
var MySql = require('sync-mysql');
var connection_details = require("../modules/connection_details");
var bcrypt = require('bcrypt');

//Made by Tomas.
//to get signup page.
router.get('/', function(req, res, next) {
  var error = req.query.error;
  var fName = req.body.fName;
  var lName = req.body.lName;
  var userName = req.body.userName;
  var email = req.body.email;
  var pass_word = req.body.pass_word;
  var connection = new MySql({
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  });
  res.render('signup', { title: 'Signup' , error: error});
});

//for creating an account
router.post('/create', async function (req, res, next){
  var error = req.query.error;
  var fName = req.body.fName;
  var lName = req.body.lName;
  var userName = req.body.userName;
  var email = req.body.email;
  var pass_word = req.body.pass_word;
  var connection = new MySql({ //to connect to mySQL
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  });
  if(pass_word.includes("0") || pass_word.includes("1") || pass_word.includes("2") || pass_word.includes("3") || pass_word.includes("4") || pass_word.includes("5") || pass_word.includes("6") || pass_word.includes("7") || pass_word.includes("8") || pass_word.includes("9") && email.includes("@")){
    var salt = await bcrypt.genSaltSync(5); //the amount of times I want to hash a password
    pass_word = await bcrypt.hashSync(pass_word,salt);
    connection.query("insert into customer(fName, lName, userName, email, pass_word) values ((?), (?), (?), (?), (?));", [fName, lName, userName, email, pass_word]);
    console.log(req.body.fName , req.body.lName, req.body.userName, req.body.email, req.body.pass_word);
    console.log("hashed password: "+pass_word);
    res.redirect("/login"+"?message=Account created successfully!");
  }
  else if(!email.includes("@")){
    res.redirect("/signup"+"?&error=Invalid email!");
  }
  else{
    res.redirect("/signup"+"?&error=Invalid password!");
  }
});

module.exports = router;
