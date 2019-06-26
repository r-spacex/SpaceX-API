
const request = require('supertest');
const app = require('../../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                       All Ships
//------------------------------------------------------------

test('It should return all ships', async () => {
  const response = await request(app.callback()).get('/v3/ships');
  expect(response.statusCode).toBe(200);
  response.body.forEach((event) => {
    expect(event).toHaveProperty('ship_id', expect.any(String));
    expect(event).toHaveProperty('ship_name', expect.any(String));
    expect(event).toHaveProperty('ship_model');
    expect(event).toHaveProperty('ship_type');
    expect(event).toHaveProperty('roles', expect.any(Array));
    expect(event).toHaveProperty('active', expect.any(Boolean));
    expect(event).toHaveProperty('imo');
    expect(event).toHaveProperty('mmsi');
    expect(event).toHaveProperty('abs');
    expect(event).toHaveProperty('class');
    expect(event).toHaveProperty('weight_lbs');
    expect(event).toHaveProperty('weight_kg');
    expect(event).toHaveProperty('year_built');
    expect(event).toHaveProperty('home_port');
    expect(event).toHaveProperty('status');
    expect(event).toHaveProperty('speed_kn');
    expect(event).toHaveProperty('course_deg');
    expect(event).toHaveProperty('position.latitude');
    expect(event).toHaveProperty('position.longitude');
    expect(event).toHaveProperty('successful_landings');
    expect(event).toHaveProperty('attempted_landings');
    expect(event).toHaveProperty('missions');
    expect(event).toHaveProperty('url');
  });
});

//------------------------------------------------------------
//                      All Ships Error
//------------------------------------------------------------

test('It should return an empty array', async () => {
  const response = await request(app.callback()).get('/v3/ships?ship_id=MRSTEVEN');
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});

//------------------------------------------------------------
//                      One Ship
//------------------------------------------------------------

test('It should return one ship', async () => {
  const response = await request(app.callback()).get('/v3/ships/GOMSTREE');
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('ship_id', 'GOMSTREE');
});

//------------------------------------------------------------
//                      One Ship Error
//------------------------------------------------------------

test('It should return a 404 error msg', async () => {
  const response = await request(app.callback()).get('/v3/ships/MRSTEVEN');
  expect(response.statusCode).toBe(404);
  expect(response.body).toEqual({ error: 'Not Found' });
});
