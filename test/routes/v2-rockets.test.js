
const request = require('supertest');
const app = require('../../src/app');
const customMatchers = require('../utilities/custom-asymmetric-matchers');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                     Rockets V2
//------------------------------------------------------------

test('It should return all rocket info', () => {
  return request(app).get('/v2/rockets').then((response) => {
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body[0]).toHaveProperty('name', 'Falcon 1');
    expect(response.body[1]).toHaveProperty('name', 'Falcon 9');
    expect(response.body[2]).toHaveProperty('name', 'Falcon Heavy');

    response.body.forEach((item) => {
      expect(item).toHaveProperty('id', expect.any(String));
      expect(item).toHaveProperty('name', expect.any(String));
      expect(item).toHaveProperty('type', expect.stringMatching(/^(?:rocket|capsule)$/));
      expect(item).toHaveProperty('active', expect.any(Boolean));
      expect(item).toHaveProperty('stages', expect.any(Number));
      expect(item).toHaveProperty('boosters', expect.any(Number));
      expect(item).toHaveProperty('cost_per_launch', expect.any(Number));
      expect(item).toHaveProperty('success_rate_pct', expect.any(Number));
      expect(item).toHaveProperty('first_flight', expect.stringMatching(/^(?:[0-9]{4}-[0-9]{2}-[0-9]{2}|TBD)$/));
      expect(item).toHaveProperty('country', expect.any(String));
      expect(item).toHaveProperty('company', expect.any(String));
      expect(item).toHaveProperty('height', customMatchers.length());
      expect(item).toHaveProperty('diameter', customMatchers.length());
      expect(item).toHaveProperty('mass', customMatchers.mass());
      expect(item).toHaveProperty('payload_weights', expect.any(Array));
      item.payload_weights.forEach((weight) => {
        expect(weight).toEqual(customMatchers.payloadWeight());
      });
      expect(item).toHaveProperty('first_stage', customMatchers.vehicleStage());
      expect(item).toHaveProperty('second_stage', customMatchers.vehicleStage());
      expect(item).toHaveProperty('description', expect.any(String));
    });
  });
});

test('It should return Falcon 1 info', () => {
  return request(app).get('/v2/rockets/falcon1').then((response) => {
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'Falcon 1');
    expect(response.body).toHaveProperty('stages', 2);
    expect(response.body).toHaveProperty('cost_per_launch');
    expect(response.body).toHaveProperty('success_rate_pct');
    expect(response.body).toHaveProperty('first_flight', '2006-03-24');
    expect(response.body).toHaveProperty('country');
    expect(response.body).toHaveProperty('company', 'SpaceX');
    expect(response.body).toHaveProperty('description');
  });
});

test('It should return Falcon Heavy info', () => {
  return request(app).get('/v2/rockets/falconheavy').then((response) => {
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'Falcon Heavy');
    expect(response.body).toHaveProperty('stages', 2);
    expect(response.body).toHaveProperty('cost_per_launch');
    expect(response.body).toHaveProperty('success_rate_pct');
    expect(response.body).toHaveProperty('first_flight');
    expect(response.body).toHaveProperty('country');
    expect(response.body).toHaveProperty('company', 'SpaceX');
    expect(response.body).toHaveProperty('description');
  });
});
