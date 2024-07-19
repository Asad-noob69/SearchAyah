const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const connectionTimeout = 5000; // 5 seconds

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: connectionTimeout,
  });

  try {
    await client.connect();
    cachedClient = client;
    return client;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

module.exports = connectToDatabase;