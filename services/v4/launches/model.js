
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const idPlugin = require('mongoose-id');

const launchSchema = new mongoose.Schema({
  flight_number: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  date_utc: {
    type: String,
    required: true,
  },
  date_unix: {
    type: String,
    required: true,
  },
  date_local: {
    type: String,
    required: true,
  },
  date_precision: {
    type: String,
    required: true,
    enum: ['half', 'quarter', 'year', 'month', 'day', 'hour'],
  },
  static_fire_date_utc: {
    type: String,
    default: null,
  },
  static_fire_date_unix: {
    type: String,
    default: null,
  },
  tdb: {
    type: Boolean,
    default: false,
  },
  net: {
    type: Boolean,
    default: false,
  },
  window: {
    type: Number,
    default: null,
  },
  rocket: {
    type: mongoose.ObjectId,
    default: null,
  },
  success: {
    type: Boolean,
    default: null,
  },
  failures: [String],
  upcoming: {
    type: Boolean,
    required: true,
  },
  details: {
    type: String,
    default: null,
  },
  fairings: {
    reused: {
      type: Boolean,
      default: null,
    },
    recovery_attempt: {
      type: Boolean,
      default: null,
    },
    recovered: {
      type: Boolean,
      default: null,
    },
    ships: [
      mongoose.ObjectId,
    ],
  },
  crew: [
    mongoose.ObjectId,
  ],
  ships: [
    mongoose.ObjectId,
  ],
  payloads: [
    mongoose.ObjectId,
  ],
  launchpad: {
    type: mongoose.ObjectId,
    default: null,
  },
  cores: [{
    _id: false,
    core: {
      type: mongoose.ObjectId,
      default: null,
    },
    flight: {
      type: Number,
      default: null,
    },
    gridfins: {
      type: Boolean,
      default: null,
    },
    legs: {
      type: Boolean,
      default: null,
    },
    reused: {
      type: Boolean,
      default: null,
    },
    landing_attempt: {
      type: Boolean,
      default: null,
    },
    landing_success: {
      type: Boolean,
      default: null,
    },
    landing_type: {
      type: String,
      default: null,
    },
    landpad: {
      type: mongoose.ObjectId,
      default: null,
    },
  }],
  links: {
    patch: {
      small: {
        type: String,
        default: null,
      },
      large: {
        type: String,
        default: null,
      },
    },
    reddit: {
      campaign: {
        type: String,
        default: null,
      },
      launch: {
        type: String,
        default: null,
      },
      media: {
        type: String,
        default: null,
      },
      recovery: {
        type: String,
        default: null,
      },
    },
    flickr: {
      small: [String],
      original: [String],
    },
    presskit: {
      type: String,
      default: null,
    },
    webcast: {
      type: String,
      default: null,
    },
    youtube_id: {
      type: String,
      default: null,
    },
    article: {
      type: String,
      default: null,
    },
    wikipedia: {
      type: String,
      default: null,
    },
  },
});

launchSchema.plugin(mongoosePaginate);
launchSchema.plugin(idPlugin);

const Launch = mongoose.model('Launch', launchSchema);

module.exports = Launch;
