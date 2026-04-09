// "almacén" de datos
let tasks = [
  { id: 1, title: 'Preparar 2 tartas de queso para el pedido de las 17h', priority: 'Alta' },
  { id: 2, title: 'Revisar stock de café de especialidad', priority: 'Media' },
  { id: 3, title: 'Hornear croissants de mantequilla (tanda de tarde)', priority: 'Alta' },
  { id: 4, title: 'Llamar al proveedor de pistachos', priority: 'Baja' },
  { id: 5, title: 'Confirmar reserva de mesa para el sábado', priority: 'Media' },
  { id: 6, title: '✅ Conexión Fullstack completada con éxito', priority: 'Alta' }
  ];
  
  // obtener todas las tareas
  const getAllTasks = () => {
    return tasks;
  };
  
  // crear una tarea
  const createTask = (data) => {
    const newTask = {
      id: Date.now(),
      title: data.title,
      priority: data.priority || 1,
      completed: false
    };
    tasks.push(newTask);
    return newTask;
  };
  
  // borrar una tarea
  const deleteTask = (id) => {
    const index = tasks.findIndex(t => t.id === parseInt(id));
    if (index === -1) {
      throw new Error('NOT_FOUND');
    }
    return tasks.splice(index, 1);
  };
  
  module.exports = {
    getAllTasks,
    createTask,
    deleteTask
  };