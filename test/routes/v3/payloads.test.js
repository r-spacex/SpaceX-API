
const request = require('supertest');
const app = require('../../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                     All Payloads Test
//------------------------------------------------------------

test('It should return all payloads', async () => {
  const response = await request(app.callback()).get('/v3/payloads');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('payload_id', 'FalconSAT-2');
});

test('It should return all Dragon 1.0 payloads', async () => {
  const response = await request(app.callback()).get('/v3/payloads?payload_type=Dragon%201.0');
  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBe(5);
});

test('It should return 5 Satellite payloads in decending order', async () => {
  const response = await request(app.callback()).get('/v3/payloads?payload_type=Satellite&order=desc&limit=5');
  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBe(5);
});

test('All launches with dragon should have a null fairings property', async () => {
  const dragon1 = await request(app.callback()).get('/v3/launches?payload_type=Dragon%201.1');
  const dragon2 = await request(app.callback()).get('/v3/launches?payload_type=Crew%20Dragon');
  expect(dragon1.statusCode).toBe(200);
  expect(dragon2.statusCode).toBe(200);
  dragon1.body.forEach((launch) => {
    expect(launch.rocket.fairings).toBe(null);
  });
  dragon2.body.forEach((launch) => {
    expect(launch.rocket.fairings).toBe(null);
  });
});

//------------------------------------------------------------
//                     One Payload Test
//------------------------------------------------------------

test('It should return only the CASSIOPE payload', async () => {
  const response = await request(app.callback()).get('/v3/payloads/CASSIOPE');
  expect(response.statusCode).toBe(200);
  expect(response.body.payload_id).toBe('CASSIOPE');
});

//------------------------------------------------------------
//                     One Payload Error Test
//------------------------------------------------------------

test('It should return 404 with error msg', async () => {
  const response = await request(app.callback()).get('/v3/payloads/CASSIOP');
  expect(response.statusCode).toBe(404);
  expect(response.body).toEqual({ error: 'Not Found' });
});
