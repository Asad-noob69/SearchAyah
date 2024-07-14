const connectToDatabase = require('./connectMongo');
const bcrypt = require('bcryptjs');

exports.handler = async (event, context) => {
  const { email, username, password } = JSON.parse(event.body);

  if (!email || !username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Email, username, and password are required' }),
    };
  }

  try {
    const client = await connectToDatabase();
    const db = client.db('sample_mflix');
    const users = db.collection('users');

    const existingUser = await users.findOne({ username });

    if (existingUser) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Username already exists' }),
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await users.insertOne({ email, username, password: hashedPassword });

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'User created successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
};
