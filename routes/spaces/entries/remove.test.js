const express = require('express');
const supertest = require('supertest');

const routes = require('../../');

describe('DELETE /spaces/:spaceid/entries/:entryid', () => {

  let app;
  let entryid;

  beforeEach((done) => {
    app = express();
    app.use(routes);

    supertest(app)
      .post('/spaces/aoisuioujdas/entries')
      .type('form')
      .set('X-Contentful-Content-Type', 'content')
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
      .end((err, res) => {
        entryid = res.body.sys.id;
        done();
      });
  });

  it('should return 200', (done) => {
    supertest(app)
      .delete('/spaces/aoisuioujdas/entries/89615ad7xf04dx46b0xa25')
      .expect(204)
      .end(done);
  });

});
