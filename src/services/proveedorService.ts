import { Proveedor } from "../models/proveedor";
import proveedorRepository from "../repositories/ProveedorRepository";
import AppError from "../utils/appError";
import { QueryOptions } from "../utils/pagination";

class ProveedorService {
  async listar(query: QueryOptions) {
    return await proveedorRepository.obtenerTodos(query);
  }

  async obtenerPorId(id: number): Promise<Proveedor> {
    const proveedor = await proveedorRepository.obtenerPorId(id);

    if (!proveedor) {
      throw new AppError("Proveedor no encontrado", 404);
    }

    return proveedor;
  }

  async crear(datos: Omit<Proveedor, "id">): Promise<Proveedor> {
    this.validarDatosCreacion(datos);

    const proveedores = await proveedorRepository.obtenerTodosSinPaginar();

    const nombreExiste = proveedores.some(
      (proveedor) =>
        proveedor.nombre.toLowerCase() === datos.nombre.trim().toLowerCase(),
    );

    if (nombreExiste) {
      throw new AppError("Ya existe un proveedor con ese nombre", 400);
    }

    const nuevoProveedor: Proveedor = {
      id: Date.now(),
      nombre: datos.nombre.trim(),
      contacto: datos.contacto?.trim(),
      telefono: datos.telefono?.trim(),
      email: datos.email?.trim(),
      direccion: datos.direccion?.trim(),
    };

    return await proveedorRepository.crear(nuevoProveedor);
  }

  async actualizar(
    id: number,
    datos: Partial<Omit<Proveedor, "id">>,
  ): Promise<Proveedor> {
    const proveedorExistente = await proveedorRepository.obtenerPorId(id);

    if (!proveedorExistente) {
      throw new AppError("Proveedor no encontrado", 404);
    }

    this.validarDatosActualizacion(datos);

    if (datos.nombre !== undefined) {
      const proveedores = await proveedorRepository.obtenerTodosSinPaginar();

      const nombreExiste = proveedores.some(
        (proveedor) =>
          proveedor.nombre.toLowerCase() ===
            datos.nombre!.trim().toLowerCase() && proveedor.id !== id,
      );

      if (nombreExiste) {
        throw new AppError("Ya existe otro proveedor con ese nombre", 400);
      }
    }

    const datosLimpios: Partial<Proveedor> = {};
    if (datos.nombre !== undefined) datosLimpios.nombre = datos.nombre.trim();
    if (datos.contacto !== undefined)
      datosLimpios.contacto = datos.contacto.trim();
    if (datos.telefono !== undefined)
      datosLimpios.telefono = datos.telefono.trim();
    if (datos.email !== undefined) datosLimpios.email = datos.email.trim();
    if (datos.direccion !== undefined)
      datosLimpios.direccion = datos.direccion.trim();

    const actualizado = await proveedorRepository.actualizar(id, datosLimpios);

    if (!actualizado) {
      throw new AppError("Proveedor no encontrado", 404);
    }

    return actualizado;
  }

  async eliminar(id: number): Promise<void> {
    const eliminado = await proveedorRepository.eliminar(id);

    if (!eliminado) {
      throw new AppError("Proveedor no encontrado", 404);
    }
  }

  private validarDatosCreacion(datos: Omit<Proveedor, "id">): void {
    if (!datos.nombre?.trim()) {
      throw new AppError("El nombre del proveedor es obligatorio", 400);
    }

    this.validarCamposOpcionales(datos);
  }

  private validarDatosActualizacion(
    datos: Partial<Omit<Proveedor, "id">>,
  ): void {
    if (datos.nombre !== undefined && !datos.nombre.trim()) {
      throw new AppError("El nombre del proveedor no puede estar vacío", 400);
    }

    this.validarCamposOpcionales(datos);
  }

  private validarCamposOpcionales(datos: Partial<Omit<Proveedor, "id">>): void {
    const camposTexto = [
      datos.nombre,
      datos.contacto,
      datos.telefono,
      datos.email,
      datos.direccion,
    ];

    if (
      camposTexto.some(
        (campo) => campo !== undefined && typeof campo !== "string",
      )
    ) {
      throw new AppError("Los datos del proveedor deben ser textos", 400);
    }

    if (datos.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email.trim())) {
      throw new AppError("El formato del email no es válido", 400);
    }
  }
}

export default new ProveedorService();
