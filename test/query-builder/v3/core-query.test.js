
const request = require('supertest');
const app = require('../../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                     Core Query Test
//------------------------------------------------------------

test('It should return core serial B1041', async () => {
  const response = await request(app.callback()).get('/v3/cores?core_serial=B1041');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('core_serial', 'B1041');
  });
});

test('It should return all block 4 cores', async () => {
  const response = await request(app.callback()).get('/v3/cores?block=4');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('block');
  });
});

test('It should return all cores with active status', async () => {
  const response = await request(app.callback()).get('/v3/cores?status=active');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('status', 'active');
  });
});

test('It should return core B1041 with the correct launch date', async () => {
  const response = await request(app.callback()).get('/v3/cores?original_launch=2017-10-09T12:37:00Z');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('original_launch', '2017-10-09T12:37:00Z');
  });
});

test('It should return core for Iridium NEXT 21-30', async () => {
  const response = await request(app.callback()).get('/v3/cores?mission=Iridium+NEXT+21-30');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('missions');
  });
});

test('It should return core with an active status', async () => {
  const response = await request(app.callback()).get('/v3/cores?status=active');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('status', 'active');
  });
});

test('It should return cores with rtls attempts', async () => {
  const response = await request(app.callback()).get('/v3/cores?rtls_attempts=2');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('rtls_attempts', 2);
  });
});

test('It should return cores with 1 rtls landings', async () => {
  const response = await request(app.callback()).get('/v3/cores?rtls_landings=1');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('rtls_landings', 1);
  });
});

test('It should return cores with asds attempts', async () => {
  const response = await request(app.callback()).get('/v3/cores?asds_attempts=1');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('asds_attempts', 1);
  });
});

test('It should return cores with 1 asds landing', async () => {
  const response = await request(app.callback()).get('/v3/cores?asds_landings=1');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('asds_landings', 1);
  });
});

test('It should return cores with water landings', async () => {
  const response = await request(app.callback()).get('/v3/cores?water_landing=true');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('water_landing', true);
  });
});
