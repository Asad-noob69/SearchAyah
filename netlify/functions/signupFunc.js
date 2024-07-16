const connectToDatabase = require('./connectMongo');
const bcrypt = require('bcryptjs');

exports.handler = async (event, context) => {
  console.log('Received event:', event);  // Log the entire event object

  let email, username, password;

  try {
    // Check if event.body exists and is not empty
    if (!event.body) {
      throw new Error('Event body is empty or undefined');
    }

    console.log('Event body:', event.body);  // Log the event body

    const parsedBody = JSON.parse(event.body);
    console.log('Parsed body:', parsedBody);  // Log the parsed body

    ({ email, username, password } = parsedBody);
  } catch (error) {
    console.error('Error parsing event body:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid JSON in request body', error: error.message }),
    };
  }

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
    console.error('Error in database operation:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
};