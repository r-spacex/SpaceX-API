
const app = require("../app")
const request = require("supertest")

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
    expect(response.text).toContain("No results found")
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
    expect(response.text).toContain("SpaceX-API")
  })
})

//------------------------------------------------------------
//                     Company Info
//------------------------------------------------------------

test("It should return company info", () => {
  return request(app).get("/v1/info").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain("Elon Musk")
  })
})

//------------------------------------------------------------
//                     Vehicles
//------------------------------------------------------------

test("It should return all vehicle info", () => {
  return request(app).get("/v1/vehicles").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain("Falcon 1")
    expect(response.text).toContain("Falcon 9")
    expect(response.text).toContain("Falcon Heavy")
    expect(response.text).toContain("Dragon")
  })
})

test("It should return Falcon 1 info", () => {
  return request(app).get("/v1/vehicles/falcon1").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain("Falcon 1")
  })
})

test("It should return Falcon 9 info", () => {
  return request(app).get("/v1/vehicles/falcon9").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain("Falcon 9")
  })
})

test("It should return Falcon Heavy info", () => {
  return request(app).get("/v1/vehicles/falconheavy").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain("Falcon Heavy")
  })
})

test("It should return Dragon info", () => {
  return request(app).get("/v1/vehicles/dragon").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.text).toContain("Dragon")
  })
})

//------------------------------------------------------------
//                     Launchpads
//------------------------------------------------------------

test("It should return all launchpads", () => {
  return request(app).get("/v1/launchpads").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.text.length).toBe(3735)
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
    expect(response.text.length).toBeGreaterThan(70000)
  })
})

test("It should return the latest launch", () => {
  return request(app).get("/v1/launches/latest").then(response => {
    expect(response.statusCode).toBe(200)
    expect(response.text.length).toBeGreaterThan(0)
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
