
const request = require('supertest');
const app = require('../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                     Launch Query Test
//------------------------------------------------------------

test('It should return flight number 42', () => {
  return request(app).get('/v2/launches?flight_number=42').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('flight_number', 42);
    });
  });
});

test('It should return flight 42 in date range', () => {
  return request(app).get('/v2/launches?start=2017-06-22&final=2017-06-25').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('flight_number', 42);
    });
  });
});

test('It should return launches in 2017', () => {
  return request(app).get('/v2/launches?launch_year=2017').then((response) => {
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toEqual(18);
  });
});

test('It should return flight 42 with given launch date in UTC', () => {
  return request(app).get('/v2/launches?launch_date_utc=2017-06-23T19:10:00Z').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('flight_number', 42);
    });
  });
});

test('It should return flight 42 with given launch date in local time', () => {
  return request(app).get('/v2/launches?launch_date_local=2017-06-23T15:10:00-04:00').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('flight_number', 42);
    });
  });
});

test('It should return launches with falcon9 rocket id', () => {
  return request(app).get('/v2/launches?rocket_id=falcon9').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('rocket.rocket_id', 'falcon9');
    });
  });
});

test('It should return launches with falcon 9 rocket name', () => {
  return request(app).get('/v2/launches?rocket_name=Falcon+9').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('rocket.rocket_name', 'Falcon 9');
    });
  });
});

test('It should return launches with FT rocket type', () => {
  return request(app).get('/v2/launches?rocket_type=FT').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item).toHaveProperty('rocket.rocket_type', 'FT');
    });
  });
});

test('It should return launches with core serial B1029', () => {
  return request(app).get('/v2/launches?core_serial=B1029').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      item.rocket.first_stage.cores.forEach((core) => {
        expect(core).toHaveProperty('core_serial', 'B1029');
      });
    });
  });
});

test('It should return launches with cap serial C113', () => {
  return request(app).get('/v2/launches?cap_serial=C113').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      item.rocket.second_stage.payloads.forEach((cap) => {
        expect(cap).toHaveProperty('cap_serial', 'C113');
      });
    });
  });
});

test('It should return launches with 2 core flights', () => {
  return request(app).get('/v2/launches?core_flight=2').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      item.rocket.first_stage.cores.forEach((core) => {
        expect(core).toHaveProperty('flight');
      });
    });
  });
});

test('It should return launches with reused cores', () => {
  return request(app).get('/v2/launches?core_reuse=true').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item.reuse).toHaveProperty('core', true);
    });
  });
});

test('It should return launches with reused side core 1', () => {
  return request(app).get('/v2/launches?side_core1_reuse=true').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item.reuse).toHaveProperty('side_core1', true);
    });
  });
});

test('It should return launches with reused side core 2', () => {
  return request(app).get('/v2/launches?side_core2_reuse=true').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item.reuse).toHaveProperty('side_core2', true);
    });
  });
});

test('It should return launches with no reused fairings', () => {
  return request(app).get('/v2/launches?fairings_reuse=false').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item.reuse).toHaveProperty('fairings', false);
    });
  });
});

test('It should return launches with reused capsules', () => {
  return request(app).get('/v2/launches?capsule_reuse=true').then((response) => {
    expect(response.statusCode).toBe(200);
    response.body.forEach((item) => {
      expect(item.reuse).toHaveProperty('capsule', true);
    });
  });
});

// test('It should return', () => {
//   return request(app).get('/v2/launches?').then((response) => {
//     expect(response.statusCode).toBe(200);
//     response.body.forEach((item) => {
//       expect(item).toHaveProperty('', '');
//     });
//   });
// });

// test('It should return', () => {
//   return request(app).get('/v2/launches?').then((response) => {
//     expect(response.statusCode).toBe(200);
//     response.body.forEach((item) => {
//       expect(item).toHaveProperty('', '');
//     });
//   });
// });

// test('It should return', () => {
//   return request(app).get('/v2/launches?').then((response) => {
//     expect(response.statusCode).toBe(200);
//     response.body.forEach((item) => {
//       expect(item).toHaveProperty('', '');
//     });
//   });
// });

// test('It should return', () => {
//   return request(app).get('/v2/launches?').then((response) => {
//     expect(response.statusCode).toBe(200);
//     response.body.forEach((item) => {
//       expect(item).toHaveProperty('', '');
//     });
//   });
// });

// test('It should return', () => {
//   return request(app).get('/v2/launches?').then((response) => {
//     expect(response.statusCode).toBe(200);
//     response.body.forEach((item) => {
//       expect(item).toHaveProperty('', '');
//     });
//   });
// });

// test('It should return', () => {
//   return request(app).get('/v2/launches?').then((response) => {
//     expect(response.statusCode).toBe(200);
//     response.body.forEach((item) => {
//       expect(item).toHaveProperty('', '');
//     });
//   });
// });

// test('It should return', () => {
//   return request(app).get('/v2/launches?').then((response) => {
//     expect(response.statusCode).toBe(200);
//     response.body.forEach((item) => {
//       expect(item).toHaveProperty('', '');
//     });
//   });
// });

// test('It should return', () => {
//   return request(app).get('/v2/launches?').then((response) => {
//     expect(response.statusCode).toBe(200);
//     response.body.forEach((item) => {
//       expect(item).toHaveProperty('', '');
//     });
//   });
// });

// test('It should return', () => {
//   return request(app).get('/v2/launches?').then((response) => {
//     expect(response.statusCode).toBe(200);
//     response.body.forEach((item) => {
//       expect(item).toHaveProperty('', '');
//     });
//   });
// });

// test('It should return', () => {
//   return request(app).get('/v2/launches?').then((response) => {
//     expect(response.statusCode).toBe(200);
//     response.body.forEach((item) => {
//       expect(item).toHaveProperty('', '');
//     });
//   });
// });

// test('It should return', () => {
//   return request(app).get('/v2/launches?').then((response) => {
//     expect(response.statusCode).toBe(200);
//     response.body.forEach((item) => {
//       expect(item).toHaveProperty('', '');
//     });
//   });
// });
