/* eslint-disable no-underscore-dangle */

const buildFairings = (launch) => {
  let fairings = {};
  if (launch?.fairings?.length) {
    fairings.recovery_attempt = launch.fairings.some((f) => f.recovered);
    fairings.reused = launch.fairings.some((f) => f.reused);
    fairings.recovered = launch.fairings.some((f) => f.net_attempt || f.water_attempt);
    fairings.ships = launch.fairings.flatMap((f) => f.ships);
  } else {
    fairings = null;
  }
  return fairings;
};

const buildCrew = (launch) => launch.crew.map((crew) => crew.crew);

module.exports = async (payload) => {
  if (Array.isArray(payload)) {
    return payload.map((launch) => ({
      ...launch.toObject(),
      fairings: buildFairings(launch.toObject()),
      crew: buildCrew(launch),
    }));
  }
  if (Array.isArray(payload?.docs)) {
    const docs = payload.docs.map((launch) => ({
      ...launch.toObject(),
      fairings: buildFairings(launch.toObject()),
      crew: buildCrew(launch),
    }));
    return {
      ...payload,
      docs,
    };
  }
  return {
    ...payload.toObject(),
    fairings: buildFairings(payload.toObject()),
    crew: buildCrew(payload._doc),
  };
};
