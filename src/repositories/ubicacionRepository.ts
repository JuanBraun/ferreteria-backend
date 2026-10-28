// Datos en memoria (Mock)
let ubicacionesMock: any[] = [
  { id: 1, pasillo: "A", estante: "1", nivel: "Bajo", descripcion: "Sector principal" }
];

export const obtenerTodas = async () => {
  return ubicacionesMock;
};

export const crear = async (datos: any) => {
  const nuevaUbicacion = { id: ubicacionesMock.length + 1, ...datos };
  ubicacionesMock.push(nuevaUbicacion);
  return nuevaUbicacion;
};