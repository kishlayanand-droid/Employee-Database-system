var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

const employeeRoutes = require('./routes/employees');

const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'});

//connecting to mongodb database
mongoose.connect(process.env.DATABASE_LOCAL, {
  // useNewUrlParser : true,
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//middleware for method override
app.use(methodOverride('_method'));

//middleware for session
app.use(session({
  secret:"nodejs",
  resave: true,
  saveUninitialized: true
}));

//middleware for flash message
app.use(flash());

//Setting message varibale globally
app.use((req, res, next) => {
  res.locals.success_msg = req.flash(('success_msg'));
  res.locals.error_msg = req.flash(('error_msg'));
  next();
});

app.use('/', employeeRoutes);
app.use(bodyParser.urlencoded({extended: true}));

//---------------------------------------------------------
const port = process.env.PORT;
app.listen(port, ()=> {
  console.log('Server is started.');
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

module.exports = app;
