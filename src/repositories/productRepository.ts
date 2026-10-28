// Datos en memoria (Mock)
let productosMock: any[] = [
  {
            id: 1,
            codigo: 'TOR-001',
            nombre: 'Tornillo Phillips',
            descripcion: 'Tornillo para madera',
            precio: 150,
            stockActual: 100,
            stockMinimo: 20,
            categoria: 'Tornillería'
        },
        {
            id: 2,
            codigo: 'MAR-001',
            nombre: 'Martillo',
            descripcion: 'Martillo de acero con mango',
            precio: 8500,
            stockActual: 8,
            stockMinimo: 10,
            categoria: 'Herramientas'
        }
];

export const obtenerTodos = async (query: any = {}) => {
  let resultado = [...productosMock];

  // 1. Búsqueda/Filtro
  if (query.nombre) {
    resultado = resultado.filter(p => 
      p.nombre.toLowerCase().includes(query.nombre.toLowerCase())
    );
  }

  // 2. Ordenamiento (Ej: ?sortBy=precio_venta&order=desc)
  if (query.sortBy) {
    const order = query.order === 'desc' ? -1 : 1;
    resultado.sort((a, b) => {
      if (a[query.sortBy] < b[query.sortBy]) return -1 * order;
      if (a[query.sortBy] > b[query.sortBy]) return 1 * order;
      return 0;
    });
  }

  // 3. Paginación y límite (Ej: ?page=1&limit=10)
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginados = resultado.slice(startIndex, endIndex);

  return {
    total: resultado.length,
    paginaActual: page,
    totalPaginas: Math.ceil(resultado.length / limit),
    registros: paginados
  };
};

export const obtenerPorId = async (id: string | number) => {
  return productosMock.find(p => String(p.id) === String(id)) || null;
};

export const crear = async (producto: any) => {
  const nuevoId = productosMock.length > 0 
    ? Math.max(...productosMock.map(p => p.id)) + 1 
    : 1;
    
  const nuevoProducto = {
    id: nuevoId,
    creado_en: new Date().toISOString(),
    ...producto
  };
  
  productosMock.push(nuevoProducto);
  return nuevoProducto;
};

export const actualizar = async (id: string | number, producto: any) => {
  const index = productosMock.findIndex(p => String(p.id) === String(id));
  if (index !== -1) {
    productosMock[index] = { ...productosMock[index], ...producto };
    return productosMock[index];
  }
  return null;
};

export const eliminar = async (id: string | number) => {
  const index = productosMock.findIndex(p => String(p.id) === String(id));
  if (index !== -1) {
    productosMock.splice(index, 1);
    return true;
  }
  return false;
};