import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port:3308,
  database: 'task_backend',
  
});

connection.connect((err) => {
  if (err) {
    console.error('Lỗi: ', err);
    return;
  }
});

export default connection;
