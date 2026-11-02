const defaultRepository = require("../repositorios/productoRepository");
const stockValidator = require("./stockValidator");
const stockAlertObserver = require("./observers/stockAlertObserver");
const ubicacionService = require("./ubicacionService");

class ProductoService {
    constructor(repository = defaultRepository) {
        this.repository = repository;
        this.observers = [];
        this.suscribirObserver(stockAlertObserver);
    }

    suscribirObserver(observer) {
        this.observers.push(observer);
    }

    notificarObservers(producto) {
        this.observers.forEach((obs) => obs.notificar(producto));
    }

    async listarProductos() {
        return await this.repository.obtenerTodos();
    }

    async obtenerProducto(id) {
        const producto = await this.repository.obtenerPorId(id);
        if (!producto) {
            const error = new Error("Producto no encontrado");
            error.status = 404;
            throw error;
        }
        return producto;
    }

    async crearProducto(datosProducto) {
        console.log("JSON CRUDO RECIBIDO EN SERVICIO:", JSON.stringify(datosProducto, null, 2));
        let ubicacionId = datosProducto.ubicacion_id || null;

        if (datosProducto.pasillo && datosProducto.estante && datosProducto.nivel) {
            try {
                const nuevaUbicacion = await ubicacionService.crearUbicacion({
                    pasillo: datosProducto.pasillo,
                    estante: datosProducto.estante,
                    nivel: datosProducto.nivel,
                    descripcion: datosProducto.descripcion_ubicacion || ""
                });
                console.log(" Ubicación creada exitosamente:", nuevaUbicacion);
                ubicacionId = nuevaUbicacion.id;
            } catch (err) {
                console.error(" Error interno al crear la ubicación:", err.message);
                throw err;
            }
        } else {
            console.log(" No entró al IF de ubicación. Los valores recibidos fueron:", {
                pasillo: datosProducto.pasillo,
                estante: datosProducto.estante,
                nivel: datosProducto.nivel
            });
        }

        const productoNormalizado = {
            ...datosProducto,
            stock_max: datosProducto.stock_maximo || datosProducto.stock_max,
            ubicacion_id: ubicacionId
        };

        stockValidator.validarStockInicial(productoNormalizado);
        const nuevoProducto = await this.repository.crear(productoNormalizado);
        this.notificarObservers(nuevoProducto);
        return nuevoProducto;
    }

    async actualizarProducto(id, datosProducto) {
        await this.obtenerProducto(id);

        let ubicacionId = datosProducto.ubicacion_id || null;
        if (datosProducto.pasillo && datosProducto.estante && datosProducto.nivel) {
            const nuevaUbicacion = await ubicacionService.crearUbicacion({
                pasillo: datosProducto.pasillo,
                estante: datosProducto.estante,
                nivel: datosProducto.nivel,
                descripcion: datosProducto.descripcion_ubicacion || ""
            });
            ubicacionId = nuevaUbicacion.id;
        }

        const productoNormalizado = {
            ...datosProducto,
            stock_max: datosProducto.stock_maximo || datosProducto.stock_max,
            ubicacion_id: ubicacionId
        };

        stockValidator.validarStockInicial(productoNormalizado);
        const productoActualizado = await this.repository.actualizar(id, productoNormalizado);
        this.notificarObservers(productoActualizado);
        return productoActualizado;
    }

    async eliminarProducto(id) {
        await this.obtenerProducto(id);
        return await this.repository.eliminar(id);
    }
}

module.exports = new ProductoService();