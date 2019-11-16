
const request = require('supertest');
const app = require('../../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                     Launch Sort Test
//------------------------------------------------------------

test('It should return launches sorted by flight id', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=flight_id&id=true');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('_id', '596eb600611279d39a00003c');
});

test('It should return launches sorted by flight number', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=flight_number');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('flight_number', 1);
});

test('It should return launches sorted by launch_year', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=launch_year&order=desc');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1]).toHaveProperty('flight_number', 1);
});

test('It should return launches sorted by utc launch date', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=launch_date_utc&order=desc');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1]).toHaveProperty('flight_number', 1);
});

test('It should return launches sorted by local launch date', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=launch_date_local&order=desc');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1]).toHaveProperty('flight_number', 1);
});

test('It should return launches sorted by tbd bool', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=tbd');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1]).toHaveProperty('tbd', true);
  expect(response.body[0]).toHaveProperty('tbd', false);
});

test('It should return launches sorted by rocket name', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=rocket_name&launch_year=2014');
  expect(response.statusCode).toBe(200);
  expect(response.body.length).toEqual(6);
});

test('It should return launches sorted by rocket type', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=rocket_type');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('rocket.rocket_type', 'FT');
});

test('It should return launches sorted by core serial', async () => {
  const response = await request(app.callback()).get('/v3/launches/past?sort=core_serial&order=desc');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1].rocket.first_stage.cores[0]).toHaveProperty('core_serial', 'B0003');
});

test('It should return launches sorted by capsule serial', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=cap_serial&order=desc&launch_year=2017');
  expect(response.statusCode).toBe(200);
  expect(response.body[0].rocket.second_stage.payloads[0]).toHaveProperty('cap_serial', 'C113');
});

test('It should return launches sorted by previous core flights', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=core_flight&launch_year=2017');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1].rocket.first_stage.cores[0]).toHaveProperty('flight', 2);
});

test('It should return launches sorted by core block number', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=block&launch_year=2017');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1].rocket.first_stage.cores[0]).toHaveProperty('block', 4);
});

test('It should return launches sorted by core gridfins', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=gridfins&launch_year=2017');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1].rocket.first_stage.cores[0]).toHaveProperty('gridfins', true);
});

test('It should return launches sorted by core legs', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=legs&launch_year=2017');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1].rocket.first_stage.cores[0]).toHaveProperty('legs', true);
});

test('It should return launches sorted by second stage block number', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=second_stage_block&launch_year=2017');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1].rocket.second_stage).toHaveProperty('block', 4);
});

test('It should return launches sorted by fairing reuse', async () => {
  const response = await request(app.callback()).get('/v3/launches/past?sort=fairings_reused');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1].rocket.fairings.reused).toEqual(true);
});

test('It should return launches sorted by fairing recovery attempts', async () => {
  const response = await request(app.callback()).get('/v3/launches/past?sort=fairings_recovery_attempt');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1].rocket.fairings.recovery_attempt).toEqual(true);
});

test('It should return launches sorted by fairing recoveries', async () => {
  const response = await request(app.callback()).get('/v3/launches/past?sort=fairings_recovery');
  expect(response.statusCode).toBe(200);
  expect(response.body[0].rocket.fairings.recovered).toEqual(false);
});

test('It should return launches sorted by launchpad site id', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=site_id&launch_year=2017');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1].launch_site).toHaveProperty('site_id', 'vafb_slc_4e');
});

test('It should return launches sorted by launchpad site name', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=site_name&launch_year=2017');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1].launch_site).toHaveProperty('site_name', 'VAFB SLC 4E');
});

test('It should return launches sorted by launchpad site name long', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=site_name_long&launch_year=2017');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1].launch_site).toHaveProperty('site_name_long', 'Vandenberg Air Force Base Space Launch Complex 4E');
});

test('It should return launches sorted by payload id', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=payload_id&launch_year=2017');
  expect(response.statusCode).toBe(200);
  expect(response.body[0].rocket.second_stage.payloads[0]).toHaveProperty('payload_id', 'BulgariaSat-1');
});

test('It should return launches sorted by norad id', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=norad_id&order=desc&launch_year=2017');
  expect(response.statusCode).toBe(200);
  expect(response.body[0].rocket.second_stage.payloads[0].norad_id[0]).toEqual(43070);
});

test('It should return launches sorted by customer', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=customer&launch_year=2017');
  expect(response.statusCode).toBe(200);
  expect(response.body[0].rocket.second_stage.payloads[0].customers[0]).toEqual('Bulgaria Sat');
});

test('It should return launches sorted by nationality', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=nationality&launch_year=2017');
  expect(response.statusCode).toBe(200);
  expect(response.body[0].rocket.second_stage.payloads[0].nationality).toEqual('Bulgaria');
});

test('It should return launches sorted by manufacturer', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=manufacturer&launch_year=2017');
  expect(response.statusCode).toBe(200);
  expect(response.body[0].rocket.second_stage.payloads[0].manufacturer).toEqual('Airbus Defence and Space');
});

test('It should return launches sorted by payload type', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=payload_type&launch_year=2017');
  expect(response.statusCode).toBe(200);
  expect(response.body[0].rocket.second_stage.payloads[0].payload_type).toEqual('Dragon 1.1');
});

test('It should return launches sorted by payload orbit', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=orbit&launch_year=2017');
  expect(response.statusCode).toBe(200);
  expect(response.body[0].rocket.second_stage.payloads[0].orbit).toEqual('GTO');
});

test('It should return launches sorted by launch_success', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=launch_success&launch_year=2017');
  expect(response.statusCode).toBe(200);
  expect(response.body[0].launch_success).toEqual(true);
});

test('It should return launches sorted by core info reuse', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=reused&order=desc&launch_year=2017');
  expect(response.statusCode).toBe(200);
  expect(response.body[0].rocket.first_stage.cores[0].reused).toEqual(true);
});

test('It should return launches sorted by core landing success', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=land_success&launch_year=2017');
  expect(response.statusCode).toBe(200);
  expect(response.body[0].rocket.first_stage.cores[0].land_success).toEqual(null);
});

test('It should return launches sorted by core landing type', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=landing_type&launch_year=2017');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1].rocket.first_stage.cores[0].landing_type).toEqual('RTLS');
});

test('It should return launches sorted by core landing vehicle', async () => {
  const response = await request(app.callback()).get('/v3/launches?sort=landing_vehicle&launch_year=2017');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1].rocket.first_stage.cores[0].landing_vehicle).toEqual('OCISLY');
});

//------------------------------------------------------------
//                     Payload Sort Test
//------------------------------------------------------------

test('It should return payloads sorted in decending order', async () => {
  const response = await request(app.callback()).get('/v3/payloads?order=desc');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1]).toHaveProperty('payload_id', 'FalconSAT-2');
});

test('It should return payloads sorted in acending order', async () => {
  const response = await request(app.callback()).get('/v3/payloads?order=asc');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('payload_id', 'FalconSAT-2');
});

//------------------------------------------------------------
//                     History Sort Test
//------------------------------------------------------------

test('It should return history sorted by flight number', async () => {
  const response = await request(app.callback()).get('/v3/history?sort=flight_number&order=desc');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1]).toHaveProperty('flight_number', null);
});

test('It should return history sorted by event utc date', async () => {
  const response = await request(app.callback()).get('/v3/history?sort=event_date_utc');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('flight_number', 4);
});
