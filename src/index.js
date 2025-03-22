require('dotenv').config({path: `${process.cwd()}/.env`});

const express = require('express');
const authController = require('./auth/controllers/authController')
const sequelize = require('./config/database'); // Asegúrate de tener este archivo
const setupRelationships = require('./database/relationships');

const PORT = process.env.APP_PORT || 3001;

const app = express();
const apiVersion = '/api/v1' 

// Configurar relaciones entre modelos
setupRelationships();

// Sincronizar modelos con la base de datos
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida');
    
    // Sincronizar modelos (crear tablas si no existen)
    await sequelize.sync({ 
      force: true, // ¡NO usar true en producción! (sobreescribe tablas)
      alter: process.env.NODE_ENV === 'development' // Actualiza esquemas en desarrollo
    });
    
    console.log('Modelos sincronizados con la base de datos');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    process.exit(1); // Detener la aplicación si hay error
  }
};


// Routes
app.use(`${apiVersion}/auth`, authController);
app.use('*', (req, res, next) => {
    res.status(404).json({
        status: 'fallido',
        message: 'ruta no encontrada'
    })
});

// Iniciar servidor
app.listen(PORT, async () => {
  await initializeDatabase();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});