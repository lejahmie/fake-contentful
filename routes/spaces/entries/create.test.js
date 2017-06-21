const express = require('express');
const supertest = require('supertest');

const routes = require('../../');

describe('GET /spaces/:spaceid/entries/:entryid', () => {

  let app;

  beforeEach(() => {
    app = express();
    app.use(routes);
  });

  it('should return 200', (done) => {
    supertest(app)
      .post('/spaces/aoisuioujdas/entries')
      .type('form')
      .send({
        'fields': {
          'title': {
            'en-US': 'Hello, World!'
          },
          'body': {
            'en-US': 'Bacon is healthy!'
          }
        }
      })
      .expect(200)
      .end(done);
  });

});
