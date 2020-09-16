const mongoose = require('mongoose');

const configureDB = () => {
  mongoose
    .connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/code-sharing',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    )
    .then(() => {
      console.log('connected to database');
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = configureDB;
