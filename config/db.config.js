const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log(`Successfully connected to the database ${MONGODB_URI}`))
  .catch(error => console.error(`An error ocurred trying to connect the database ${MONGODB_URI}`, error));

  process.on(`SIGINT`, function () {
      mongoose.connection.close(function () {
        console.log(`Mongoose disconnected on app termination`);
        process.exit(0);
    });
  });