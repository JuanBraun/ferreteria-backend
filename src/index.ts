import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';

import categoriaRutas from './routes/categoriaRutas';
import movimientoRutas from './routes/movimientoRutas';
import productoRutas from './routes/productoRoutes';
import ubicacionRutas from './routes/ubicacionRutas';
import errorHandler from './middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Endpoints de la API
app.use('/api/v1/categorias', categoriaRutas);
app.use('/api/v1/movimientos', movimientoRutas);
app.use('/api/v1/productos', productoRutas);
app.use('/api/v1/ubicaciones', ubicacionRutas);

// Manejo de rutas no encontradas (404)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    msg: "Ruta no encontrada",
    code: 404,
    data: null
  });
});

// Middleware global para captura de errores
app.use(errorHandler);

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor de la Ferretería corriendo en el puerto ${PORT}`);
});
