var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var setupRouter = require('./routes/setup');
var designRouter = require('./routes/design');
var goodspRouter = require('./routes/goods');
var orderRouter = require('./routes/order');
var managementRouter = require('./routes/management');
var smsRouter = require('./routes/sms');
var memberRouter = require('./routes/member');
var statisticsRouter = require('./routes/statistics');
var mimRouter = require('./routes/mim');
var accountRouter = require('./routes/account');
var boardRouter = require('./routes/board');


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
app.use('/setup/', setupRouter);
app.use('/design/', designRouter)
app.use('/goods/', goodspRouter);
app.use('/order/', orderRouter);
app.use('/management/', managementRouter);
app.use('/sms/', smsRouter);
app.use('/member/', memberRouter);
app.use('/statistics/', statisticsRouter);
app.use('/mim/', mimRouter);
app.use('/account/', accountRouter);
app.use('/board/', boardRouter);


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