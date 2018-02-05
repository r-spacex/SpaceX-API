
const request = require('supertest');
const app = require('../src/app');
const customMatchers = require('./utilities/custom-asymmetric-matchers');

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

//------------------------------------------------------------
//                    Dragon V2
//------------------------------------------------------------

test('It should return Dragon data', () => {
  return request(app).get('/v2/capsules').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('crew_capacity', expect.any(Number));
      expect(item).toHaveProperty('sidewall_angle_deg', expect.any(Number));
      expect(item).toHaveProperty('orbit_duration_yr', expect.any(Number));
      expect(item).toHaveProperty('heat_shield.dev_partner', expect.any(String));
      expect(item).toHaveProperty('heat_shield.material', expect.any(String));
      expect(item).toHaveProperty('heat_shield.size_meters', expect.any(Number));
      expect(item).toHaveProperty('heat_shield.temp_degrees', expect.any(Number));
      item.thrusters.forEach((thruster) => {
        expect(thruster).toHaveProperty('type', expect.any(String));
        expect(thruster).toHaveProperty('amount', expect.any(Number));
        expect(thruster).toHaveProperty('pods', expect.any(Number));
        expect(thruster).toHaveProperty('fuel_1', expect.any(String));
        expect(thruster).toHaveProperty('fuel_2', expect.any(String));
        expect(thruster).toHaveProperty('thrust.kN', expect.any(Number));
        expect(thruster).toHaveProperty('thrust.lbf', expect.any(Number));
      });
      expect(item).toHaveProperty('launch_payload_mass', customMatchers.mass());
      expect(item).toHaveProperty('launch_payload_vol', customMatchers.volume());
      expect(item).toHaveProperty('return_payload_mass', customMatchers.mass());
      expect(item).toHaveProperty('return_payload_vol', customMatchers.volume());
      expect(item).toHaveProperty('pressurized_capsule.payload_volume', customMatchers.volume());
      expect(item).toHaveProperty('trunk.cargo.solar_array', expect.any(Number));
      expect(item).toHaveProperty('trunk.cargo.unpressurized_cargo', expect.any(Boolean));
      expect(item).toHaveProperty('trunk.trunk_volume', customMatchers.volume());
      expect(item).toHaveProperty('height_w_trunk', customMatchers.length());
      expect(item).toHaveProperty('diameter', customMatchers.length());
    });
  });
});

//------------------------------------------------------------
//                     Individual Capsule V2
//------------------------------------------------------------

test('It should return all v2 capsules', () => {
  return request(app).get('/v2/capsules/C106').then((response) => {
    expect(response.statusCode).toBe(200);
  });
});
