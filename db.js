var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'aws-simple.cbuos43uuptu.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: '12345678',
    database: 'innodb'
  });

connection.connect(function(err) {
  if (err) throw err;
  console.log('connected!');
});
// add port to listen to
module.exports = connection;