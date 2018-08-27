
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
  const response = await request(app.callback()).get('/v25');
  expect(response.statusCode).toBe(404);
});

//------------------------------------------------------------
//                     500 Test
//------------------------------------------------------------

test('It should return 500 error', async () => {
  const response = await request(app.callback()).get('/v2/errors/500');
  expect(response.statusCode).toBe(500);
});

//------------------------------------------------------------
//                     v1 Test
//------------------------------------------------------------
test('It should return an error mg about v1 deprecation', async () => {
  const response = await request(app.callback()).get('/v1/launches');
  expect(response.text).toBe('v1 endpoint is deprecated. Did you mean v2?');
});
