
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

test('It should return 404 error', async () => {
  const response = await request(app).get('/v1');
  expect(response.statusCode).toBe(404);
});
