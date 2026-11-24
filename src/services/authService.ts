import authRepository from '../repositories/AuthRepository';
import { Usuario, RolUsuario } from '../models/usuario';
import AppError from '../utils/appError';

class AuthService {
  async login(email: string, password: string) {
    if (!email || !password) {
      throw new AppError('Debe ingresar email y contraseña', 400);
    }

    const usuario = await authRepository.buscarPorEmail(email);

    if (!usuario || usuario.password !== password) {
      throw new AppError('Credenciales inválidas', 401);
    }

    if (!usuario.activo) {
      throw new AppError('El usuario se encuentra inactivo', 403);
    }

    const { password: _, ...usuarioSinPassword } = usuario;

    return {
      usuario: usuarioSinPassword,
      token: `mock-jwt-token-${usuario.id}-${Date.now()}`,
    };
  }

  async register(datos: {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    rol?: RolUsuario;
  }) {
    const { nombre, apellido, email, password, rol } = datos;

    if (!nombre || !apellido || !email || !password) {
      throw new AppError('Todos los campos son obligatorios', 400);
    }

    const existe = await authRepository.buscarPorEmail(email);
    if (existe) {
      throw new AppError('El email ya se encuentra registrado', 400);
    }

    const nuevoUsuario: Usuario = {
      id: Date.now(),
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      email: email.trim().toLowerCase(),
      password,
      rol: rol || 'Empleado',
      activo: true,
    };

    const creado = await authRepository.crear(nuevoUsuario);
    const { password: _, ...usuarioSinPassword } = creado;

    return {
      usuario: usuarioSinPassword,
      token: `mock-jwt-token-${creado.id}-${Date.now()}`,
    };
  }

  async recoverPassword(email: string) {
    if (!email) {
      throw new AppError('Debe ingresar un email', 400);
    }

    const usuario = await authRepository.buscarPorEmail(email);
    if (!usuario) {
      throw new AppError('No existe una cuenta asociada a ese email', 404);
    }

    return {
      email: usuario.email,
      instrucciones: 'Se envió un enlace simulado de recuperación al correo electrónico.',
    };
  }
}

export default new AuthService();