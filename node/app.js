var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
const cors = require("cors")

//bd
const mongoose = require('mongoose')

//routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//cors
app.use(cors())

app.use(logger('dev'));

//db
mongoose.connect('mongodb://localhost/projetpfe', {useNewUrlParser : true , useUnifiedTopology:true },(err)=>{
  if(err){
    console.log(err)
    return
  }else{
    console.log('connecting db')
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//router
app.use('/', indexRouter);
app.use('/users', usersRouter);


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
  res.json({
    message : err.message
  })
});

module.exports = app;
