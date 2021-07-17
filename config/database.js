const mongoose = require("mongoose");

const connection_url =
  "mongodb+srv://rohan9808558899:rohan9808558899@cluster0.wp2e2.mongodb.net/codeShare?retryWrites=true&w=majority";

const configureDB = () => {
  mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

module.exports = configureDB;
