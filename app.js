var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var recommendationRouter = require('./routes/recommendation');
var desktopRouter = require('./routes/desktop');
var laptopRouter = require('./routes/laptop');
var gpuRouter = require('./routes/gpu');
var cpuRouter = require('./routes/cpu');
var coolingRouter = require('./routes/cooling');
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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/recommendation', recommendationRouter);
app.use('/desktop', desktopRouter);
app.use('/laptop', laptopRouter);
app.use('/gpu', gpuRouter);
app.use('/cpu', cpuRouter);
app.use('/cooling', coolingRouter);
app.use('/ram', ramRouter);
app.use('/storage', storageRouter);
app.use('/account', accountDetailsRouter);
app.use('/cart', cartRouter);
app.use('/accountInfo', accounInfoRouter);
app.use('/checkOut', checkRouter);

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

console.log("localhost:3000");
module.exports = app;
