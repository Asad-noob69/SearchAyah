const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'asadalikhan1',
  database: 'mydatabase'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

exports.handler = async (event, context) => {
  const { type, username, password } = JSON.parse(event.body);

  if (type === 'register') {
    // Handle registration
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    connection.query(query, [username, password], (err, results) => {
      if (err) throw err;
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'User registered successfully' })
      };
    });
  } else if (type === 'login') {
    // Handle login
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    connection.query(query, [username, password], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Login successful' })
        };
      } else {
        return {
          statusCode: 401,
          body: JSON.stringify({ message: 'Invalid credentials' })
        };
      }
    });
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ message: 'Invalid request type' })
  };
};
