'use strict';

var chai = require ('chai');
var expect = chai.expect;
var chai_http = require ('chai-http');  
var mongoose = require ('mongoose');

require('../server.js');
process.env.MONGO_URI = 'mongodb://localhost/unicorn_testing';

chai.use(chai_http);

describe('Unicorns', function() {
  var unicornId;
  var token;
  beforeEach(function(done) {
    chai.request('localhost:3000/api/v1')
      .get('/sign_in')
      .auth('test@example', 'foobar123')
      .end(function (err, res) {
        token = res.body.eat;
        chai.request('localhost:3000/api/v1')
          .post('/unicorns')
          .send({eat: token, unicornName: 'Jim'})
          .end(function (err, res) {
            unicornId = res.body._id;
            done();
          });
      });
  });
  it('should update unicorn', function (done) {
  chai.request('localhost:3000/api/v1')
    .put('/unicorns/' + unicornId)
    .send({eat: token, unicornName: 'Jim'})
    .end(function (err, res) {
      expect(err).eql(null);
      expect(res.body.unicornName).eql('Jim');
      done();
    });
  });
  it('should post request', function (done) {
    chai.request('localhost:3000/api/v1')
      .post('/unicorns')
      .send({eat: token, unicornName: 'Jim'})
      .end(function (err, res) {
        expect(err).eql(null);
        expect(res.body.unicornName).eql('Jim');
        expect(res.body).to.have.property('_id');
        done();
    });
  });
  it('should delete unicorn', function (done) {
  chai.request('localhost:3000/api/v1')
    .delete('/unicorns/' + unicornId)
    .send({eat: token})
    .end(function (err, res) {
      expect(err).eql(null);
      expect(res.body).eql({msg: 'deleted unicorn'});
      done();
    });
  });
  it('should have unicorn name', function (done) {
    chai.request('localhost:3000/api/v1')
      .get('/unicorns')
      .send({eat: token})
      .end(function (err, res) {
        expect(err).eql(null);
        expect(res.body[0]).to.have.property('unicornName');
        done();
    });
  });
  after(function (done) {
    mongoose.connection.db.dropDatabase(function () {
      done();
    });
  });
});
