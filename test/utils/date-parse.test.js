
const { dateRange } = require('../../src/utils');

test('It should return the correct date comparison object', () => {
  const query = {
    start: '2017-06-22',
    final: '2017-06-25',
  };
  const response = dateRange(query);
  expect(response).toEqual({ $gte: '2017-06-22T00:00:00.000Z', $lte: '2017-06-25T00:00:00.000Z' });
});
