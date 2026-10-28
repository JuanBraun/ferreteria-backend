export const notificarAlertaStock = (producto: any) => {
    if (Number(producto.stock_actual) <= Number(producto.stock_minimo)) {
        console.warn(
            `[ALERTA DE REORDEN] Producto "${producto.nombre}" (ID: ${producto.id || 'Nuevo'}) ` +
            `alcanzó nivel crítico. Stock actual: ${producto.stock_actual} | Mínimo: ${producto.stock_minimo}`
        );
    }
};