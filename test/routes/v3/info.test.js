
const request = require('supertest');
const app = require('../../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                        Company Info
//------------------------------------------------------------

test('It should return company info', async () => {
  const response = await request(app.callback()).get('/v3/info');
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('name', 'SpaceX');
  expect(response.body).toHaveProperty('founder', 'Elon Musk');
  expect(response.body).toHaveProperty('founded', 2002);
  expect(response.body).toHaveProperty('employees');
  expect(response.body).toHaveProperty('vehicles');
  expect(response.body).toHaveProperty('launch_sites');
  expect(response.body).toHaveProperty('test_sites');
  expect(response.body).toHaveProperty('ceo');
  expect(response.body).toHaveProperty('cto');
  expect(response.body).toHaveProperty('coo');
  expect(response.body).toHaveProperty('cto_propulsion');
  expect(response.body).toHaveProperty('valuation');
  expect(response.body).toHaveProperty('headquarters.address', 'Rocket Road');
  expect(response.body).toHaveProperty('headquarters.city', 'Hawthorne');
  expect(response.body).toHaveProperty('headquarters.state', 'California');
  expect(response.body).toHaveProperty('summary');
});

//------------------------------------------------------------
//                        API Info
//------------------------------------------------------------

test('It should return home info', async () => {
  const response = await request(app.callback()).get('/v2');
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('description');
  expect(response.body).toHaveProperty('organization', 'r/SpaceX');
  expect(response.body).toHaveProperty('organization_link', 'https://github.com/r-spacex');
  expect(response.body).toHaveProperty('project_link', 'https://github.com/r-spacex/SpaceX-API');
  expect(response.body).toHaveProperty('project_name', 'SpaceX-API');
  expect(response.body).toHaveProperty('version');
});
