var express = require('express');
var router = express.Router();
var MySql = require('sync-mysql');
var connection_details = require("../modules/connection_details")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
  var connection = new MySql({
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  });
});

// router.post("/",function(req,res)){
//   connection.query("select * from customer where email = ? and password =?",function(){
//
//   })
// });

module.exports = router;
