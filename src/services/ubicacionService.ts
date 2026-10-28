import * as ubicacionRepository from "../repositories/ubicacionRepository";

export const listarUbicaciones = async () => {
    return await ubicacionRepository.obtenerTodas();
};

export const crearUbicacion = async (datos: any) => {
    if (!datos.pasillo || !datos.estante || !datos.nivel) {
        const error: any = new Error("Los campos pasillo, estante y nivel son obligatorios");
        error.status = 400;
        throw error;
    }
    const resultado = await ubicacionRepository.crear(datos);
    return {
        id: resultado.insertId || resultado.id || Math.floor(Math.random() * 1000), // Simulación ID mock
        ...datos
    };
};