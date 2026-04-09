const taskService = require('../services/task.service');

// Obtener todas
const getTasks = (req, res) => {
  const tasks = taskService.getAllTasks();
  res.status(200).json(tasks);
};

// Crear una (con la validación que pide el profesor)
const createNewTask = (req, res) => {
  const { title, priority } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length < 3) {
    return res.status(400).json({ 
      error: "Error de validación", 
      message: "El título debe tener al menos 3 caracteres" 
    });
  }

  const newTask = taskService.createTask({ title, priority });
  res.status(201).json(newTask);
};

// Eliminar
const removeTask = (req, res) => {
  try {
    const { id } = req.params;
    taskService.deleteTask(id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Tarea no encontrada" });
  }
};

module.exports = { getTasks, createNewTask, removeTask };