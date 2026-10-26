
export interface Producto {
    id: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    precio: number;
    stockActual: number;
    stockMinimo: number;
    categoria: string;
}
