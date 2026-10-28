export const validarStockInicial = (datos: any) => {
    const actual = Number(datos.stock_actual);
    const minimo = Number(datos.stock_minimo);
    const maximo = Number(datos.stock_maximo || datos.stock_max);

    if (actual < 0) {
        const error: any = new Error('El stock inicial no puede ser un valor negativo');
        error.status = 400;
        throw error;
    }
    if (minimo >= maximo) {
        const error: any = new Error('El stock mínimo no puede ser mayor o igual al stock máximo');
        error.status = 400;
        throw error;
    }
    if (actual > maximo) {
        const error: any = new Error('El stock inicial no puede superar el límite del stock máximo configurado');
        error.status = 400;
        throw error;
    }
};