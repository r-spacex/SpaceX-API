
const request = require('supertest');
const order = require('../../../src/lib/query-builder/v3/order');
const app = require('../../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

test('It should return past launches sorted from smallest to greatest', async () => {
  const response = await request(app.callback()).get('/v3/launches?order=asc');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('flight_number', 1);
});

test('It should return past launches sorted from greatest to smallest', async () => {
  const response = await request(app.callback()).get('/v3/launches?order=desc');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1]).toHaveProperty('flight_number', 1);
});

test('It should return history sorted from smallest to greatest', async () => {
  const response = await request(app.callback()).get('/v3/history?order=asc');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('flight_number', 4);
});

test('It should return history sorted from greatest to smallest', async () => {
  const response = await request(app.callback()).get('/v3/history?order=desc');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1]).toHaveProperty('flight_number', 4);
});

test('It should return acending sort direction', () => {
  const query = {
    order: 'asc',
  };
  const data = order(query);
  expect(data).toEqual(1);
});

test('It should return decending sort direction', () => {
  const query = {
    order: 'desc',
  };
  const data = order(query);
  expect(data).toEqual(-1);
});

test('It should return the default sort direction', () => {
  const query = {};
  const data = order(query);
  expect(data).toEqual(1);
});
