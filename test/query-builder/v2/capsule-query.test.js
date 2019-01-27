
const request = require('supertest');
const app = require('../../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                     Capsule Query Test
//------------------------------------------------------------

test('It should return capsule serial C113', async () => {
  const response = await request(app.callback()).get('/v2/parts/caps?capsule_serial=C113');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('capsule_serial', 'C113');
  });
});

test('It should return capsule id dragon1', async () => {
  const response = await request(app.callback()).get('/v2/parts/caps?capsule_id=dragon1');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('capsule_id', 'dragon1');
  });
});

test('It should return capsules with an active status', async () => {
  const response = await request(app.callback()).get('/v2/parts/caps?status=active');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('status', 'active');
  });
});

test('It should return capsule C113 with the correct launch date', async () => {
  const response = await request(app.callback()).get('/v2/parts/caps?original_launch=2017-08-14T16:31:00.000Z');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('original_launch', '2017-08-14T16:31:00.000Z');
  });
});

test('It should return capsule for CRS-12', async () => {
  const response = await request(app.callback()).get('/v2/parts/caps?mission=SpaceX+CRS-12');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('missions');
  });
});

test('It should return capsule with number of landings', async () => {
  const response = await request(app.callback()).get('/v2/parts/caps?landings=1');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('landings', 1);
  });
});

test('It should return capsule with type of Dragon 1.1', async () => {
  const response = await request(app.callback()).get('/v2/parts/caps?type=Dragon+1.1');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('type', 'Dragon 1.1');
  });
});
