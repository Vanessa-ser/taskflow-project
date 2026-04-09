const express = require('express');
const cors = require('cors');
const { port } = require('./config/env');
const taskRoutes = require('./routes/task.routes');

const app = express();

// --- 1. Middlewares Globales ---
app.use(cors()); 
app.use(express.json()); 

// --- 2. Middleware de Auditoría (Logger) ---
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.url} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// --- 3. Rutas de la API ---
app.use('/api/v1/tasks', taskRoutes);

// --- 4. Ruta de Salud ---
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'up', message: 'Servidor TaskFlow listo' });
});

// --- 5. Manejo de Errores Global ---
app.use((err, req, res, next) => {
  console.error('❌ Error no controlado:', err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// --- 6. Inicio del Servidor ---
app.listen(port, () => {
  console.log('----------------------------------------------');
  console.log(`🚀 Servidor TaskFlow encendido`);
  console.log(`📍 URL: http://localhost:${port}/api/v1/tasks`);
  console.log('----------------------------------------------');
});

