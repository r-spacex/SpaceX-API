#!/usr/bin/env node

// TODO: Build requests for Orbital Elements, and Observer speeds for Mars and Earth
// TODO: Parse JPL plaintext responses for data

// const MongoClient = require('mongodb');

// const updateMongo = async (data) => {
//   let client;
//   try {
//     client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true });
//     const db = client.db('spacex-api');
//     const col = db.collection('info');

//     await col.updateOne({ name: 'Elon Musk\'s Tesla Roadster' }, { $set: data });
//     console.log('Updated!');
//   } catch (err) {
//     console.log(err.stack);
//     process.exit(1);
//   }

//   if (client) {
//     client.close();
//   }
// };

// updateMongo();
