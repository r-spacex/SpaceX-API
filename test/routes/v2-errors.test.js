
const request = require('supertest');
const app = require('../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                     404 Test
//------------------------------------------------------------

test('It should return 404 error', () => {
  return request(app).get('/v1').then((response) => {
    expect(response.statusCode).toBe(404);
  });
});
