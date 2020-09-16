const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const twilioToken = '196c96589ce12907abd384dcb8079934';
const twilioSid = 'ACa54e727471bd523b258720eb97a02b8e';
const client = require('twilio')(twilioSid, twilioToken);

module.exports.register = (req, res) => {
  const body = req.body;
  const user = new User(body);

  bcryptjs.genSalt().then((salt) => {
    bcryptjs.hash(user.password, salt).then((encrypted) => {
      user.password = encrypted;
      user
        .save()
        .then((user) => {
          res.json(user);
        })
        .catch((err) => {
          res.json(err);
        });
    });
  });
};

module.exports.login = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (!user)
    return res.status(500).send({ error: 'invalid Email or password' });
  console.log(user, ':::::::::::::');
  const password = await bcryptjs.compare(body.password, user.password);
  if (!password)
    return res.status(500).send({ error: 'invalid email or password' });
  const tokenData = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };
  const token = jwt.sign(tokenData, process.env.SECRET_TOKEN, {
    expiresIn: '2d',
  });

  client.messages
    .create({
      to: '+919675790190',
      from: '+19125742152',
      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    })
    .then((message) => console.log('Send message asdasd', message))
    .catch((err) => console.log(err));

  res.json({
    token: `Bearer ${token}`,
  });

  //  else res.status(200).send({ errors: 'invalid email or password' })
  //  .then((user) => {
  //     if (!user) {
  //       res.status(500).send({
  //         errors: 'invalid email and passowrd',
  //       });
  //     }
  //     bcryptjs.compare(body.password, user.password).then((match) => {
  //       if (match) {
  //         const tokenData = {
  //           _id: user._id,
  //           email: user.email,
  //           username: user.username,
  //         };
  //         const token = jwt.sign(tokenData, 'secret123', { expiresIn: '2d' });
  //         res.json({
  //           token: `Bearer ${token}`,
  //         });
  //       } else res.status(200).send({ errors: 'invalid email or password' });
  //     });
  //   });
};

module.exports.account = (req, res) => {
  // res.json(req.user);
  User.find()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.json(err));
};

/*
const user = new User()
user.username = body.username
user.email = body.email
user.password = body.password


*/
