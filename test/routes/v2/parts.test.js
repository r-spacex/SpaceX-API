
const request = require('supertest');
const app = require('../../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                        Capsules
//------------------------------------------------------------

test('It should return all v2 capsules', async () => {
  const response = await request(app.callback()).get('/v2/parts/caps');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('capsule_serial');
    expect(item).toHaveProperty('capsule_id');
    expect(item).toHaveProperty('status');
    expect(item).toHaveProperty('original_launch');
    expect(item).toHaveProperty('original_launch_unix');
    expect(item).toHaveProperty('landings');
    expect(item).toHaveProperty('type');
    expect(item).toHaveProperty('details');
  });
});

test('It should return capsule C101', async () => {
  const response = await request(app.callback()).get('/v2/parts/caps/C101');
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('capsule_serial', 'C101');
});

//------------------------------------------------------------
//                        Cores
//------------------------------------------------------------

test('It should return all v2 cores', async () => {
  const response = await request(app.callback()).get('/v2/parts/cores');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('core_serial');
    expect(item).toHaveProperty('status');
    expect(item).toHaveProperty('original_launch');
    expect(item).toHaveProperty('original_launch_unix');
    expect(item).toHaveProperty('rtls_attempts');
    expect(item).toHaveProperty('rtls_landings');
    expect(item).toHaveProperty('asds_attempts');
    expect(item).toHaveProperty('asds_landings');
    expect(item).toHaveProperty('water_landing');
    expect(item).toHaveProperty('details');
  });
});

test('It should return core B0007', async () => {
  const response = await request(app.callback()).get('/v2/parts/cores/B0007');
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('core_serial', 'B0007');
});
