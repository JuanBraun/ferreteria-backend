import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productoRoutes from './routes/productoRoutes';
import categoriaRoutes from './routes/categoriaRoutes';
import proveedorRoutes from './routes/proveedorRoutes';
import inventarioRoutes from './routes/inventarioRoutes';
import errorHandler from './middlewares/errorHandler';
import movimientoRoutes from './routes/movimientoRoutes';
import authRoutes from './routes/authRoutes';

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
app.use('/api/v1/productos', productoRoutes);
app.use('/api/v1/categorias', categoriaRoutes);
app.use('/api/v1/proveedores', proveedorRoutes);
app.use('/api/v1/inventario', inventarioRoutes);
app.use('/api/v1/movimientos', movimientoRoutes);
app.use('/api/v1/auth', authRoutes);

// Middleware global de manejo de errores
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});