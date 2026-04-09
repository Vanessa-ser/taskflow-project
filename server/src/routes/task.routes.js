const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.get('/', taskController.getTasks);
router.post('/', taskController.createNewTask);
router.delete('/:id', taskController.removeTask);

module.exports = router;