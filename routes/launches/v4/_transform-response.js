/* eslint-disable no-underscore-dangle */
const buildCrew = (launch) => launch.crew.map((crew) => {
  if (crew?.crew) {
    return crew?.crew;
  }
  return crew;
});

module.exports = async (payload) => {
  if (Array.isArray(payload)) {
    return payload.map((launch) => ({
      ...launch.toObject(),
      crew: buildCrew(launch.toObject()),
    }));
  }
  if (Array.isArray(payload?.docs)) {
    const docs = payload.docs.map((launch) => ({
      ...launch.toObject(),
      crew: buildCrew(launch.toObject()),
    }));
    return {
      ...payload,
      docs,
    };
  }
  return {
    ...payload.toObject(),
    crew: buildCrew(payload.toObject()),
  };
};
