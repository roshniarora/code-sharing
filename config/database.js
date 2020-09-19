const mongoose = require('mongoose');

const configureDB = () => {
  mongoose
    .connect('mongodb://localhost:27017/code-sharing', {
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
