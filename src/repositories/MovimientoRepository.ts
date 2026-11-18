
import { Movimiento } from '../models/movimiento';

class MovimientoRepository {
    private movimientos: Movimiento[] = [];

    async obtenerTodos(): Promise<Movimiento[]> {
        return this.movimientos;
    }

    async obtenerPorId(id: number): Promise<Movimiento | undefined> {
        return this.movimientos.find(movimiento => movimiento.id === id);
    }

    async obtenerPorProducto(productoId: number): Promise<Movimiento[]> {
        return this.movimientos.filter(
            movimiento => movimiento.productoId === productoId
        );
    }

    async crear(movimiento: Movimiento): Promise<Movimiento> {
        this.movimientos.push(movimiento);
        return movimiento;
    }
}

export default new MovimientoRepository();
