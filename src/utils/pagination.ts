// Este utilitario recibe cualquier array de datos mockeados, 
// los query params de Express (page, limit, sortBy, order, search) y 
// la lista de campos sobre los cuales querés buscar:

export interface QueryOptions {
  page?: string;
  limit?: string;
  sortBy?: string;
  order?: string;
  search?: string;
}

export interface PaginatedResult<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export function paginateAndFilter<T extends Record<string, any>>(
  data: T[],
  query: QueryOptions,
  searchableFields: (keyof T)[] = []
): PaginatedResult<T> {
  let result = [...data];

  // 1. Búsqueda por texto en los campos relevantes
  if (query.search && query.search.trim() !== '' && searchableFields.length > 0) {
    const term = query.search.toLowerCase().trim();
    result = result.filter((item) =>
      searchableFields.some((field) => {
        const value = item[field];
        return value !== undefined && value !== null && String(value).toLowerCase().includes(term);
      })
    );
  }

  // 2. Ordenamiento (sortBy y order)
  const sortBy = query.sortBy || 'id';
  const order = query.order?.toLowerCase() === 'desc' ? -1 : 1;

  result.sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];

    if (valA === undefined || valB === undefined) return 0;
    if (typeof valA === 'number' && typeof valB === 'number') {
      return (valA - valB) * order;
    }
    return String(valA).localeCompare(String(valB)) * order;
  });

  // 3. Paginado (page y limit)
  const total = result.length;
  const page = Math.max(1, parseInt(query.page || '1', 10) || 1);
  const limit = Math.max(1, parseInt(query.limit || '10', 10) || 10);
  const totalPages = Math.ceil(total / limit) || 1;

  const startIndex = (page - 1) * limit;
  const items = result.slice(startIndex, startIndex + limit);

  return {
    items,
    meta: {
      total,
      page,
      limit,
      totalPages,
    },
  };
}