
const sort = require('../../src/builders/sort');

test('It should return the correct sort object', () => {
  const response = {
    query: {
      sort: 'flight_number',
      order: 'asc',
    },
  };
  const data = sort(response);
  expect(data).toEqual({ flight_number: 1 });
});
