
const request = require('supertest');
const app = require('../../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                        All Cores
//------------------------------------------------------------

test('It should return all v3 cores', async () => {
  const response = await request(app.callback()).get('/v3/cores');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('core_serial');
    expect(item).toHaveProperty('status');
    expect(item).toHaveProperty('original_launch');
    expect(item).toHaveProperty('original_launch_unix');
    expect(item).toHaveProperty('reuse_count');
    expect(item).toHaveProperty('rtls_attempts');
    expect(item).toHaveProperty('rtls_landings');
    expect(item).toHaveProperty('asds_attempts');
    expect(item).toHaveProperty('asds_landings');
    expect(item).toHaveProperty('water_landing');
    expect(item).toHaveProperty('details');
  });
});

//------------------------------------------------------------
//                      All Cores Error
//------------------------------------------------------------

test('It should return an empty cores array', async () => {
  const response = await request(app.callback()).get('/v3/cores?core_serial=B1000');
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});

//------------------------------------------------------------
//                       One Core
//------------------------------------------------------------

test('It should return core B0007', async () => {
  const response = await request(app.callback()).get('/v3/cores/B0007');
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('core_serial', 'B0007');
});

//------------------------------------------------------------
//                     One Core Error
//------------------------------------------------------------

test('It should return a cores 404 error msg', async () => {
  const response = await request(app.callback()).get('/v3/cores/B1000');
  expect(response.statusCode).toBe(404);
  expect(response.body).toEqual({ error: 'Not Found' });
});
