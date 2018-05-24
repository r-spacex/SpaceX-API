
const request = require('supertest');
const app = require('../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                     History Sort Test
//------------------------------------------------------------

test('It should return history sorted from smallest to greatest', async () => {
  const response = await request(app.callback()).get('/v2/info/history?order=asc');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('flight_number', 4);
});

test('It should return history sorted from greatest to smallest', async () => {
  const response = await request(app.callback()).get('/v2/info/history?order=desc');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1]).toHaveProperty('flight_number', 4);
});
