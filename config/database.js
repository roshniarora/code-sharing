const mongoose = require('mongoose');

const configureDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('connected to database');
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = configureDB;
