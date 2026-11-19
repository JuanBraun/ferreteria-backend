export type RolUsuario = 'Administrador' | 'Empleado' | 'Encargado';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: RolUsuario;
  activo: boolean;
}