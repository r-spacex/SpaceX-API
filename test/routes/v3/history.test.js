
const request = require('supertest');
const app = require('../../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                       History
//------------------------------------------------------------

test('It should return all history', async () => {
  const response = await request(app.callback()).get('/v3/history');
  expect(response.statusCode).toBe(200);
  response.body.forEach((event) => {
    expect(event).toHaveProperty('id', expect.any(Number));
    expect(event).toHaveProperty('title', expect.any(String));
    expect(event).toHaveProperty('event_date_utc', expect.any(String));
    expect(event).toHaveProperty('event_date_unix', expect.any(Number));
    expect(event).toHaveProperty('flight_number');
    expect(event).toHaveProperty('details', expect.any(String));
    expect(event).toHaveProperty('links.reddit');
    expect(event).toHaveProperty('links.article');
    expect(event).toHaveProperty('links.wikipedia');
  });
});
