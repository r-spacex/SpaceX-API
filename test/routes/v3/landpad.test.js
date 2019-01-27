
const request = require('supertest');
const app = require('../../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                        Landpads
//------------------------------------------------------------

test('It should return all landing pads', async () => {
  const response = await request(app.callback()).get('/v3/landpads');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('full_name');
    expect(item).toHaveProperty('status');
    expect(item).toHaveProperty('landing_type');
    expect(item).toHaveProperty('successful_landings');
    expect(item).toHaveProperty('attempted_landings');
  });
});

test('It should return LZ-4 info', async () => {
  const response = await request(app.callback()).get('/v3/landpads/LZ-4');
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('id', 'LZ-4');
});

test('It should return no landpad info', async () => {
  const response = await request(app.callback()).get('/v3/landpads/LZ-25');
  expect(response.statusCode).toBe(404);
});
