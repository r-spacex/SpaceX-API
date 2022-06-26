/* eslint-disable no-underscore-dangle */
const buildCrew = (launch) => {
  if (Array.isArray(launch?.crew) && launch.crew.length === 0) {
    return [];
  }
  return launch.crew.map((crew) => {
    if (crew?.crew) {
      return crew?.crew;
    }
    return crew;
  });
};

export default async (payload) => {
  if (Array.isArray(payload)) {
    return payload.map((launch) => {
      if (Array.isArray(launch?.crew)) {
        return {
          ...launch.toObject(),
          crew: buildCrew(launch.toObject()),
        };
      }
      return {
        ...launch.toObject(),
      };
    });
  }
  if (Array.isArray(payload?.docs)) {
    const docs = payload.docs.map((launch) => {
      if (Array.isArray(launch?.crew)) {
        return {
          ...launch.toObject(),
          crew: buildCrew(launch.toObject()),
        };
      }
      return {
        ...launch.toObject(),
      };
    });
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
