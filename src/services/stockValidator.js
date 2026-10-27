
class StockValidator {
    static validarStockInicial({ stock_actual, stock_minimo, stock_maximo }) {
        const actual = Number(stock_actual);
        const minimo = Number(stock_minimo);
        const maximo = Number(stock_maximo);

        if (actual < 0) {
            const error = new Error('El stock inicial no puede ser un valor negativo');
            error.status = 400;
            throw error;
        }

        if (minimo >= maximo) {
            const error = new Error('El stock mínimo no puede ser mayor o igual al stock máximo');
            error.status = 400;
            throw error;
        }

        if (actual > maximo) {
            const error = new Error('El stock inicial no puede superar el límite del stock máximo configurado');
            error.status = 400;
            throw error;
        }
    }
}

module.exports = StockValidator;