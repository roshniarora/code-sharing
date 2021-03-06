const Room = require("../models/rooms");
const otpGenerator = require("otp-generator");
const Agenda = require("../models/agendas");

const otp = () =>
  otpGenerator.generate(6, { upperCase: false, specialChars: false });

module.exports.create = (req, res) => {
  console.log(req.user._id, req.user);
  const body = req.body;
  const room = new Room({
    ...body,
    userId: req.user._id,
    agenda: body.agenda,
    agendaOtp: body.agendaOtp,
  });
  room
    .save()
    .then((room) => {
      Agenda.findByIdAndUpdate(
        room.agenda,
        { $push: { rooms: room._id } },
        { new: true }
      )
        .then((res) => {})
        .catch((err) => console.log(err));
      res.json(room);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.createAgenda = (req, res) => {
  const body = req.body;
  const room = new Agenda({ ...body, userId: req.user._id, otp: otp() });
  room
    .save()
    .then((room) => {
      res.json(room);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.list = (req, res) => {
  const userId = req.user._id;
  Room.find({ userId: { $in: [userId] } })
    .then((room) => {
      res.json(room);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.show = (req, res) => {
  const id = req.params.id;

  Room.findById(id)
    .then((room) => {
      res.json(room);
    })
    .catch((err) => {
      res.json(err);
    });
};
module.exports.showAgenda = (req, res) => {
  const id = req.params.id;

  Agenda.findById(id)
    .then((room) => {
      res.json(room);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.optShow = (req, res) => {
  const body = req.body;
  Agenda.findOne({ otp: body.otp })
    .populate("rooms")
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => res.status(403).send(err.message));
};

module.exports.listAgenda = (req, res) => {
  const userId = req.user._id;
  Agenda.find({ userId: { $in: [userId] } })
    .then((room) => {
      res.json(room);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.optShowGet = (req, res) => {
  const otp = req.params;
  Agenda.findOne(otp)
    .populate("rooms")
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => res.status(403).send(err.message));
};
