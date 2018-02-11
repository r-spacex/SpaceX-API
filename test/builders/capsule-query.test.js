
const request = require('supertest');
const app = require('../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                     Capsule Query Test
//------------------------------------------------------------

test('It should return capsule serial C113', () => {
  return request(app).get('/v2/parts/caps?capsule_serial=C113').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('capsule_serial', 'C113');
    });
  });
});

test('It should return capsule id dragon1', () => {
  return request(app).get('/v2/parts/caps?capsule_id=dragon1').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('capsule_id', 'dragon1');
    });
  });
});

test('It should return capsules with an active status', () => {
  return request(app).get('/v2/parts/caps?status=active').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('status', 'active');
    });
  });
});

test('It should return capsule C113 with the correct launch date', () => {
  return request(app).get('/v2/parts/caps?original_launch=2017-08-14T16:31:00Z').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('original_launch', '2017-08-14T16:31:00Z');
    });
  });
});

test('It should return capsule for CRS-12', () => {
  return request(app).get('/v2/parts/caps?missions=SpaceX+CRS-12').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('missions');
    });
  });
});

test('It should return capsule with number of landings', () => {
  return request(app).get('/v2/parts/caps?landings=1').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('landings', 1);
    });
  });
});

test('It should return capsule with type of Dragon 1.1', () => {
  return request(app).get('/v2/parts/caps?type=Dragon+1.1').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('type', 'Dragon 1.1');
    });
  });
});
