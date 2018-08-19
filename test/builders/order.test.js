
const order = require('../../src/builders/order');

test('It should return acending sort direction', () => {
  const query = {
    order: 'asc',
  };
  const data = order(query);
  expect(data).toEqual(1);
});

test('It should return decending sort direction', () => {
  const query = {
    order: 'desc',
  };
  const data = order(query);
  expect(data).toEqual(-1);
});

test('It should return the default sort direction', () => {
  const query = {};
  const data = order(query);
  expect(data).toEqual(1);
});
