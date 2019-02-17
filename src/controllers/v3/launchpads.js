
const limit = require('../../lib/query-builder/v3/limit');
const offset = require('../../lib/query-builder/v3/offset');
const project = require('../../lib/query-builder/v3/project');

module.exports = {

  /**
   * Return all launchpads
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('launchpad')
      .find({})
      .project(project(ctx.request.query))
      .skip(offset(ctx.request.query))
      .limit(limit(ctx.request.query));
    ctx.state.data = data;
    const res = await data.toArray();
    res.forEach((pad) => {
      pad.site_id = pad.id;
      pad.id = pad.padid;
      pad.site_name_long = pad.full_name;
      delete pad.padid;
      delete pad.full_name;
    });
    ctx.body = res;
  },

  /**
   * Return specific launchpad
   */
  specific: async (ctx) => {
    const data = await global.db
      .collection('launchpad')
      .find({ id: ctx.params.pad })
      .project(project(ctx.request.query))
      .limit(1)
      .toArray();
    if (data.length === 0) {
      ctx.throw(404);
    }
    data[0].site_id = data[0].id;
    data[0].id = data[0].padid;
    data[0].site_name_long = data[0].full_name;
    delete data[0].padid;
    delete data[0].full_name;
    [ctx.body] = data;
  },

};
