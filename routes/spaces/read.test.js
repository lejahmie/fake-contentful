const express = require('express');
const supertest = require('supertest');

const routes = require('../');

describe('GET /spaces/:spaceid', () => {

  let app;

  beforeEach(() => {
    app = express();
    app.use(routes);
  });

  it('should return 200', (done) => {
    supertest(app)
      .get('/spaces/aoisuioujdas')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end(done);
  });

});
