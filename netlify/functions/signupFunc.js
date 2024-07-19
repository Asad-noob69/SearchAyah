const connectToDatabase = require('./connectMongo');
const bcrypt = require('bcryptjs');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }

  try {
    const { email, username, password } = JSON.parse(event.body || '{}');

    if (!email || !username || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Email, username, and password are required' }),
      };
    }

    const client = await connectToDatabase();
    const db = client.db('sample_mflix');
    const users = db.collection('users');

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await users.findOneAndUpdate(
      { $or: [{ email }, { username }] },
      {
        $setOnInsert: {
          email,
          username,
          password: hashedPassword,
        },
      },
      { upsert: true, returnDocument: 'after' }
    );

    if (result && result.lastErrorObject && result.lastErrorObject.updatedExisting) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Email or username already exists' }),
      };
    }

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ message: 'User created successfully' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: error.statusCode || 500,
      headers,
      body: JSON.stringify({ message: error.message || 'Internal Server Error' }),
    };
  }
};
