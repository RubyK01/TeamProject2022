var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MySql = require('mysql');
var connection_details = require("./modules/connection_details");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var recommendationRouter = require('./routes/recommendation');
var desktopRouter = require('./routes/desktop');
var laptopRouter = require('./routes/laptop');
var gpuRouter = require('./routes/gpu');
var cpuRouter = require('./routes/cpu');
var motherBoardRouter = require('./routes/motherBoard');
var ramRouter = require('./routes/ram');
var storageRouter = require('./routes/storage');
var accountDetailsRouter= require('./routes/account');
var cartRouter = require('./routes/cart');
var accounInfoRouter= require('./routes/accountInfo');
var checkRouter= require('./routes/checkOut');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
	// key: 'user_sid',
	secret: 'mySecret',
	resave: false,
	saveUninitialized: true,
	cookie: {
		expires: 700000, //cookie is set to expire after a week
	}
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//website pages
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/recommendation', recommendationRouter);
app.use('/desktop', desktopRouter);
app.use('/laptop', laptopRouter);
app.use('/gpu', gpuRouter);
app.use('/cpu', cpuRouter);
app.use('/motherBoard', motherBoardRouter);
app.use('/ram', ramRouter);
app.use('/storage', storageRouter);
app.use('/account', accountDetailsRouter);
app.use('/cart', cartRouter);
app.use('/accountInfo', accounInfoRouter);
app.use('/checkOut', checkRouter);

app.use(function(req, res, next){ // https://stackoverflow.com/questions/12457615/expressjs-how-to-show-hide-a-div-in-case-user-its-logged
  if (req.session.user) {
    res.locals.user = req.session.user
  }
  next();
});

app.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        redirect("/account"+"?&error=Cannot log out.");
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.end()
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log("App is listening on port: 3000");
console.log("Go to localhost:3000 in browser.");
module.exports = app;
