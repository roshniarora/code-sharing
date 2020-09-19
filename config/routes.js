const express = require('express');
const router = express.Router();
const usersController = require('../app/controllers/usersController');
const roomsController = require('../app/controllers/roomsController');
const { authenticateUser } = require('../app/middlewares/authentication');

// user
router.post('/users/register', usersController.register);
router.post('/users/login', usersController.login);
router.get('/users/account', authenticateUser, usersController.account);

//room
router.post('/room', authenticateUser, roomsController.create);
router.get('/agendas', authenticateUser, roomsController.listAgenda);
router.post('/roomotp', authenticateUser, roomsController.optShow);
router.get('/rooms', authenticateUser, roomsController.list);
router.post('/createAgenda', authenticateUser, roomsController.createAgenda);
router.get('/room/:id', authenticateUser, roomsController.show);
router.get('/:otp', roomsController.optShowGet);
router.get('/showAgenda/:id', authenticateUser, roomsController.showAgenda);
// router.put('/room/:id', authenticateUser, roomsController.update);

module.exports = router;
