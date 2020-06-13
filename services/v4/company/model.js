const mongoose = require('mongoose');
const idPlugin = require('mongoose-id');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  founder: {
    type: String,
  },
  founded: {
    type: Number,
  },
  employees: {
    type: Number,
  },
  vehicles: {
    type: Number,
  },
  launch_sites: {
    type: Number,
  },
  test_sites: {
    type: Number,
  },
  ceo: {
    type: String,
  },
  cto: {
    type: String,
  },
  coo: {
    type: String,
  },
  cto_propulsion: {
    type: String,
  },
  valuation: {
    type: Number,
  },
  headquarters: {
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
  },
  links: {
    website: {
      type: String,
    },
    flickr: {
      type: String,
    },
    twitter: {
      type: String,
    },
    elon_twitter: {
      type: String,
    },
  },
  summary: {
    type: String,
  },
}, { autoCreate: true });

companySchema.plugin(idPlugin);

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
