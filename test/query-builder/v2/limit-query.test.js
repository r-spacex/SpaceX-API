
const request = require('supertest');
const app = require('../../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                     Limit Query Test
//------------------------------------------------------------

test('It should return all launches with a limit of zero', async () => {
  const response = await request(app.callback()).get('/v2/launches?limit=0');
  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBeGreaterThan(0);
});

test('It should return only the first five launches', async () => {
  const response = await request(app.callback()).get('/v2/launches?limit=5');
  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBe(5);
});
