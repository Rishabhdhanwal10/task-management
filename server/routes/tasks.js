const express = require('express');
const router = express.Router();
const taskController = require("../controllers/tasks_controller");
const verifyToken = require("../config/middleware");

router.post('/create', verifyToken, taskController.create);
router.get('/getData', verifyToken, taskController.getData);
router.post('/update/:id', verifyToken, taskController.update);
router.delete('/delete/:id', verifyToken, taskController.delete);

module.exports = router;