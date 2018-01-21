
const request = require("supertest")
const app = require("../src/app")
const customMatchers = require("./utilities/custom-asymmetric-matchers")

beforeAll((done) => {
  app.on("ready", () => {
    done()
  })
})

//------------------------------------------------------------
//                     Home Page V2
//------------------------------------------------------------

test("It should return home info", () => {
  return request(app).get("/v2").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty("description")
    expect(response.body).toHaveProperty("organization", "r/SpaceX")
    expect(response.body).toHaveProperty("organization_link", "https://github.com/r-spacex")
    expect(response.body).toHaveProperty("project_link", "https://github.com/r-spacex/SpaceX-API")
    expect(response.body).toHaveProperty("project_name", "SpaceX-API")
    expect(response.body).toHaveProperty("version")
  })
})

//------------------------------------------------------------
//                     Company Info V2
//------------------------------------------------------------

test("It should return company info", () => {
  return request(app).get("/v2/info").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty("name", "SpaceX")
    expect(response.body).toHaveProperty("founder", "Elon Musk")
    expect(response.body).toHaveProperty("founded", 2002)
    expect(response.body).toHaveProperty("employees")
    expect(response.body).toHaveProperty("vehicles")
    expect(response.body).toHaveProperty("launch_sites")
    expect(response.body).toHaveProperty("test_sites")
    expect(response.body).toHaveProperty("ceo")
    expect(response.body).toHaveProperty("cto")
    expect(response.body).toHaveProperty("coo")
    expect(response.body).toHaveProperty("cto_propulsion")
    expect(response.body).toHaveProperty("valuation")
    expect(response.body).toHaveProperty("headquarters.address", "Rocket Road")
    expect(response.body).toHaveProperty("headquarters.city", "Hawthorne")
    expect(response.body).toHaveProperty("headquarters.state", "California")
    expect(response.body).toHaveProperty("summary")
  })
})

//------------------------------------------------------------
//                     Rockets V2
//------------------------------------------------------------

test("It should return all rocket info", () => {
  return request(app).get("/v2/rockets").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveLength(3)
    expect(response.body[0]).toHaveProperty("name", "Falcon 1")
    expect(response.body[1]).toHaveProperty("name", "Falcon 9")
    expect(response.body[2]).toHaveProperty("name", "Falcon Heavy")

    response.body.forEach(item => {
      expect(item).toHaveProperty("id", expect.any(String))
      expect(item).toHaveProperty("name", expect.any(String))
      expect(item).toHaveProperty("type", expect.stringMatching(/^(?:rocket|capsule)$/))
      expect(item).toHaveProperty("active", expect.any(Boolean))
      expect(item).toHaveProperty("stages", expect.any(Number))
      expect(item).toHaveProperty("boosters", expect.any(Number))
      expect(item).toHaveProperty("cost_per_launch", expect.any(Number))
      expect(item).toHaveProperty("success_rate_pct", expect.any(Number))
      expect(item).toHaveProperty("first_flight", expect.stringMatching(/^(?:[0-9]{4}-[0-9]{2}-[0-9]{2}|TBD)$/))
      expect(item).toHaveProperty("country", expect.any(String))
      expect(item).toHaveProperty("company", expect.any(String))
      expect(item).toHaveProperty("height", customMatchers.length())
      expect(item).toHaveProperty("diameter", customMatchers.length())
      expect(item).toHaveProperty("mass", customMatchers.mass())
      expect(item).toHaveProperty("payload_weights", expect.any(Array))
      item.payload_weights.forEach(weight => {
        expect(weight).toEqual(customMatchers.payloadWeight())
      })
      expect(item).toHaveProperty("first_stage", customMatchers.vehicleStage())
      expect(item).toHaveProperty("second_stage", customMatchers.vehicleStage())
      expect(item).toHaveProperty("description", expect.any(String))
    })
  })
})

test("It should return Falcon 1 info", () => {
  return request(app).get("/v2/rockets/falcon1").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty("name", "Falcon 1")
    expect(response.body).toHaveProperty("stages", 2)
    expect(response.body).toHaveProperty("cost_per_launch")
    expect(response.body).toHaveProperty("success_rate_pct")
    expect(response.body).toHaveProperty("first_flight", "2006-03-24")
    expect(response.body).toHaveProperty("country")
    expect(response.body).toHaveProperty("company", "SpaceX")
    expect(response.body).toHaveProperty("description")
    expect(Object.keys(response.body)).toEqual([
      "id",
      "name",
      "type",
      "active",
      "stages",
      "boosters",
      "cost_per_launch",
      "success_rate_pct",
      "first_flight",
      "country",
      "company",
      "height",
      "diameter",
      "mass",
      "payload_weights",
      "first_stage",
      "second_stage",
      "engines",
      "landing_legs",
      "description"
    ])
  })
})

test("It should return Falcon 9 info", () => {
  return request(app).get("/v2/rockets/falcon9").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty("name", "Falcon 9")
    expect(response.body).toHaveProperty("stages", 2)
    expect(response.body).toHaveProperty("cost_per_launch")
    expect(response.body).toHaveProperty("success_rate_pct")
    expect(response.body).toHaveProperty("first_flight", "2010-06-04")
    expect(response.body).toHaveProperty("country")
    expect(response.body).toHaveProperty("company", "SpaceX")
    expect(response.body).toHaveProperty("description")
    expect(Object.keys(response.body)).toEqual([
      "id",
      "name",
      "type",
      "active",
      "stages",
      "boosters",
      "cost_per_launch",
      "success_rate_pct",
      "first_flight",
      "country",
      "company",
      "height",
      "diameter",
      "mass",
      "payload_weights",
      "first_stage",
      "second_stage",
      "engines",
      "landing_legs",
      "description"
    ])
  })
})

test("It should return Falcon Heavy info", () => {
  return request(app).get("/v2/rockets/falconheavy").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty("name", "Falcon Heavy")
    expect(response.body).toHaveProperty("stages", 2)
    expect(response.body).toHaveProperty("cost_per_launch")
    expect(response.body).toHaveProperty("success_rate_pct")
    expect(response.body).toHaveProperty("first_flight")
    expect(response.body).toHaveProperty("country")
    expect(response.body).toHaveProperty("company", "SpaceX")
    expect(response.body).toHaveProperty("description")
    expect(Object.keys(response.body)).toEqual([
      "id",
      "name",
      "type",
      "active",
      "stages",
      "boosters",
      "cost_per_launch",
      "success_rate_pct",
      "first_flight",
      "country",
      "company",
      "height",
      "diameter",
      "mass",
      "payload_weights",
      "first_stage",
      "second_stage",
      "engines",
      "landing_legs",
      "description"
    ])
  })
})

//------------------------------------------------------------
//                     Launchpads V2
//------------------------------------------------------------

test("It should return all launchpads", () => {
  return request(app).get("/v2/launchpads").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveLength(8)
    response.body.forEach(item => {
      expect(item).toHaveProperty("id")
      expect(item).toHaveProperty("full_name")
      expect(item).toHaveProperty("status")
      expect(item).toHaveProperty("vehicles_launched")
      expect(item).toHaveProperty("details")
    })
  })
})

test("It should return LC-39A info", () => {
  return request(app).get("/v2/launchpads/ksc_lc_39a").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain("ksc_lc_39a")
  })
})

test("It should return no launchpads found info", () => {
  return request(app).get("/v2/launchpads/ksc_lc_40a").then(response => {
    expect(response.statusCode).toBe(404)
    expect(response.text).toContain("No results found")
  })
})

//------------------------------------------------------------
//                    Past Launches V2
//------------------------------------------------------------

test("It should return all past launches", () => {
  return request(app.listen()).get("/v2/launches").then(response => {
    expect(response.statusCode).toBe(200)
    response.body.forEach(item => {
      expect(item).toHaveProperty("flight_number", expect.anything())
      expect(item).toHaveProperty("launch_year", expect.stringMatching(/^[0-9]{4}$/))
      expect(item).toHaveProperty("launch_date_unix")
      expect(item).toHaveProperty("launch_date_utc", expect.anything())
      expect(item).toHaveProperty("launch_date_local", expect.anything())
      expect(item).toHaveProperty("rocket.rocket_id")
      expect(item).toHaveProperty("rocket.rocket_name")
      expect(item).toHaveProperty("rocket.rocket_type")
      expect(item.rocket.first_stage.cores.length).toBeGreaterThan(0)
      item.rocket.first_stage.cores.forEach(core => {
        expect(core).toHaveProperty("core_serial")
        expect(core).toHaveProperty("reused")
        expect(core).toHaveProperty("land_success")
        expect(core).toHaveProperty("landing_type")
        expect(core).toHaveProperty("landing_vehicle")
      })
      expect(item.rocket.second_stage.payloads.length).toBeGreaterThan(0)
      if (item.hasOwnProperty("cap_serial")) {
        item.rocket.second_stage.payloads.forEach(payload => {
          expect(payload).toHaveProperty("payload_id")
          expect(payload).toHaveProperty("reused")
          expect(payload).toHaveProperty("cap_serial")
          expect(payload.customers.length).toBeGreaterThan(0)
          expect(payload).toHaveProperty("payload_mass_kg")
          expect(payload).toHaveProperty("payload_mass_lbs")
          expect(payload).toHaveProperty("orbit")
          expect(payload).toHaveProperty("mass_returned_kg")
          expect(payload).toHaveProperty("mass_returned_lbs")
          expect(payload).toHaveProperty("flight_time_sec")
          expect(payload).toHaveProperty("cargo_manifest")
        })
      } else {
        item.rocket.second_stage.payloads.forEach(payload => {
          expect(payload).toHaveProperty("payload_id")
          expect(payload).toHaveProperty("reused")
          expect(payload.customers.length).toBeGreaterThan(0)
          expect(payload).toHaveProperty("payload_mass_kg")
          expect(payload).toHaveProperty("payload_mass_lbs")
          expect(payload).toHaveProperty("orbit")
        })
      }
      expect(item).toHaveProperty("telemetry.flight_club")
      expect(item).toHaveProperty("reuse.core")
      expect(item).toHaveProperty("reuse.side_core1")
      expect(item).toHaveProperty("reuse.side_core2")
      expect(item).toHaveProperty("reuse.fairings")
      expect(item).toHaveProperty("reuse.capsule")
      expect(item).toHaveProperty("launch_site.site_id")
      expect(item).toHaveProperty("launch_site.site_name")
      expect(item).toHaveProperty("launch_site.site_name_long")
      expect(item).toHaveProperty("launch_success")
      expect(item).toHaveProperty("links")
      expect(item).toHaveProperty("details")
    })
  })
})

//------------------------------------------------------------
//                    Upcoming Launches V2
//------------------------------------------------------------

test("It should return all upcoming launches", () => {
  return request(app.listen()).get("/v2/launches/upcoming").then(response => {
    expect(response.statusCode).toBe(200)
    response.body.forEach(item => {
      expect(item).toHaveProperty("flight_number", expect.anything())
      expect(item).toHaveProperty("launch_year")
      expect(item).toHaveProperty("launch_date_unix")
      expect(item).toHaveProperty("launch_date_utc")
      expect(item).toHaveProperty("launch_date_local")
      expect(item).toHaveProperty("rocket.rocket_id")
      expect(item).toHaveProperty("rocket.rocket_name")
      expect(item).toHaveProperty("rocket.rocket_type")
      expect(item.rocket.first_stage.cores.length).toBeGreaterThan(0)
      item.rocket.first_stage.cores.forEach(core => {
        expect(core).toHaveProperty("core_serial")
        expect(core).toHaveProperty("reused")
        expect(core).toHaveProperty("land_success")
        expect(core).toHaveProperty("landing_type")
        expect(core).toHaveProperty("landing_vehicle")
      })
      expect(item.rocket.second_stage.payloads.length).toBeGreaterThan(0)
      if (item.hasOwnProperty("cap_serial")) {
        item.rocket.second_stage.payloads.forEach(payload => {
          expect(payload).toHaveProperty("payload_id")
          expect(payload).toHaveProperty("reused")
          expect(payload).toHaveProperty("cap_serial")
          expect(payload.customers.length).toBeGreaterThan(0)
          expect(payload).toHaveProperty("payload_mass_kg")
          expect(payload).toHaveProperty("payload_mass_lbs")
          expect(payload).toHaveProperty("orbit")
          expect(payload).toHaveProperty("mass_returned_kg")
          expect(payload).toHaveProperty("mass_returned_lbs")
          expect(payload).toHaveProperty("flight_time_sec")
          expect(payload).toHaveProperty("cargo_manifest")
        })
      } else {
        item.rocket.second_stage.payloads.forEach(payload => {
          expect(payload).toHaveProperty("payload_id")
          expect(payload).toHaveProperty("reused")
          expect(payload.customers.length).toBeGreaterThan(0)
          expect(payload).toHaveProperty("payload_mass_kg")
          expect(payload).toHaveProperty("payload_mass_lbs")
          expect(payload).toHaveProperty("orbit")
        })
      }
      expect(item).toHaveProperty("telemetry.flight_club")
      expect(item).toHaveProperty("reuse.core")
      expect(item).toHaveProperty("reuse.side_core1")
      expect(item).toHaveProperty("reuse.side_core2")
      expect(item).toHaveProperty("reuse.fairings")
      expect(item).toHaveProperty("reuse.capsule")
      expect(item).toHaveProperty("launch_site.site_id")
      expect(item).toHaveProperty("launch_site.site_name")
      expect(item).toHaveProperty("launch_site.site_name_long")
      expect(item).toHaveProperty("launch_success")
      expect(item).toHaveProperty("links")
      expect(item).toHaveProperty("details")
    })
  })
})

//------------------------------------------------------------
//                     Capsule V2
//------------------------------------------------------------

test("It should return all v2 capsules", () => {
  return request(app).get("/v2/parts/caps").then(response => {
    expect(response.statusCode).toBe(200)
    response.body.forEach(item => {
      expect(item).toHaveProperty("capsule_serial")
      expect(item).toHaveProperty("status")
      expect(item).toHaveProperty("original_launch")
      expect(item.missions.length).toBeGreaterThan(0)
      expect(item).toHaveProperty("landings")
      expect(item).toHaveProperty("type")
      expect(item).toHaveProperty("details")
    })
  })
})

//------------------------------------------------------------
//                     Core V2
//------------------------------------------------------------

test("It should return all v2 cores", () => {
  return request(app).get("/v2/parts/cores").then(response => {
    expect(response.statusCode).toBe(200)
    response.body.forEach(item => {
      expect(item).toHaveProperty("core_serial")
      expect(item).toHaveProperty("status")
      expect(item).toHaveProperty("original_launch")
      expect(item.missions.length).toBeGreaterThan(0)
      expect(item).toHaveProperty("rtls_attempt")
      expect(item).toHaveProperty("rtls_landings")
      expect(item).toHaveProperty("asds_attempt")
      expect(item).toHaveProperty("asds_landings")
      expect(item).toHaveProperty("water_landing")
      expect(item).toHaveProperty("details")
    })
  })
})

//------------------------------------------------------------
//                    Dragon V2
//------------------------------------------------------------

test("It should return Dragon 1 data", () => {
  return request(app).get("/v2/capsules").then(response => {
    expect(response.statusCode).toBe(200)
    response.body.forEach(item => {
      expect(item).toHaveProperty("sidewall_angle_deg", expect.any(Number))
      expect(item).toHaveProperty("orbit_duration_yr", expect.any(Number))
      expect(item).toHaveProperty("heat_shield.dev_partner", expect.any(String))
      expect(item).toHaveProperty("heat_shield.material", expect.any(String))
      expect(item).toHaveProperty("heat_shield.size_meters", expect.any(Number))
      expect(item).toHaveProperty("heat_shield.temp_degrees", expect.any(Number))
      expect(item).toHaveProperty("launch_payload_mass", customMatchers.mass())
      expect(item).toHaveProperty("launch_payload_vol", customMatchers.volume())
      expect(item).toHaveProperty("return_payload_mass", customMatchers.mass())
      expect(item).toHaveProperty("return_payload_vol", customMatchers.volume())
      expect(item).toHaveProperty("pressurized_capsule.payload_volume", customMatchers.volume())
      expect(item).toHaveProperty("trunk.cargo.solar_array", expect.any(Number))
      expect(item).toHaveProperty("trunk.cargo.unpressurized_cargo", expect.any(Boolean))
      expect(item).toHaveProperty("trunk.trunk_volume", customMatchers.volume())
      expect(item).toHaveProperty("height_w_trunk", customMatchers.length())
      expect(item).toHaveProperty("diameter", customMatchers.length())
    })
  })
})
