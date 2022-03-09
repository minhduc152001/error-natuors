const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  // console.log(con.connections);
  console.log('Connected to DB');
});

const port = 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// process.on('unhandledRejection', err => {
//   console.log(err.name, err.message);
//   console.log('UNHANDLED REJECTION! Shutting down...');
//   server.close(() => {
//     process.exit(1);
//   });
// });

// process.on('uncaughtException', err => {
//   console.log('UNCAUGHT EXCEPTION. Shutting down...');
//   console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });
