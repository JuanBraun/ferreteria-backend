
import { Movimiento } from '../models/movimiento';
import { paginateAndFilter, QueryOptions, PaginatedResult } from '../utils/pagination';

class MovimientoRepository {
    private movimientos: Movimiento[] = [
    { id: 1, productoId: 1, tipo: 'entrada', cantidad: 50, fecha: new Date('2026-11-01'), motivo: 'Reposición inicial' },
    { id: 2, productoId: 2, tipo: 'salida', cantidad: 2, fecha: new Date('2026-11-05'), motivo: 'Venta mostrador' },
  ];

  async obtenerTodos(query: QueryOptions & { tipo?: string }): Promise<PaginatedResult<Movimiento>> {
  let lista = this.movimientos;
  if (query.tipo) {
    lista = lista.filter((m) => m.tipo === query.tipo);
  }
  return paginateAndFilter(lista, query, ['motivo', 'tipo']);
}
  async obtenerPorId(id: number): Promise<Movimiento | undefined> {
    return this.movimientos.find((m) => m.id === id);
  }

  async obtenerPorProducto(productoId: number): Promise<Movimiento[]> {
    return this.movimientos.filter((m) => m.productoId === productoId);
  }

  async crear(movimiento: Movimiento): Promise<Movimiento> {
  const nextId = this.movimientos.length > 0
    ? Math.max(...this.movimientos.map((m) => m.id)) + 1
    : 1;
  const nuevo = { ...movimiento, id: nextId };
  this.movimientos.push(nuevo);
  return nuevo;
}

  async actualizar(id: number, datos: Partial<Movimiento>): Promise<Movimiento | undefined> {
    const index = this.movimientos.findIndex((m) => m.id === id);
    if (index === -1) return undefined;
    this.movimientos[index] = { ...this.movimientos[index], ...datos };
    return this.movimientos[index];
  }

  async eliminar(id: number): Promise<boolean> {
    const index = this.movimientos.findIndex((m) => m.id === id);
    if (index === -1) return false;
    this.movimientos.splice(index, 1);
    return true;
  }
}

export default new MovimientoRepository();
