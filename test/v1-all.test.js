
const app = require("../app")
const request = require("supertest")
const customMatchers = require("./utilities/custom-asymmetric-matchers")

beforeAll((done) => {
  app.on("ready", () => {
    done()
  })
})

//------------------------------------------------------------
//                     404 Page
//------------------------------------------------------------

test("It should return 404 endpoint error", () => {
  return request(app).get("/v2").then(response => {
    expect(response.statusCode).toBe(404)
    expect(response.body).toMatchObject({
      error: "No results found"
    })
  })
})

//------------------------------------------------------------
//                     500 Errors
//------------------------------------------------------------

test("It should return 500 error", () => {
  // we add endpoint that throws error internally to the first router
  // order is important here in order to not hit default 404 endpoint
  for (let i = 0; i < app._router.stack.length; i++) {
    let layer = app._router.stack[i]
    if (layer.match("/v1") && layer.name == "router") {
      layer.handle.get("/endpoint_that_errors", (req, res, next) => {
        next(new Error("Forced error"))
      })
      break
    }
  }

  return request(app).get("/v1/endpoint_that_errors").then((response) => {
    expect(response.statusCode).toBe(500)
    expect(response.body).toMatchObject({
      error: "Internal Server Error"
    })
  })
})

//------------------------------------------------------------
//                     Home Page
//------------------------------------------------------------

test("It should return home info", () => {
  return request(app).get("/v1").then(response => {
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
//                     Company Info
//------------------------------------------------------------

test("It should return company info", () => {
  return request(app).get("/v1/info").then(response => {
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
//                     Vehicles
//------------------------------------------------------------

test("It should return all vehicle info", () => {
  return request(app).get("/v1/vehicles").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveLength(4)
    expect(response.body[0]).toHaveProperty("name", "Falcon 1")
    expect(response.body[1]).toHaveProperty("name", "Falcon 9")
    expect(response.body[2]).toHaveProperty("name", "Falcon Heavy")
    expect(response.body[3]).toHaveProperty("name", "Dragon 1")

    response.body.forEach(item => {
      expect(item).toHaveProperty("id", expect.any(String))
      expect(item).toHaveProperty("name", expect.any(String))
      expect(item).toHaveProperty("type", expect.stringMatching(/^(?:rocket|capsule)$/))
      expect(item).toHaveProperty("active", expect.any(Boolean))
      if (item.type === "rocket") {
        expect(item).toHaveProperty("stages", expect.any(Number))
        // expect(item).toHaveProperty("boosters", expect.any(Number)) // missing from falcon1
        expect(item).toHaveProperty("cost_per_launch", expect.any(Number))
        // expect(item).toHaveProperty("orbit_duration_yr", expect.any(Number)) // missing from falcon1
        // expect(item).toHaveProperty("success_rate_pct", expect.any(Number)) // missing from FH
        expect(item).toHaveProperty("first_flight", expect.stringMatching(/^(?:[0-9]{4}-[0-9]{2}-[0-9]{2}|TBD)$/))
        // expect(item).toHaveProperty("launchpad", expect.any(String)) // missing from falcon9
        expect(item).toHaveProperty("country", expect.any(String))
        expect(item).toHaveProperty("company", expect.any(String))
        expect(item).toHaveProperty("height", customMatchers.length())
        // expect(item).toHaveProperty("diameter", customMatchers.length()) // missing from FH
        // expect(item).toHaveProperty("total_width",customMatchers.length()) // missing from falcon1
        expect(item).toHaveProperty("mass", customMatchers.mass())
        expect(item).toHaveProperty("payload_weights", expect.any(Array))
        item.payload_weights.forEach(weight => {
          expect(weight).toEqual(customMatchers.payloadWeight())
        })
        expect(item).toHaveProperty("first_stage", customMatchers.vehicleStage())
        expect(item).toHaveProperty("second_stage", customMatchers.vehicleStage())
        // expect(item).toHaveProperty("landing_legs", expect.any(Number)) // missing from falcon1
        expect(item).toHaveProperty("description", expect.any(String))
      }
      else if (item.type === "capsule") {
        expect(item).toHaveProperty("sidewall_angle_deg", expect.any(Number))
        expect(item).toHaveProperty("orbit_duration_yr", expect.any(Number))
        expect(item).toHaveProperty("variations", expect.any(Object)) // TODO test it deeper
        expect(item).toHaveProperty("heat_shield.dev_partner", expect.any(String))
        expect(item).toHaveProperty("heat_shield.material", expect.any(String))
        expect(item).toHaveProperty("heat_shield.size_meters", expect.any(Number))
        expect(item).toHaveProperty("heat_shield.temp_degrees", expect.any(Number))
        expect(item).toHaveProperty("thrusters.amount", expect.any(Number))
        expect(item).toHaveProperty("thrusters.fuel_1", expect.any(String))
        expect(item).toHaveProperty("thrusters.fuel_2", expect.any(String))
        expect(item).toHaveProperty("thrusters.pods", expect.any(Number))
        expect(item).toHaveProperty("thrusters.thrust", customMatchers.thrust())
        expect(item).toHaveProperty("thrusters.type", expect.any(String))
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
      }
    })
  })
})

test("It should return Falcon 1 info", () => {
  return request(app).get("/v1/vehicles/falcon1").then(response => {
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
      // "boosters",
      "cost_per_launch",
      "success_rate_pct",
      "first_flight",
      "launchpad",
      "country",
      "company",
      "height",
      "diameter",
      // "total_width",
      "mass",
      "payload_weights",
      "first_stage",
      "second_stage",
      // "engines",
      // "landing_legs",
      "description"
    ])
  })
})

test("It should return Falcon 9 info", () => {
  return request(app).get("/v1/vehicles/falcon9").then(response => {
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
      // "boosters",
      "cost_per_launch",
      "success_rate_pct",
      "first_flight",
      // "launchpad",
      "country",
      "company",
      "height",
      "diameter",
      // "total_width",
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
  return request(app).get("/v1/vehicles/falconheavy").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty("name", "Falcon Heavy")
    expect(response.body).toHaveProperty("stages", 2)
    expect(response.body).toHaveProperty("cost_per_launch")
    // expect(response.body).toHaveProperty("success_rate_pct")
    // expect(response.body).toHaveProperty("first_flight")
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
      // "success_rate_pct",
      "first_flight",
      // "launchpad",
      "country",
      "company",
      "height",
      // "diameter",
      "total_width",
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

test("It should return Dragon info", () => {
  return request(app).get("/v1/vehicles/dragon").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty("name", "Dragon 1")
    expect(Object.keys(response.body)).toEqual([
      "id",
      "name",
      "type",
      "active",
      // "stages",
      // "cost_per_launch",
      // "success_rate_pct",
      // "first_flight",
      // "launchpad",
      // "country",
      // "company",
      // "height",
      "sidewall_angle_deg", // capsule specific field
      "orbit_duration_yr", // capsule specific field
      "variations", // capsule specific field
      "heat_shield", // capsule specific field
      "thrusters", // capsule specific field
      "launch_payload_mass", // capsule specific field
      "launch_payload_vol", // capsule specific field
      "return_payload_mass", // capsule specific field
      "return_payload_vol", // capsule specific field
      "pressurized_capsule", // capsule specific field
      "trunk", // capsule specific field
      "height_w_trunk", // capsule specific field
      "diameter",
      // "mass",
      // "payload_weights",
      // "first_stage",
      // "second_stage",
      // "description"
    ])
  })
})

//------------------------------------------------------------
//                     Launchpads
//------------------------------------------------------------

test("It should return all launchpads", () => {
  return request(app).get("/v1/launchpads").then(response => {
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
  return request(app).get("/v1/launchpads/ksc_lc_39a").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain("ksc_lc_39a")
  })
})

test("It should return no launchpads found info", () => {
  return request(app).get("/v1/launchpads/ksc_lc_40a").then(response => {
    expect(response.statusCode).toBe(404)
    expect(response.text).toContain("No results found")
  })
})

//------------------------------------------------------------
//                    Past Launches
//------------------------------------------------------------

test("It should return all past launches", () => {
  return request(app).get("/v1/launches").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBeGreaterThanOrEqual(50)
    response.body.forEach(item => {
      expect(item).toHaveProperty("flight_number", expect.anything())
      expect(item).toHaveProperty("launch_year", expect.stringMatching(/^[0-9]{4}$/))
      // expect(item).toHaveProperty("launch_date_unix")
      expect(item).toHaveProperty("launch_date_utc", expect.anything())
      expect(item).toHaveProperty("launch_date_local", expect.anything())
      expect(item).toHaveProperty("rocket.rocket_id")
      expect(item).toHaveProperty("rocket.rocket_name")
      expect(item).toHaveProperty("rocket.rocket_type")
      expect(item).toHaveProperty("telemetry.flight_club")
      expect(item).toHaveProperty("core_serial")
      expect(item).toHaveProperty("cap_serial")
      expect(item).toHaveProperty("reuse.core")
      expect(item).toHaveProperty("reuse.side_core1")
      expect(item).toHaveProperty("reuse.side_core2")
      expect(item).toHaveProperty("reuse.fairings")
      expect(item).toHaveProperty("reuse.capsule")
      expect(item).toHaveProperty("launch_site.site_id")
      expect(item).toHaveProperty("launch_site.site_name")
      expect(item).toHaveProperty("payloads")
      expect(item.payloads.length).toBeGreaterThan(0)
      item.payloads.forEach(payload => {
        expect(payload).toHaveProperty("payload_id")
        expect(payload).toHaveProperty("customers")
        expect(payload).toHaveProperty("payload_type")
        expect(payload).toHaveProperty("payload_mass_kg")
        expect(payload).toHaveProperty("payload_mass_lbs")
        expect(payload).toHaveProperty("orbit")
      })
      expect(item).toHaveProperty("launch_success")
      expect(item).toHaveProperty("reused")
      expect(item).toHaveProperty("land_success")
      expect(item).toHaveProperty("landing_type")
      expect(item).toHaveProperty("landing_vehicle")
      expect(item).toHaveProperty("links")
      expect(item).toHaveProperty("details")
    })
  })
})

test("It should return the latest launch", () => {
  return request(app).get("/v1/launches/latest").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty("flight_number")
  })
})

test("It should return all past launches from LC-4E", () => {
  return request(app).get("/v1/launches?site=vafb_slc_4e").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain("vafb_slc_4e")
  })
})

test("It should return no launches from made up launchpad", () => {
  return request(app).get("/v1/launches?site=vafb_slc_5e").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([])
  })
})

test("It should return all 2012 launches", () => {
  return request(app).get("/v1/launches?year=2012").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain("2012")
  })
})

test("It should return no 2005 launches", () => {
  return request(app).get("/v1/launches?year=2005").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([])
  })
})

test("It should return past launches in timeframe", () => {
  return request(app).get("/v1/launches?start=2011-01-20&final=2017-05-25").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.body).not.toHaveLength(0)
  })
})

test("It should return no past launches in timeframe", () => {
  return request(app).get("/v1/launches?start=2005-01-20&final=2005-05-25").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([])
  })
})

test("It should return all launches with core B1021", () => {
  return request(app).get("/v1/launches/cores/B1021").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain("B1021")
  })
})

test("It should return no launches with core A1021", () => {
  return request(app).get("/v1/launches/cores/A1021").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([])
  })
})

test("It should return all launches with cap C106", () => {
  return request(app).get("/v1/launches/caps/C106").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain("C106")
  })
})

test("It should return no launches with cap C403", () => {
  return request(app).get("/v1/launches/caps/C403").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([])
  })
})

test("It should return all past ASDS launches", () => {
  return request(app).get("/v1/launches/asds").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain("ASDS")
  })
})

test("It should return all past RTLS launches", () => {
  return request(app).get("/v1/launches/rtls").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain("RTLS")
  })
})

//------------------------------------------------------------
//                    Upcoming Launches
//------------------------------------------------------------

test("It should return all upcoming launches", () => {
  return request(app).get("/v1/launches/upcoming").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.body).not.toHaveLength(0)
  })
})

test("It should return all upcoming launches in 2017", () => {
  return request(app).get("/v1/launches/upcoming?year=2017").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.body).not.toHaveLength(0)
  })
})

test("It should return no upcoming launches in 2016", () => {
  return request(app).get("/v1/launches/upcoming?year=2016").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([])
  })
})

test("It should return all launches in the timeframe", () => {
  return request(app).get("/v1/launches/upcoming?start=2011-01-20&final=2055-05-25").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.body).not.toHaveLength(0)
  })
})

test("It should return no launches in the timeframe", () => {
  return request(app).get("/v1/launches/upcoming?start=2011-01-20&final=2016-05-25").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([])
  })
})

//------------------------------------------------------------
//                    Parts
//------------------------------------------------------------

test("It should return all capsule info", () => {
  return request(app).get("/v1/parts/caps").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain("C101")
    expect(response.text).toContain("C113")
  })
})

test("It should return all info on C106", () => {
  return request(app).get("/v1/parts/caps/C106").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain("C106")
  })
})

test("It should return no info on C406", () => {
  return request(app).get("/v1/parts/caps/C406").then(response => {
    expect(response.statusCode).toBe(404)
    expect(response.text).toContain("No results found")
  })
})

test("It should return all core info", () => {
  return request(app).get("/v1/parts/cores").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain("B0003")
    expect(response.text).toContain("B1040")
  })
})

test("It should return core info on B1021", () => {
  return request(app).get("/v1/parts/cores/B1021").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain("B1021")
  })
})

test("It should return no core info on A1021", () => {
  return request(app).get("/v1/parts/cores/A1021").then(response => {
    expect(response.statusCode).toBe(404)
    expect(response.text).toContain("No results found")
  })
})
