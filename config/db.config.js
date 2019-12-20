const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://heroku_zvfmxrdq:pr92jk6p0i8hqcj04kmm7hc15a@ds125693.mlab.com:25693/heroku_zvfmxrdq';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log(`Successfully connected to the database ${MONGODB_URI}`))
  .catch(error => console.error(`An error ocurred trying to connect the database ${MONGODB_URI}`, error));

  process.on(`SIGINT`, function () {
      mongoose.connection.close(function () {
        console.log(`Mongoose disconnected on app termination`);
        process.exit(0);
    });
  });