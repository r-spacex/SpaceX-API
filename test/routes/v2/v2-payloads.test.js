
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
  const response = await request(app.callback()).get('/v2/payloads');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('payload_id', 'FalconSAT-2');
});

test('It should return all Dragon 1.0 payloads', async () => {
  const response = await request(app.callback()).get('/v2/payloads?payload_type=Dragon%201.0');
  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBe(5);
});

test('It should return 5 Satellite payloads in decending order', async () => {
  const response = await request(app.callback()).get('/v2/payloads?payload_type=Satellite&order=desc&limit=5');
  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBe(5);
});

//------------------------------------------------------------
//                     One Payload Test
//------------------------------------------------------------

test('It should return only the CASSIOPE payload', async () => {
  const response = await request(app.callback()).get('/v2/payloads/CASSIOPE');
  expect(response.statusCode).toBe(200);
  expect(response.body.payload_id).toBe('CASSIOPE');
});

//------------------------------------------------------------
//                     One Payload Error Test
//------------------------------------------------------------

test('It should return an empty array with no results', async () => {
  const response = await request(app.callback()).get('/v2/payloads/CASSIOP');
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});
