
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
  const response = await request(app.callback()).get('/v3/launches');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('flight_number', expect.anything());
    expect(item).toHaveProperty('mission_name');
    expect(item).toHaveProperty('mission_id');
    expect(item).toHaveProperty('launch_year', expect.stringMatching(/^[0-9]{4}$/));
    expect(item).toHaveProperty('launch_date_unix');
    expect(item).toHaveProperty('launch_date_utc');
    expect(item).toHaveProperty('launch_date_local');
    expect(item).toHaveProperty('is_tentative');
    expect(item).toHaveProperty('tentative_max_precision');
    expect(item).toHaveProperty('tbd');
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
        expect(payload).toHaveProperty('orbit_params.epoch');
        expect(payload).toHaveProperty('orbit_params.mean_motion');
        expect(payload).toHaveProperty('orbit_params.raan');
        expect(payload).toHaveProperty('orbit_params.mean_anomaly');
        expect(payload).toHaveProperty('orbit_params.arg_of_pericenter');
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
        expect(payload).toHaveProperty('orbit_params.epoch');
        expect(payload).toHaveProperty('orbit_params.mean_motion');
        expect(payload).toHaveProperty('orbit_params.raan');
      });
    }
    expect(item).toHaveProperty('telemetry.flight_club');
    expect(item).toHaveProperty('launch_site.site_id');
    expect(item).toHaveProperty('launch_site.site_name');
    expect(item).toHaveProperty('launch_site.site_name_long');
    expect(item).toHaveProperty('ships');
    expect(item).toHaveProperty('launch_success');
    expect(item).toHaveProperty('links');
    expect(item).toHaveProperty('links.flickr_images');
    expect(item).toHaveProperty('links.video_link');
    expect(item).toHaveProperty('links.youtube_id');
    expect(item).toHaveProperty('links.mission_patch');
    expect(item).toHaveProperty('links.mission_patch_small');
    expect(item).toHaveProperty('links.reddit_campaign');
    expect(item).toHaveProperty('links.reddit_launch');
    expect(item).toHaveProperty('links.reddit_recovery');
    expect(item).toHaveProperty('links.reddit_media');
    expect(item).toHaveProperty('links.presskit');
    expect(item).toHaveProperty('links.article_link');
    expect(item).toHaveProperty('links.wikipedia');
    expect(item).toHaveProperty('details');
    expect(item).toHaveProperty('static_fire_date_utc');
    expect(item).toHaveProperty('static_fire_date_unix');
  });
});

//------------------------------------------------------------
//                       Latest Launch
//------------------------------------------------------------

test('It should return the latest launch', async () => {
  const response = await request(app.callback()).get('/v3/launches/latest');
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('upcoming', false);
});

//------------------------------------------------------------
//                       Next Launch
//------------------------------------------------------------

test('It should return the next launch', async () => {
  const response = await request(app.callback()).get('/v3/launches/next');
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('upcoming', true);
});

//------------------------------------------------------------
//                       Past Launches
//------------------------------------------------------------

test('It should return all past launches', async () => {
  const response = await request(app.callback()).get('/v3/launches/past');
  expect(response.statusCode).toBe(200);
  response.body.forEach((launch) => {
    expect(launch.upcoming).toBe(false);
  });
});

test('It should return no launches due to invalid date', async () => {
  const response = await request(app.callback()).get('/v3/launches?start=2020-25-23&end=2020-25-24');
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});

test('It should return no launches due to invalid UTC date', async () => {
  const response = await request(app.callback()).get('/v3/launches?launch_date_utc=2011-25-05T14:48:00.000Z');
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});

//------------------------------------------------------------
//                       Upcoming Launches
//------------------------------------------------------------

test('It should return the next launch', async () => {
  const response = await request(app.callback()).get('/v3/launches/upcoming');
  expect(response.statusCode).toBe(200);
  response.body.forEach((launch) => {
    expect(launch.upcoming).toBe(true);
  });
});
