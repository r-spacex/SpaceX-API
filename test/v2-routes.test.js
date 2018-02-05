
const request = require('supertest');
const app = require('../src/app');
const customMatchers = require('./utilities/custom-asymmetric-matchers');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                    Upcoming Launches V2
//------------------------------------------------------------

test('It should return all upcoming launches', () => {
  return request(app.listen()).get('/v2/launches/upcoming').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('flight_number', expect.anything());
      expect(item).toHaveProperty('launch_year');
      expect(item).toHaveProperty('launch_date_unix');
      expect(item).toHaveProperty('launch_date_utc');
      expect(item).toHaveProperty('launch_date_local');
      expect(item).toHaveProperty('rocket.rocket_id');
      expect(item).toHaveProperty('rocket.rocket_name');
      expect(item).toHaveProperty('rocket.rocket_type');
      expect(item.rocket.first_stage.cores.length).toBeGreaterThan(0);
      item.rocket.first_stage.cores.forEach((core) => {
        expect(core).toHaveProperty('core_serial');
        expect(core).toHaveProperty('reused');
        expect(core).toHaveProperty('land_success');
        expect(core).toHaveProperty('landing_type');
        expect(core).toHaveProperty('landing_vehicle');
      });
      expect(item.rocket.second_stage.payloads.length).toBeGreaterThan(0);
      if (item.hasOwnProperty.call('cap_serial')) {
        item.rocket.second_stage.payloads.forEach((payload) => {
          expect(payload).toHaveProperty('payload_id');
          expect(payload).toHaveProperty('reused');
          expect(payload).toHaveProperty('cap_serial');
          expect(payload.customers.length).toBeGreaterThan(0);
          expect(payload).toHaveProperty('payload_mass_kg');
          expect(payload).toHaveProperty('payload_mass_lbs');
          expect(payload).toHaveProperty('orbit');
          expect(payload).toHaveProperty('mass_returned_kg');
          expect(payload).toHaveProperty('mass_returned_lbs');
          expect(payload).toHaveProperty('flight_time_sec');
          expect(payload).toHaveProperty('cargo_manifest');
        });
      } else {
        item.rocket.second_stage.payloads.forEach((payload) => {
          expect(payload).toHaveProperty('payload_id');
          expect(payload).toHaveProperty('reused');
          expect(payload.customers.length).toBeGreaterThan(0);
          expect(payload).toHaveProperty('payload_mass_kg');
          expect(payload).toHaveProperty('payload_mass_lbs');
          expect(payload).toHaveProperty('orbit');
        });
      }
      expect(item).toHaveProperty('telemetry.flight_club');
      expect(item).toHaveProperty('reuse.core');
      expect(item).toHaveProperty('reuse.side_core1');
      expect(item).toHaveProperty('reuse.side_core2');
      expect(item).toHaveProperty('reuse.fairings');
      expect(item).toHaveProperty('reuse.capsule');
      expect(item).toHaveProperty('launch_site.site_id');
      expect(item).toHaveProperty('launch_site.site_name');
      expect(item).toHaveProperty('launch_site.site_name_long');
      expect(item).toHaveProperty('launch_success');
      expect(item).toHaveProperty('links');
      expect(item).toHaveProperty('details');
    });
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

//------------------------------------------------------------
//                     Latest Launch Test
//------------------------------------------------------------

test('It should return the latest launch', () => {
  return request(app).get('/v2/launches/latest').then((response) => {
    expect(response.statusCode).toBe(200);
  });
});

//------------------------------------------------------------
//                     404 Test
//------------------------------------------------------------

test('It should return 404 error', () => {
  return request(app).get('/v1').then((response) => {
    expect(response.statusCode).toBe(404);
  });
});
