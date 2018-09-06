
const request = require('supertest');
const app = require('../../../src/app');

beforeAll(done => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                        Capsules
//------------------------------------------------------------

test('It should return all v3 capsules', async () => {
  const response = await request(app.callback()).get('/v3/capsules');
  expect(response.statusCode).toBe(200);
  response.body.forEach(item => {
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
  const response = await request(app.callback()).get('/v3/capsules/C101');
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('capsule_serial', 'C101');
});
