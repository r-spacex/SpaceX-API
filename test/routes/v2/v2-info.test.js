
const request = require('supertest');
const app = require('../../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                        Company Info
//------------------------------------------------------------

test('It should return company info', async () => {
  const response = await request(app.callback()).get('/v2/info');
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('name', 'SpaceX');
  expect(response.body).toHaveProperty('founder', 'Elon Musk');
  expect(response.body).toHaveProperty('founded', 2002);
  expect(response.body).toHaveProperty('employees');
  expect(response.body).toHaveProperty('vehicles');
  expect(response.body).toHaveProperty('launch_sites');
  expect(response.body).toHaveProperty('test_sites');
  expect(response.body).toHaveProperty('ceo');
  expect(response.body).toHaveProperty('cto');
  expect(response.body).toHaveProperty('coo');
  expect(response.body).toHaveProperty('cto_propulsion');
  expect(response.body).toHaveProperty('valuation');
  expect(response.body).toHaveProperty('headquarters.address', 'Rocket Road');
  expect(response.body).toHaveProperty('headquarters.city', 'Hawthorne');
  expect(response.body).toHaveProperty('headquarters.state', 'California');
  expect(response.body).toHaveProperty('summary');
});

//------------------------------------------------------------
//                Falcon Heavy Roadster Info
//------------------------------------------------------------

test('It should return roadster info', async () => {
  const response = await request(app.callback()).get('/v2/info/roadster');
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('name', 'Elon Musk\'s Tesla Roadster');
  expect(response.body).toHaveProperty('apoapsis_au', expect.any(Number));
  expect(response.body).toHaveProperty('periapsis_au', expect.any(Number));
  expect(response.body).toHaveProperty('semi_major_axis_au', expect.any(Number));
  expect(response.body).toHaveProperty('eccentricity', expect.any(Number));
  expect(response.body).toHaveProperty('inclination', expect.any(Number));
  expect(response.body).toHaveProperty('longitude', expect.any(Number));
  expect(response.body).toHaveProperty('periapsis_arg', expect.any(Number));
  expect(response.body).toHaveProperty('period_days', expect.any(Number));
  expect(response.body).toHaveProperty('speed_kph', expect.any(Number));
  expect(response.body).toHaveProperty('speed_mph', expect.any(Number));
  expect(response.body).toHaveProperty('earth_distance_km', expect.any(Number));
  expect(response.body).toHaveProperty('earth_distance_mi', expect.any(Number));
  expect(response.body).toHaveProperty('mars_distance_km', expect.any(Number));
  expect(response.body).toHaveProperty('mars_distance_mi', expect.any(Number));
});
