/* eslint-disable max-classes-per-file */
/**
 * We make ourselves compatible with AsymmetricMatcher class used by Jest
 * @see https://github.com/facebook/jest/blob/master/packages/expect/src/asymmetricMatchers.ts
 *
 * Perhaps we can simplify that a bit and write only Jasmine-compatible matchers.
 * @see https://jasmine.github.io/2.4/introduction.html#section-Custom_asymmetric_equality_tester
 */
class CustomAsymmetricMatcher {
  constructor() {
    // $$typeof is used internally by Jest and just to be sure let's use jest Symbol
    this.$$typeof = Symbol.for('jest.asymmetricMatcher');
  }

  toAsymmetricMatcher() {
    return this.toString();
  }
}

class SpacexComposite extends CustomAsymmetricMatcher {
  asymmetricMatch(any) {
    return any !== undefined && typeof any === 'object';
  }

  getExpectedType() {
    return 'object';
  }
}

/**
 * Expect metric and imperial volume numbers in object.
 */
class SpacexVolume extends SpacexComposite {
  asymmetricMatch(any) {
    if (!super.asymmetricMatch(any)) {
      return false;
    }
    expect(any).toHaveProperty('cubic_meters');
    expect(any).toHaveProperty('cubic_feet');
    return true;
  }

  toString() {
    return 'SpacexVolume';
  }
}

/**
 * Expect metric and imperial length (or dimension) numbers in object.
 */
class SpacexLength extends SpacexComposite {
  asymmetricMatch(any) {
    if (!super.asymmetricMatch(any)) {
      return false;
    }
    expect(any).toHaveProperty('meters');
    expect(any).toHaveProperty('feet');
    return true;
  }

  toString() {
    return 'SpacexLength';
  }
}

/**
 * Expect metric and imperial mass numbers in object.
 */
class SpacexMass extends SpacexComposite {
  asymmetricMatch(any) {
    if (!super.asymmetricMatch(any)) {
      return false;
    }
    expect(any).toHaveProperty('kg');
    expect(any).toHaveProperty('lb');
    return true;
  }

  toString() {
    return 'SpacexMass';
  }
}

/**
 * Expect metric and imperial thrust numbers in object.
 */
class SpacexThrust extends SpacexComposite {
  asymmetricMatch(any) {
    if (!super.asymmetricMatch(any)) {
      return false;
    }
    expect(any).toHaveProperty('kN');
    expect(any).toHaveProperty('lbf');
    return true;
  }

  toString() {
    return 'SpacexThrust';
  }
}

/**
 * Expect composite payload weight object.
 */
class SpacexPayloadWeight extends SpacexComposite {
  asymmetricMatch(any) {
    if (!super.asymmetricMatch(any)) {
      return false;
    }
    expect(any).toHaveProperty('id');
    expect(any).toHaveProperty('name');
    expect(any).toEqual(new SpacexMass());
    return true;
  }

  toString() {
    return 'SpacexPayloadWeight';
  }
}

/**
 * Expect composite stage information object.
 */
class SpacexVehicleStage extends SpacexComposite {
  asymmetricMatch(any) {
    if (!super.asymmetricMatch(any)) {
      return false;
    }
    // expect(any).toHaveProperty('reusable', expect.any(Boolean))
    // expect(any).toHaveProperty('engines', expect.any(String))
    // expect(any).toHaveProperty('fuel_amount_tons', expect.any(Number))
    expect(any).toHaveProperty('burn_time_sec');
    // expect(any).toHaveProperty('thrust_sea_level', new SpacexThrust())
    // expect(any).toHaveProperty('thrust_vacuum', new SpacexThrust())
    // expect(any).toHaveProperty('payloads', expect.any(String)) //
    return true;
  }

  toString() {
    return 'SpacexPayloadWeight';
  }
}

module.exports = {
  volume: () => new SpacexVolume(),
  length: () => new SpacexLength(),
  mass: () => new SpacexMass(),
  thrust: () => new SpacexThrust(),
  payloadWeight: () => new SpacexPayloadWeight(),
  vehicleStage: () => new SpacexVehicleStage(),
};
