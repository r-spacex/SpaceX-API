
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

//------------------------------------------------------------
//                    Core Sort Test
//------------------------------------------------------------

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
