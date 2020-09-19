const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const isEmail = require('validator/lib/isEmail');
const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    minlength: 4,
    maxlength: 64,
  },

  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: function (value) {
        return isEmail(value);
      },
      message: function () {
        return 'invalid email format';
      },
    },
  },

  password: {
    type: String,
    require: true,
    minlength: 6,
    maxlength: 128,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  mobile: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
