var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//router web
var productRouter = require("./routes/product/product.routers")
var orderRouter = require("./routes/order/order.router")

//router api
var userApiRouter = require("./routes/api/user.router");
var productTypeApiRouter = require("./routes/api/product_type.router");
var productApiRouter = require("./routes/api/product.router");
var cartApiRouter = require("./routes/api/cart.router");
var orderApiRouter = require("./routes/api/order.router");
var commentApiRouter = require("./routes/api/comment.router");
var urlImageApiRouter = require("./routes/api/image.router");

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
//use router web
app.use("/product", productRouter)
app.use("/order", orderRouter)

//use router api
app.use("/api/user", userApiRouter);
app.use("/api/product_type", productTypeApiRouter);
app.use("/api/product", productApiRouter);
app.use("/api/cart", cartApiRouter);
app.use("/api/order", orderApiRouter);
app.use("/api/comment", commentApiRouter);
app.use("/api/image", urlImageApiRouter);

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
  if(req.originalUrl.indexOf("api") === 0){
    res.json({
      msg: err.message
    })
  }else{
    res.render('error');
  }
});

module.exports = app;
