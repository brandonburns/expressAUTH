'use strict';
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var unicornRoutes = require('./routePaths/routePath');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/unicornsapp_development');

var app = express();
app.set('appSecret', process.env.SECRET || 'secretunicorns');
app.use(passport.initialize());
require('./lib/passportStrategy')(passport);

var unicornRouter = express.Router();
var userRouter = express.Router();

unicornRoutes(unicornRouter, app.get('appSecret'));
require('./routePaths/userRoute')(userRouter, passport, app.get('appSecret'));

app.use('/api/v1', unicornRouter);
app.use('/api/v1', userRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server listening on port ' + (process.env.PORT || 3000));
});