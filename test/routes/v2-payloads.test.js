
const request = require('supertest');
const app = require('../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                     All Payloads Test
//------------------------------------------------------------

test('It should return 404 error', async () => {
  const response = await request(app.callback()).get('/v2/payloads');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('payload_id', 'FalconSAT-2');
});

//------------------------------------------------------------
//                     One Payload Test
//------------------------------------------------------------

test('It should return 500 error', async () => {
  const response = await request(app.callback()).get('/v2/payloads/CASSIOPE');
  expect(response.statusCode).toBe(200);
  expect(response.body.payload_id).toBe('CASSIOPE');
});

//------------------------------------------------------------
//                     One Payload Error Test
//------------------------------------------------------------

test('It should return 500 error', async () => {
  const response = await request(app.callback()).get('/v2/payloads/CASSIOP');
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});
