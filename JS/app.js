const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'asadalikhan1',  // Replace 'your_password' with your actual MySQL password
  database: 'mydatabase'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');

  // Example query
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    console.log(results);
  });
});