
const request = require('supertest');
const app = require('../../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                     History Query Test
//------------------------------------------------------------

test('It should return all history events', async () => {
  const response = await request(app.callback()).get('/v2/info/history');
  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBeGreaterThanOrEqual(19);
});

test('It should return 2 history items for the year 2008', async () => {
  const response = await request(app.callback()).get('/v2/info/history?start=2008-08-28&end=2009-05-28');
  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBe(2);
});

test('It should history event for flight 14', async () => {
  const response = await request(app.callback()).get('/v2/info/history?flight_number=14');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('flight_number', 14);
});

test('It should return Falcon Heavy Test Flight', async () => {
  const response = await request(app.callback()).get('/v2/info/history?start=1517949800&end=1517949999');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('title', 'Falcon Heavy Test Flight');
});

test('It should return an empty array due to invalid date', async () => {
  const response = await request(app.callback()).get('/v2/info/history?start=2020-25-23&end=2020-25-24');
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});
