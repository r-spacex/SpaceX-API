
const request = require('supertest');
const app = require('../../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                     Mission Query Test
//------------------------------------------------------------

test('It should return all Telstar missions', async () => {
  const response = await request(app.callback()).get('/v3/missions?mission_name=Telstar');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('mission_name', 'Telstar');
  });
});

test('It should all missions with the mission id of F4F83DE', async () => {
  const response = await request(app.callback()).get('/v3/missions?mission_id=F4F83DE');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('mission_id', 'F4F83DE');
  });
});

test('It should return the missions with id F4F83DE', async () => {
  const response = await request(app.callback()).get('/v3/missions/F4F83DE');
  expect(response.statusCode).toBe(200);
  expect(response.body.mission_id).toEqual('F4F83DE');
});

test('It should return missions with SSL manufacturer', async () => {
  const response = await request(app.callback()).get('/v3/missions?manufacturer=SSL');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item.manufacturers).toContain('SSL');
  });
});

test('It should all missions with SES-8 payloads', async () => {
  const response = await request(app.callback()).get('/v3/missions?payload_id=SES-8');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('mission_name', 'SES');
  });
});
