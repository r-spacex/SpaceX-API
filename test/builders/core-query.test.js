
const request = require('supertest');
const app = require('../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                     Core Query Test
//------------------------------------------------------------

test('It should return core serial B1041', () => {
  return request(app).get('/v2/parts/cores?core_serial=B1041').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('core_serial', 'B1041');
    });
  });
});

test('It should return all block 4 cores', () => {
  return request(app).get('/v2/parts/cores?block=4').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('block');
    });
  });
});

test('It should return all cores with active status', () => {
  return request(app).get('/v2/parts/cores?status=active').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('status', 'active');
    });
  });
});

test('It should return core B1041 with the correct launch date', () => {
  return request(app).get('/v2/parts/cores?original_launch=2017-10-09T12:37:00Z').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('original_launch', '2017-10-09T12:37:00Z');
    });
  });
});

test('It should return core for Iridium NEXT 21-30', () => {
  return request(app).get('/v2/parts/cores?missions=Iridium+NEXT+21-30').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('missions');
    });
  });
});

test('It should return core with an active status', () => {
  return request(app).get('/v2/parts/cores?status=active').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('status', 'active');
    });
  });
});

test('It should return cores with rtls attempts', () => {
  return request(app).get('/v2/parts/cores?rtls_attempt=true').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('rtls_attempt', true);
    });
  });
});

test('It should return cores with 1 rtls landings', () => {
  return request(app).get('/v2/parts/cores?rtls_landings=1').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('rtls_landings', 1);
    });
  });
});

test('It should return cores with asds attempts', () => {
  return request(app).get('/v2/parts/cores?asds_attempt=true').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('asds_attempt', true);
    });
  });
});

test('It should return cores with 1 asds landing', () => {
  return request(app).get('/v2/parts/cores?asds_landings=1').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('asds_landings', 1);
    });
  });
});

test('It should return cores with water landings', () => {
  return request(app).get('/v2/parts/cores?water_landing=true').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('water_landing', true);
    });
  });
});
