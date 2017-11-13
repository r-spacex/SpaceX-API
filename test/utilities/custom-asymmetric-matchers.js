/**
 * We make ourselves compatible with AsymmetricMatcher class used by Jest
 * @see https://github.com/facebook/jest/blob/master/packages/expect/src/asymmetric_matchers.js
 *
 * Perhaps we can simplify that a bit and write only Jasmine-compatible matchers.
 * @see https://jasmine.github.io/2.4/introduction.html#section-Custom_asymmetric_equality_tester
 */
class CustomAsymmetricMatcher {
  constructor() {
    // $$typeof is used internally by Jest and just to be sure let's use jest Symbol
    this.$$typeof = Symbol.for("jest.asymmetricMatcher")
  }
}

/**
 * Expect metric and imperial volume numbers in object.
 */
class SpacexVolume extends CustomAsymmetricMatcher {
  asymmetricMatch(any) {
    expect(any).toEqual(expect.anything())
    expect(any).toHaveProperty("cubic_meters", expect.any(Number))
    expect(any).toHaveProperty("cubic_feet", expect.any(Number))
    expect(any.cubic_meters).toBeGreaterThanOrEqual(0)
    expect(any.cubic_feet).toBeGreaterThanOrEqual(0)
    return true
  }

  toString() {
    return "SpacexVolume"
  }

  getExpectedType() {
    return "object"
  }

  toAsymmetricMatcher() {
    return "SpacexVolume"
  }
}

/**
 * Expect metric and imperial length (or dimension) numbers in object.
 */
class SpacexLength extends CustomAsymmetricMatcher {
  asymmetricMatch(any) {
    expect(any).toEqual(expect.anything())
    expect(any).toHaveProperty("meters", expect.any(Number))
    expect(any).toHaveProperty("feet", expect.any(Number))
    expect(any.meters).toBeGreaterThanOrEqual(0)
    expect(any.feet).toBeGreaterThanOrEqual(0)
    return true
  }

  toString() {
    return "SpacexLength"
  }

  getExpectedType() {
    return "object"
  }

  toAsymmetricMatcher() {
    return "SpacexLength"
  }
}

/**
 * Expect metric and imperial mass numbers in object.
 */
class SpacexMass extends CustomAsymmetricMatcher {
  asymmetricMatch(any) {
    expect(any).toEqual(expect.anything())
    expect(any).toHaveProperty("kg", expect.any(Number))
    expect(any).toHaveProperty("lb", expect.any(Number))
    expect(any.kg).toBeGreaterThanOrEqual(0)
    expect(any.lb).toBeGreaterThanOrEqual(0)
    return true
  }

  toString() {
    return "SpacexMass"
  }

  getExpectedType() {
    return "object"
  }

  toAsymmetricMatcher() {
    return "SpacexMass"
  }
}

module.exports = {
  volume: () => {
    return new SpacexVolume()
  },
  length: () => {
    return new SpacexLength()
  },
  mass: () => {
    return new SpacexMass()
  }
}
