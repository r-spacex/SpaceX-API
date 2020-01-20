
const { lowerCase } = require('../../src/utils');

it('should return an empty string when null', () => {
  const result = lowerCase(null);
  expect(result).toEqual('');
});

it('should return an empty string when undefined', () => {
  const result = lowerCase(undefined);
  expect(result).toEqual('');
});

it('should lowercase a string', () => {
  const result = lowerCase('tHIs IS A TeST');
  expect(result).toEqual('this is a test');
});
