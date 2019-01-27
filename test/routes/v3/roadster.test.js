
const request = require('supertest');
const app = require('../../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                Falcon Heavy Roadster Info
//------------------------------------------------------------

test('It should return roadster info', async () => {
  const response = await request(app.callback()).get('/v3/roadster');
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
  expect(response.body).toHaveProperty('flickr_images');
});
