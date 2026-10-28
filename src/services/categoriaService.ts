import * as categoriaRepository from "../repositories/categoriaRepository";

export const listarCategorias = async () => {
    return await categoriaRepository.obtenerTodas();
};

export const crearCategoria = async (datos: any) => {
    if (!datos.nombre || datos.nombre.trim() === "") {
        const error: any = new Error("El nombre de la categoría es obligatorio");
        error.status = 400;
        throw error;
    }
    return await categoriaRepository.crear(datos);
};