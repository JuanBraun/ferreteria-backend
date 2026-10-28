// Datos en memoria (Mock)
let categoriasMock: any[] = [
  { id: 1, nombre: "Herramientas Manuales", descripcion: "Martillos, destornilladores, pinzas" },
  { id: 2, nombre: "Fijaciones", descripcion: "Tornillos, clavos, tuercas" }
];

export const obtenerTodas = async () => {
  return categoriasMock;
};

export const crear = async (datos: any) => {
  const nuevaCategoria = { id: categoriasMock.length + 1, ...datos };
  categoriasMock.push(nuevaCategoria);
  return nuevaCategoria;
};