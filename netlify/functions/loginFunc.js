const connectToDatabase = require('./connectMongo');
const bcrypt = require('bcryptjs');

exports.handler = async (event, context) => {
  const { username, password } = JSON.parse(event.body);

  if (!username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Username and password are required' }),
    };
  }

  try {
    const client = await connectToDatabase();
    const db = client.db('sample_mflix');
    const users = db.collection('users');

    const user = await users.findOne({ username });

    if (!user) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid username or password' }),
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid username or password' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Login successful' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
};
