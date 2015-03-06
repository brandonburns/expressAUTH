'use strict';

var chai = require ('chai');
var expect = chai.expect;
var chaihttp = require ('chai-http');  
var mongoose = require ('mongoose');

require('../server.js');
process.env.MONGO_URI = 'mongodb://localhost/unicorn_testing';

chai.use(chaihttp);

describe('Unicorns', function() {
  var unicornId;
  beforeEach(function(done) {
    chai.request('localhost:3000/api/v1')
      .post('/unicorns')
      .send({unicornName: 'Bob'})
      .end(function (err, res) {
        unicornId = res.body._id;
        done();
      });
  });
  it('should update unicorn', function (done) {
  chai.request('localhost:3000/api/v1')
    .put('/unicorns/' + unicornId)
    .send({unicornName: 'Bob'})
    .end(function (err, res) {
      expect(err).eql(null);
      expect(res.body.unicornName).eql('Bob');
      done();
    });
  });
  it('should post request', function (done) {
    chai.request('localhost:3000/api/v1')
      .post('/unicorns')
      .send({unicornName: 'Bob'})
      .end(function (err, res) {
        expect(err).eql(null);
        expect(res.body.unicornName).eql('Bob');
        expect(res.body).to.have.property('_id');
        done();
    });
  });
  it('should delete unicorn', function (done) {
  chai.request('localhost:3000/api/v1')
    .delete('/unicorns/' + unicornId)
    .end(function (err, res) {
      expect(err).eql(null);
      expect(res.body).eql({});
      done();
    });
  });
  it('should have author', function (done) {
    chai.request('localhost:3000/api/v1')
      .get('/unicorns')
      .end(function (err, res) {
        expect(err).eql(null);
        expect(res.body[1]).to.have.property('author');
        done();
    });
  });
});