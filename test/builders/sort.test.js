
const request = require('supertest');
const app = require('../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                     Launch Sort Test
//------------------------------------------------------------

test('It should return launches sorted by flight id', async () => {
  const response = await request(app.callback()).get('/v2/launches?sort=flight_id&id=true');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('_id', '596eb600611279d39a00003c');
});

test('It should return launches sorted by flight number', async () => {
  const response = await request(app.callback()).get('/v2/launches?sort=flight_number');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('flight_number', 1);
});

test('It should return launches sorted by launch_year', async () => {
  const response = await request(app.callback()).get('/v2/launches?sort=launch_year&order=desc');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1]).toHaveProperty('flight_number', 1);
});

test('It should return launches sorted by utc launch date', async () => {
  const response = await request(app.callback()).get('/v2/launches?sort=launch_date_utc&order=desc');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1]).toHaveProperty('flight_number', 1);
});

test('It should return launches sorted by local launch date', async () => {
  const response = await request(app.callback()).get('/v2/launches?sort=launch_date_local&order=desc');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1]).toHaveProperty('flight_number', 1);
});

//------------------------------------------------------------
//                    Core Sort Test
//------------------------------------------------------------

test('It should return cores sorted by core serial', async () => {
  const response = await request(app.callback()).get('/v2/parts/cores?sort=core_serial');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('core_serial', 'B0003');
});

test('It should return cores sorted by block number', async () => {
  const response = await request(app.callback()).get('/v2/parts/cores?sort=block');
  expect(response.statusCode).toBe(200);
  expect(response.body[5]).toHaveProperty('block', 1);
});

test('It should return cores sorted by core status', async () => {
  const response = await request(app.callback()).get('/v2/parts/cores?sort=status');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('status', 'active');
});

test('It should return cores sorted by original launch date', async () => {
  const response = await request(app.callback()).get('/v2/parts/cores?sort=original_launch');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('original_launch');
});

test('It should return cores sorted by rtls attempts', async () => {
  const response = await request(app.callback()).get('/v2/parts/cores?sort=rtls_attempt');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('rtls_attempt', false);
});

test('It should return cores sorted by rtls landings', async () => {
  const response = await request(app.callback()).get('/v2/parts/cores?sort=rtls_landings');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('rtls_landings', 0);
});

test('It should return cores sorted by asds attempts', async () => {
  const response = await request(app.callback()).get('/v2/parts/cores?sort=asds_attempt');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('asds_attempt', false);
});

test('It should return cores sorted by asds landings', async () => {
  const response = await request(app.callback()).get('/v2/parts/cores?sort=asds_landings');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('asds_landings', 0);
});

test('It should return cores sorted by water landings', async () => {
  const response = await request(app.callback()).get('/v2/parts/cores?sort=water_landing');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('water_landing', false);
});

//------------------------------------------------------------
//                   Capsule Sort Test
//------------------------------------------------------------

test('It should return capsules sorted by capsule serial', async () => {
  const response = await request(app.callback()).get('/v2/parts/caps?sort=capsule_serial');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('capsule_serial', 'C101');
});

test('It should return capsules sorted by capsule id', async () => {
  const response = await request(app.callback()).get('/v2/parts/caps?sort=capsule_id');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('capsule_id', 'dragon1');
});

test('It should return capsules sorted by capsule status', async () => {
  const response = await request(app.callback()).get('/v2/parts/caps?sort=status&capsule_id=dragon1&order=desc');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('status', 'unknown');
});

test('It should return capsules sorted by original launch date', async () => {
  const response = await request(app.callback()).get('/v2/parts/caps?sort=original_launch&capsule_id=dragon1');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('original_launch', '2010-12-08T15:43:00.000Z');
});

test('It should return capsules sorted by capsule landings', async () => {
  const response = await request(app.callback()).get('/v2/parts/caps?sort=landings');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('landings', 0);
});

test('It should return capsules sorted by capsule type', async () => {
  const response = await request(app.callback()).get('/v2/parts/caps?sort=type');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('type', 'Dragon 1.0');
});

//------------------------------------------------------------
//                     History Sort Test
//------------------------------------------------------------

test('It should return history sorted by flight number', async () => {
  const response = await request(app.callback()).get('/v2/info/history?sort=flight_number&order=desc');
  expect(response.statusCode).toBe(200);
  expect(response.body[13]).toHaveProperty('flight_number', 4);
});

test('It should return history sorted by event utc date', async () => {
  const response = await request(app.callback()).get('/v2/info/history?sort=event_date_utc');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('flight_number', 4);
});
