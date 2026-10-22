import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DB_NAME = process.env.DB_NAME || 'ferreteria_db';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_HOST = process.env.DB_HOST || 'localhost';

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false, // Cambiá a true si querés ver las consultas SQL en la consola
});

export const conectarDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('¡Conexión a la base de datos MySQL establecida con éxito!');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
};