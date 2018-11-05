/*eslint-disable */
const MongoClient = require('mongodb')

const url =
  process.env.MONGO_URL ||
  'mongodb+srv://public:spacex@spacex-gpg0u.mongodb.net/spacex-api'

const getDB = async () => {
  const client = await MongoClient.connect(
    url,
    { poolSize: 20, useNewUrlParser: true }
  )

  return client.db('spacex-api')
}

module.exports = getDB
