require('dotenv').config();

const config = {
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 3000,
};

// Validación manual: si el PORT no existe en el .env, lanzamos error
if (!process.env.PORT) {
  throw new Error('❌ ERROR: El puerto no está definido en el archivo .env');
}

module.exports = config;