const { fetchLaunch } = require('../../src/helpers/launch-database');
const app = require('../../src/app');
const queryBuilder = require('../../src/builders/launch-query');
const sortBuilder = require('../../src/builders/launch-sort');

describe('Helpers - Launch database', () => {
  beforeAll((done) => {
    app.on('ready', () => {
      done();
    });
  });

  it('Should call the launchQuery and launchSort functions', async (done) => {
    const querySpy = jest.spyOn(queryBuilder, 'launchQuery');
    const sortSpy = jest.spyOn(sortBuilder, 'launchSort');

    await fetchLaunch('launches_v2', { query: [] });

    expect(querySpy).toHaveBeenCalled();
    expect(sortSpy).toHaveBeenCalled();

    done();
  });

  it('Should work for the launches collections', async (done) => {
    const launches = await fetchLaunch('launches_v2', { query: [] });

    expect(launches).not.toBeUndefined();
    expect(Array.isArray(launches)).toBe(true);

    done();
  });

  it('Should work for the upcoming collections', async (done) => {
    const launches = await fetchLaunch('upcoming_v2', { query: [] });

    expect(launches).toBeDefined();
    expect(Array.isArray(launches)).toBe(true);

    done();
  });
});
