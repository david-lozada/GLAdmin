// App Middleware
const customAuthMiddleware = require('./middleware/customAuthMiddleware');
// End Middleware

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var dbconnection = require('./models/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Use Middleware
app.use(customAuthMiddleware);

// Routes Files
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var customersRouter = require('./routes/customers');
var suppliersRouter = require('./routes/suppliers');
var companiesRouter = require('./routes/companies');
var taxesRouter = require('./routes/taxes');
var rolesRouter = require('./routes/roles');
var stockRouter = require('./routes/stock');

//App Routes
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/customers', customersRouter);
app.use('/suppliers', suppliersRouter);
app.use('/companies', companiesRouter);
app.use('/taxes', taxesRouter);
app.use('/roles', rolesRouter);
app.use('/stock', stockRouter);
// End Routes

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
