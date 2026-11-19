
export interface Movimiento {
    id: number;
    productoId: number;
    tipo: 'entrada' | 'salida';
    cantidad: number;
    fecha: Date;
    observacion?: string;
}
