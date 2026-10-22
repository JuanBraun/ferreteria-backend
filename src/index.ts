import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { conectarDB } from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API Ferretería Backend activa');
});

// Iniciar servidor y conectar a la base de datos
const iniciarServidor = async () => {
    await conectarDB();
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
};

iniciarServidor();