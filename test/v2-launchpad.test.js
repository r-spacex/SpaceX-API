
const request = require('supertest');
const app = require('../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                     Launchpads V2
//------------------------------------------------------------

test('It should return all launchpads', () => {
  return request(app).get('/v2/launchpads').then((response) => {
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(8);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('full_name');
      expect(item).toHaveProperty('status');
      expect(item).toHaveProperty('vehicles_launched');
      expect(item).toHaveProperty('details');
    });
  });
});

test('It should return LC-39A info', () => {
  return request(app).get('/v2/launchpads/ksc_lc_39a').then((response) => {
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('ksc_lc_39a');
  });
});

test('It should return no launchpad info', () => {
  return request(app).get('/v2/launchpads/ksc_lc_40a').then((response) => {
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('');
  });
});
