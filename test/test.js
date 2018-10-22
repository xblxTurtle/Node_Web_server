'use strict';
var app = require('../server.js');
var request = require('supertest');


describe('test method', function() {
  it('respond with Welcome', function(done) {
    // navigate to root and check the the response is "Welcome"
    request(app).get('/test').expect('Welcome', done);
  });
});