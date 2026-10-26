
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productoRepository from './repositories/ProductoRepository';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API Ferretería Backend activa');
});

// Listar productos
app.get('/api/productos', async (req, res) => {
    const productos = await productoRepository.obtenerTodos();
    res.json(productos);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
