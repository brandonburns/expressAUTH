'use strict';

var eat = require('eat');
var User = require('../models/User');

module.exports = function(appSecret) {
  return function(req, res, next) {
    var token = req.headers.eat || req.body.eat;
    if (!token) return res.status(403).send({msg: 'could not authenticate'});
    console.log('step 1 success');

    eat.decode(token, appSecret, function(err, decoded) {
      if (err) return res.status(403).send({msg: 'could not authenticate'});
      console.log('step 2 success');

      User.findOne({_id: decoded.id}, function(err, user) {
        if (err) return res.status(403).send({msg: 'could not authenticate'});
        console.log(User._id);

        if(!user) return res.status(403).send({msg: 'could not authenticate'});
        console.log('step 4 success');

        req.user = user;
        next();
      });
      console.log('total success'); 
    });
  };
};