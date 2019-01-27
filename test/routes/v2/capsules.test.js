
const request = require('supertest');
const app = require('../../../src/app');
const customMatchers = require('../../utils/custom-asymmetric-matchers');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                         Dragon
//------------------------------------------------------------

test('It should return all Dragon data', async () => {
  const response = await request(app.callback()).get('/v2/capsules');
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
    expect(item).toHaveProperty('flickr_images');
  });
});

//------------------------------------------------------------
//                     Individual Capsule
//------------------------------------------------------------

test('It should return dragon1 capsule', async () => {
  const response = await request(app.callback()).get('/v2/capsules/dragon1');
  expect(response.statusCode).toBe(200);
});
