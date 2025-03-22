require('dotenv').config(); // Carga variables desde .env

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});