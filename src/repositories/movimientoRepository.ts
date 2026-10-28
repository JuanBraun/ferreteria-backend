// Datos en memoria (Mock)
let movimientosMock: any[] = [];

export const registrar = async (datos: any) => {
  const nuevoMovimiento = { 
    id: movimientosMock.length + 1, 
    fecha: new Date().toISOString(),
    ...datos 
  };
  movimientosMock.push(nuevoMovimiento);
  return nuevoMovimiento;
};

export const obtenerPorProductoId = async (producto_id: string | number) => {
  return movimientosMock
    .filter(m => String(m.producto_id) === String(producto_id))
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
};