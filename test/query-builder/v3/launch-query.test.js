
const request = require('supertest');
const app = require('../../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                     Launch Query Test
//------------------------------------------------------------

test('It should return launches with mongo id\'s', async () => {
  const response = await request(app.callback()).get('/v3/launches?id=true');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('_id');
  });
});

test('It should return flight number 55', async () => {
  const response = await request(app.callback()).get('/v3/launches?flight_id=5a7a3dceb7afa5b79ec71628');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('flight_number', 55);
  });
});

test('It should return flight number 42', async () => {
  const response = await request(app.callback()).get('/v3/launches?flight_number=42');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('flight_number', 42);
  });
});

test('It should return flight 42 in short date range', async () => {
  const response = await request(app.callback()).get('/v3/launches?start=2017-06-22&final=2017-06-25');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('flight_number', 42);
  });
});

test('It should return flight 42 in long date range', async () => {
  const response = await request(app.callback()).get('/v3/launches?start=2017-06-22:00:00Z&final=2017-06-25:00:00Z');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('flight_number', 42);
  });
});

test('It should return flight 42 in unix date range', async () => {
  const response = await request(app.callback()).get('/v3/launches?start=1498244888&final=1498246000');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('flight_number', 42);
  });
});

test('It should return launches in 2017', async () => {
  const response = await request(app.callback()).get('/v3/launches?launch_year=2017');
  expect(response.statusCode).toBe(200);
  expect(response.body.length).toEqual(18);
});

test('It should return flight 42 with given launch date in UTC', async () => {
  const response = await request(app.callback()).get('/v3/launches?launch_date_utc=2017-06-23T19:10:00.000Z');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('flight_number', 42);
  });
});

test('It should return flight 42 with given launch date in local time', async () => {
  const response = await request(app.callback()).get('/v3/launches?launch_date_local=2017-06-23T15:10:00-04:00');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('flight_number', 42);
  });
});

test('It should only return tbd launches', async () => {
  const response = await request(app.callback()).get('/v3/launches?tbd=true');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('tbd', true);
  });
});

test('It should return launches with falcon9 rocket id', async () => {
  const response = await request(app.callback()).get('/v3/launches?rocket_id=falcon9');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('rocket.rocket_id', 'falcon9');
  });
});

test('It should return launches with falcon 9 rocket name', async () => {
  const response = await request(app.callback()).get('/v3/launches?rocket_name=Falcon+9');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('rocket.rocket_name', 'Falcon 9');
  });
});

test('It should return launches with FT rocket type', async () => {
  const response = await request(app.callback()).get('/v3/launches?rocket_type=FT');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('rocket.rocket_type', 'FT');
  });
});

test('It should return launches with core serial B1029', async () => {
  const response = await request(app.callback()).get('/v3/launches?core_serial=B1029');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    item.rocket.first_stage.cores.forEach((core) => {
      expect(core).toHaveProperty('core_serial', 'B1029');
    });
  });
});

test('It should return launches block 4 cores', async () => {
  const response = await request(app.callback()).get('/v3/launches?block=4');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    item.rocket.first_stage.cores.forEach((core) => {
      expect(core).toHaveProperty('block');
    });
  });
});

test('It should return 27 launches with second stage block 1 cores', async () => {
  const response = await request(app.callback()).get('/v3/launches?second_stage_block=1');
  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBe(27);
});

test('It should return launches with cap serial C113', async () => {
  const response = await request(app.callback()).get('/v3/launches?cap_serial=C113');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    item.rocket.second_stage.payloads.forEach((cap) => {
      expect(cap).toHaveProperty('cap_serial', 'C113');
    });
  });
});

test('It should return launches with 2 core flights', async () => {
  const response = await request(app.callback()).get('/v3/launches?core_flight=2');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    item.rocket.first_stage.cores.forEach((core) => {
      expect(core).toHaveProperty('flight');
    });
  });
});

test('It should return launches with no reused fairings', async () => {
  const response = await request(app.callback()).get('/v3/launches?fairings_reused=false');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item.rocket.fairings).toHaveProperty('reused', false);
  });
});

test('It should return launches from LC-39A', async () => {
  const response = await request(app.callback()).get('/v3/launches?site_id=ksc_lc_39a');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item.launch_site).toHaveProperty('site_id', 'ksc_lc_39a');
  });
});

test('It should return more launches from LC-39A', async () => {
  const response = await request(app.callback()).get('/v3/launches?site_name=KSC+LC+39A');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item.launch_site).toHaveProperty('site_name', 'KSC LC 39A');
  });
});

test('It should return more launches from LC-39A long name', async () => {
  const response = await request(app.callback()).get('/v3/launches?site_name_long=Kennedy+Space+Center+Historic+Launch+Complex+39A');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item.launch_site).toHaveProperty('site_name_long', 'Kennedy Space Center Historic Launch Complex 39A');
  });
});

test('It should return launch of BulgariaSat-1', async () => {
  const response = await request(app.callback()).get('/v3/launches?payload_id=BulgariaSat-1');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    item.rocket.second_stage.payloads.forEach((payload) => {
      expect(payload).toHaveProperty('payload_id', 'BulgariaSat-1');
    });
  });
});

test('It should return Iridium NEXT 7 with the correct NORAD id', async () => {
  const response = await request(app.callback()).get('/v3/launches?norad_id=43571');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    item.rocket.second_stage.payloads.forEach((payload) => {
      expect(payload).toHaveProperty('payload_id', 'Iridium NEXT 7');
    });
  });
});

test('It should return launches with Bulgaria Sat customer', async () => {
  const response = await request(app.callback()).get('/v3/launches?customer=Bulgaria+Sat');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    item.rocket.second_stage.payloads.forEach((payload) => {
      payload.customers.forEach((customer) => {
        expect(customer).toContain('Bulgaria Sat');
      });
    });
  });
});

test('It should return launches with Bulgaria nationality', async () => {
  const response = await request(app.callback()).get('/v3/launches?nationality=Bulgaria');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    item.rocket.second_stage.payloads.forEach((payload) => {
      expect(payload).toHaveProperty('nationality', 'Bulgaria');
    });
  });
});

test('It should return launches with an SSL manufacturer', async () => {
  const manufacturers = [];
  const response = await request(app.callback()).get('/v3/launches/past?manufacturer=SSL');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    item.rocket.second_stage.payloads.forEach((payload) => {
      manufacturers.push(payload.manufacturer);
    });
  });
  expect(manufacturers).toContain('SSL');
});

test('It should return launches with Satellite payloads', async () => {
  const response = await request(app.callback()).get('/v3/launches?payload_type=Satellite');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    item.rocket.second_stage.payloads.forEach((payload) => {
      expect(payload).toHaveProperty('payload_type');
    });
  });
});

test('It should return launches with GTO orbit', async () => {
  const response = await request(app.callback()).get('/v3/launches?orbit=GTO');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    item.rocket.second_stage.payloads.forEach((payload) => {
      expect(payload).toHaveProperty('orbit');
    });
  });
});

test('It should return launches with no reused fairings', async () => {
  const response = await request(app.callback()).get('/v3/launches?fairings_reused=false');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item.rocket.fairings.reused).toEqual(false);
  });
});

test('It should return launches with fairing recovery attempts', async () => {
  const response = await request(app.callback()).get('/v3/launches?fairings_recovery_attempt=true');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item.rocket.fairings.recovery_attempt).toEqual(true);
  });
});

test('It should return launches with no recovered fairings', async () => {
  const response = await request(app.callback()).get('/v3/launches?fairings_recovered=false');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item.rocket.fairings.recovered).toEqual(false);
  });
});

test('It should return launches with MR STEVEN fairing ship', async () => {
  const response = await request(app.callback()).get('/v3/launches?fairings_ship=MR%20STEVEN');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item.rocket.fairings.ship).toEqual('MR STEVEN');
  });
});

test('It should return launches with successful launches', async () => {
  const response = await request(app.callback()).get('/v3/launches?launch_success=true');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    expect(item).toHaveProperty('launch_success');
  });
});

test('It should return launches with core reuse', async () => {
  const response = await request(app.callback()).get('/v3/launches?reused=true');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    item.rocket.first_stage.cores.forEach((core) => {
      expect(core).toHaveProperty('reused');
    });
  });
});

test('It should return launches with successful core landings', async () => {
  const response = await request(app.callback()).get('/v3/launches?land_success=true');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    item.rocket.first_stage.cores.forEach((core) => {
      expect(core).toHaveProperty('land_success');
    });
  });
});

test('It should return launches with ASDS landing', async () => {
  const response = await request(app.callback()).get('/v3/launches?landing_type=ASDS');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    item.rocket.first_stage.cores.forEach((core) => {
      expect(core).toHaveProperty('landing_type');
    });
  });
});

test('It should return launches with landings on OCISLY', async () => {
  const response = await request(app.callback()).get('/v3/launches?landing_vehicle=OCISLY');
  expect(response.statusCode).toBe(200);
  response.body.forEach((item) => {
    item.rocket.first_stage.cores.forEach((core) => {
      expect(core).toHaveProperty('landing_vehicle');
    });
  });
});
