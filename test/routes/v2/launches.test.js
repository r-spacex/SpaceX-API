
const request = require('supertest');
const app = require('../../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                        All Launches
//------------------------------------------------------------

test('It should return all launches', async () => {
  const response = await request(app.callback()).get('/v2/launches/all');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('flight_number', expect.anything());
    expect(item).toHaveProperty('mission_name');
    expect(item).toHaveProperty('launch_year', expect.stringMatching(/^[0-9]{4}$/));
    expect(item).toHaveProperty('launch_date_unix');
    expect(item).toHaveProperty('launch_date_utc');
    expect(item).toHaveProperty('launch_date_local');
    expect(item).toHaveProperty('rocket.rocket_id');
    expect(item).toHaveProperty('rocket.rocket_name');
    expect(item).toHaveProperty('rocket.rocket_type');
    expect(item.rocket.first_stage.cores.length).toBeGreaterThan(0);
    item.rocket.first_stage.cores.forEach((core) => {
      expect(core).toHaveProperty('core_serial');
      expect(core).toHaveProperty('flight');
      expect(core).toHaveProperty('block');
      expect(core).toHaveProperty('reused');
      expect(core).toHaveProperty('land_success');
      expect(core).toHaveProperty('landing_type');
      expect(core).toHaveProperty('landing_vehicle');
    });
    expect(item.rocket.second_stage).toHaveProperty('block');
    expect(item.rocket.second_stage.payloads.length).toBeGreaterThan(0);
    if (item.hasOwnProperty.call('cap_serial')) {
      item.rocket.second_stage.payloads.forEach((payload) => {
        expect(payload).toHaveProperty('payload_id');
        expect(payload).toHaveProperty('reused');
        expect(payload).toHaveProperty('cap_serial');
        expect(payload.customers.length).toBeGreaterThanOrEqual(0);
        expect(payload).toHaveProperty('payload_mass_kg');
        expect(payload).toHaveProperty('payload_mass_lbs');
        expect(payload).toHaveProperty('orbit');
        expect(payload).toHaveProperty('orbit_params');
        expect(payload).toHaveProperty('orbit_params.reference_system');
        expect(payload).toHaveProperty('orbit_params.regime');
        expect(payload).toHaveProperty('orbit_params.longitude');
        expect(payload).toHaveProperty('orbit_params.semi_major_axis_km');
        expect(payload).toHaveProperty('orbit_params.eccentricity');
        expect(payload).toHaveProperty('orbit_params.periapsis_km');
        expect(payload).toHaveProperty('orbit_params.apoapsis_km');
        expect(payload).toHaveProperty('orbit_params.inclination_deg');
        expect(payload).toHaveProperty('orbit_params.period_min');
        expect(payload).toHaveProperty('orbit_params.lifespan_years');
        expect(payload).toHaveProperty('mass_returned_kg');
        expect(payload).toHaveProperty('mass_returned_lbs');
        expect(payload).toHaveProperty('flight_time_sec');
        expect(payload).toHaveProperty('cargo_manifest');
      });
    } else {
      item.rocket.second_stage.payloads.forEach((payload) => {
        expect(payload).toHaveProperty('payload_id');
        expect(payload).toHaveProperty('reused');
        expect(payload.customers.length).toBeGreaterThanOrEqual(0);
        expect(payload).toHaveProperty('payload_mass_kg');
        expect(payload).toHaveProperty('payload_mass_lbs');
        expect(payload).toHaveProperty('orbit');
        expect(payload).toHaveProperty('orbit_params');
        expect(payload).toHaveProperty('orbit_params.reference_system');
        expect(payload).toHaveProperty('orbit_params.regime');
        expect(payload).toHaveProperty('orbit_params.longitude');
        expect(payload).toHaveProperty('orbit_params.semi_major_axis_km');
        expect(payload).toHaveProperty('orbit_params.eccentricity');
        expect(payload).toHaveProperty('orbit_params.periapsis_km');
        expect(payload).toHaveProperty('orbit_params.apoapsis_km');
        expect(payload).toHaveProperty('orbit_params.inclination_deg');
        expect(payload).toHaveProperty('orbit_params.period_min');
        expect(payload).toHaveProperty('orbit_params.lifespan_years');
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

//------------------------------------------------------------
//                       Latest Launch
//------------------------------------------------------------

test('It should return the latest launch', async () => {
  const response = await request(app.callback()).get('/v2/launches/latest');
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('upcoming', false);
});

//------------------------------------------------------------
//                       Next Launch
//------------------------------------------------------------

test('It should return the next launch', async () => {
  const response = await request(app.callback()).get('/v2/launches/next');
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('upcoming', true);
});

//------------------------------------------------------------
//                       Past Launches
//------------------------------------------------------------

test('It should return the all launches', async () => {
  const response = await request(app.callback()).get('/v2/launches');
  expect(response.statusCode).toBe(200);
  response.body.forEach((launch) => {
    expect(launch.upcoming).toBe(false);
  });
});

test('It should return no launches due to invalid date', async () => {
  const response = await request(app.callback()).get('/v2/launches?start=2020-25-23&end=2020-25-24');
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});

test('It should return no launches due to invalid UTC date', async () => {
  const response = await request(app.callback()).get('/v2/launches?launch_date_utc=2011-25-05T14:48:00.000Z');
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});

//------------------------------------------------------------
//                       Upcoming Launches
//------------------------------------------------------------

test('It should return the next launch', async () => {
  const response = await request(app.callback()).get('/v2/launches/upcoming');
  expect(response.statusCode).toBe(200);
  response.body.forEach((launch) => {
    expect(launch.upcoming).toBe(true);
  });
});
