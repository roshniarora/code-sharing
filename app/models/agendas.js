const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const agendaSchema = new Schema({
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
  otp: {
    type: String,
    required: true,
  },
  isAccess: {
    type: Boolean,
    default: false,
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const Agenda = mongoose.model('Agenda', agendaSchema);

module.exports = Agenda;
