import { MongoClient, MongoClientOptions } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

// Optimized connection options for maximum performance
const options: MongoClientOptions = {
  // Connection pool settings
  maxPoolSize: 10, // Maximum number of connections in the pool
  minPoolSize: 2, // Minimum number of connections in the pool
  maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
  
  // Timeout settings
  serverSelectionTimeoutMS: 5000, // How long to try selecting a server
  socketTimeoutMS: 45000, // How long a send or receive on a socket can take before timeout
  connectTimeoutMS: 10000, // How long to wait for initial connection
  
  // Performance optimizations
  family: 4, // Use IPv4 only (faster than trying IPv6 first)
  
  // Compression for faster data transfer
  compressors: ['zlib'],
  zlibCompressionLevel: 6,
  
  // Read/Write concerns for performance
  readPreference: 'primary', // Read from primary for consistency
  retryWrites: true, // Automatically retry writes
  retryReads: true, // Automatically retry reads
  
  // Additional performance settings
  maxConnecting: 2, // Maximum number of connections being established at once
  heartbeatFrequencyMS: 10000, // How often to check server health
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve connections
  // across module reloads caused by HMR (Hot Module Replacement)
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
  }
  client = globalWithMongo._mongoClient;

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = client.connect();
    
    // Add connection event listeners for debugging
    globalWithMongo._mongoClientPromise.then((client) => {
      console.log('🚀 MongoDB connected successfully in development');
      
      client.on('serverOpening', () => {
        console.log('📡 MongoDB server connection opened');
      });
      
      client.on('serverClosed', () => {
        console.log('📡 MongoDB server connection closed');
      });
    }).catch((error) => {
      console.error('❌ MongoDB connection error:', error);
    });
  }
  
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, create a new client for each serverless function
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
  
  // Production connection logging
  clientPromise.then(() => {
    console.log('🚀 MongoDB connected successfully in production');
  }).catch((error) => {
    console.error('❌ MongoDB production connection error:', error);
  });
}

// Graceful shutdown handling
process.on('SIGINT', async () => {
  if (client) {
    await client.close();
    console.log('🔐 MongoDB connection closed gracefully');
  }
  process.exit(0);
});

export default clientPromise;