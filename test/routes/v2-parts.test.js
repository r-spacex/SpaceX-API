
const request = require('supertest');
const app = require('../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                     Capsule V2
//------------------------------------------------------------

test('It should return all v2 capsules', () => {
  return request(app).get('/v2/parts/caps').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('capsule_serial');
      expect(item).toHaveProperty('capsule_id');
      expect(item).toHaveProperty('status');
      expect(item).toHaveProperty('original_launch');
      expect(item.missions.length).toBeGreaterThan(0);
      expect(item).toHaveProperty('landings');
      expect(item).toHaveProperty('type');
      expect(item).toHaveProperty('details');
    });
  });
});

test('It should return capsule C101', () => {
  return request(app).get('/v2/parts/caps/C101').then((response) => {
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('capsule_serial', 'C101');
  });
});

//------------------------------------------------------------
//                     Core V2
//------------------------------------------------------------

test('It should return all v2 cores', () => {
  return request(app).get('/v2/parts/cores').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('core_serial');
      expect(item).toHaveProperty('status');
      expect(item).toHaveProperty('original_launch');
      expect(item.missions.length).toBeGreaterThan(0);
      expect(item).toHaveProperty('rtls_attempt');
      expect(item).toHaveProperty('rtls_landings');
      expect(item).toHaveProperty('asds_attempt');
      expect(item).toHaveProperty('asds_landings');
      expect(item).toHaveProperty('water_landing');
      expect(item).toHaveProperty('details');
    });
  });
});

test('It should return core B0007', () => {
  return request(app).get('/v2/parts/cores/B0007').then((response) => {
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('core_serial', 'B0007');
  });
});
