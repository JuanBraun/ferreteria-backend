import { Usuario } from '../models/usuario';

class AuthRepository {
  private usuarios: Usuario[] = [
    {
      id: 1,
      nombre: 'Santiago',
      apellido: 'Vidal',
      email: 'vidalsantiago@gmail.com',
      password: '993810',
      rol: 'Administrador',
      activo: true,
    },
    {
      id: 2,
      nombre: 'Juan',
      apellido: 'Braun',
      email: 'jbraun@gmail.com',
      password: '739920',
      rol: 'Empleado',
      activo: true,
    },
    {
      id: 3,
      nombre: 'Franco',
      apellido: 'Wilberger',
      email: 'fwilberger@hotmail.com',
      password: '633015',
      rol: 'Encargado',
      activo: true,
    },
  ];

  async buscarPorEmail(email: string): Promise<Usuario | undefined> {
    return this.usuarios.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  async crear(nuevoUsuario: Usuario): Promise<Usuario> {
    this.usuarios.push(nuevoUsuario);
    return nuevoUsuario;
  }
}

export default new AuthRepository();