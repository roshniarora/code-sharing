const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const roomsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isAccess: {
    type: Boolean,
    default: false,
  },
  agenda: {
    type: Schema.Types.ObjectId,
    ref: 'Agenda',
    required: true,
  },
});
const Room = mongoose.model('Room', roomsSchema);
module.exports = Room;
