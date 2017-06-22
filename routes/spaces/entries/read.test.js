const express = require('express');
const supertest = require('supertest');

const routes = require('../../');

describe('GET /spaces/:spaceid/entries/[:entryid]', () => {

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

  it('with :entryid should return 200', (done) => {
    supertest(app)
      .get(`/spaces/aoisuioujdas/entries/${entryid}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end(done);
  });

  it('should return 200', (done) => {
    supertest(app)
      .get(`/spaces/aoisuioujdas/entries/`)
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end(done);
  });

  it('with filters should return 200', (done) => {
    supertest(app)
      .get(`/spaces/aoisuioujdas/entries/?content_type=Link&limit=1&fields.title=Hello, World!&skip=0`)
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end(done);
  });

});
