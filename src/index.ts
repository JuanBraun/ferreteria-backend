

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productoRoutes from './routes/productoRoutes';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API Ferretería Backend activa');
});

// Registrar las rutas
app.use('/api/productos', productoRoutes);

// Middleware global de manejo de errores
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
