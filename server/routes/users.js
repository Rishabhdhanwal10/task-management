const express = require('express');
const router = express.Router();
const userController = require("../controllers/users_controllers");

router.post('/register', userController.register);
router.post('/signin', userController.signIn);
router.get('/logout', userController.logout);

module.exports = router;