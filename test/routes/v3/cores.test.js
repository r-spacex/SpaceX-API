
const request = require('supertest');
const app = require('../../../src/app');

beforeAll(done => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                        Cores
//------------------------------------------------------------

test('It should return all v3 cores', async () => {
  const response = await request(app.callback()).get('/v3/cores');
  expect(response.statusCode).toBe(200);
  response.body.forEach(item => {
    expect(item).toHaveProperty('core_serial');
    expect(item).toHaveProperty('status');
    expect(item).toHaveProperty('original_launch');
    expect(item).toHaveProperty('original_launch_unix');
    expect(item).toHaveProperty('rtls_attempt');
    expect(item).toHaveProperty('rtls_landings');
    expect(item).toHaveProperty('asds_attempt');
    expect(item).toHaveProperty('asds_landings');
    expect(item).toHaveProperty('water_landing');
    expect(item).toHaveProperty('details');
  });
});

test('It should return core B0007', async () => {
  const response = await request(app.callback()).get('/v3/cores/B0007');
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('core_serial', 'B0007');
});
