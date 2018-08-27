
const request = require('supertest');
const app = require('../../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                     404 Test
//------------------------------------------------------------

test('It should return 404 error', async () => {
  const response = await request(app.callback()).get('/v1');
  expect(response.statusCode).toBe(404);
});

//------------------------------------------------------------
//                     500 Test
//------------------------------------------------------------

test('It should return 500 error', async () => {
  const response = await request(app.callback()).get('/v2/errors/500');
  expect(response.statusCode).toBe(500);
});
