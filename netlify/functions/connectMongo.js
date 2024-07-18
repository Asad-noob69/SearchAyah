const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(uri);

  await client.connect();
  cachedClient = client;

  return client;
}

module.exports = connectToDatabase;
