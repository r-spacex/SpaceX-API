const request = require("supertest")
const app = require("../src/app")

beforeAll((done) => {
  app.on("ready", () => {
    done()
  })
})

test("It should return the correct flight number", () => {
  return request(app).get("/v2/launches?flight_number=23").then(response => {
    expect(response.statusCode).toBe(200)
  })
})
