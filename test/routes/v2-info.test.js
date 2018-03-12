
const request = require('supertest');
const app = require('../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                     Company Info V2
//------------------------------------------------------------

test('It should return company info', async () => {
  const response = await request(app).get('/v2/info');
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
