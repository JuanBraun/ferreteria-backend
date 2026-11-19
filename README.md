# Ferretería - Backend

Backend de una aplicación de gestión de inventario para una ferretería, desarrollado como parte del Trabajo Final Integrador de la Tecnicatura Universitaria en Programación de la UTN.

El sistema permite administrar productos mediante una API REST, ofreciendo operaciones CRUD, búsqueda, filtros, ordenamiento y paginación.

## Tecnologías utilizadas

- **Node.js** – Entorno de ejecución.
- **TypeScript** – Lenguaje de programación.
- **Express** – Framework para desarrollar la API REST.
- **CORS** – Middleware para permitir solicitudes desde otros orígenes.
- **dotenv** – Gestión de variables de entorno.

## Funcionalidades

Actualmente, la API permite:

- Listar todos los productos.
- Consultar un producto por su ID.
- Crear nuevos productos.
- Actualizar productos existentes.
- Eliminar productos.
- Buscar productos por nombre y código.
- Filtrar productos por categoría.
- Ordenar los resultados por distintos campos.
- Paginar los resultados.
- Validar los datos recibidos y evitar códigos de producto duplicados.

## Estructura del proyecto

```text
ferreteria-backend/
│
├── src/
│   ├── controllers/
│   │   └── productoController.ts
│   │
│   ├── models/
│   │   └── producto.ts
│   │
│   ├── repositories/
│   │   └── ProductoRepository.ts
│   │
│   ├── routes/
│   │   └── productoRoutes.ts
│   │
│   ├── services/
│   │   └── productoService.ts
│   │
│   └── index.ts
│
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Instalación y ejecución

### Requisitos previos

- Node.js
- npm

### 1. Clonar el repositorio

```bash
git clone https://github.com/JuanBraun/ferreteria-backend.git
```

### 2. Ingresar al directorio

```bash
cd ferreteria-backend
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

El servidor se iniciará con reinicio automático al detectar cambios en el código fuente.

### 5. Compilar el proyecto

```bash
npm run build
```

Este comando compila los archivos TypeScript y genera la carpeta `dist/`.

### 6. Ejecutar la versión compilada

```bash
npm start
```

Por defecto, el servidor se inicia en:

```text
http://localhost:3000
```

La ruta principal permite comprobar que la API está activa:

```text
GET http://localhost:3000/
```

## Endpoints disponibles

La API utiliza la siguiente ruta base:

```text
/api/productos
```

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/productos` | Listar productos |
| GET | `/api/productos/:id` | Obtener un producto por ID |
| POST | `/api/productos` | Crear un producto |
| PUT | `/api/productos/:id` | Actualizar un producto |
| DELETE | `/api/productos/:id` | Eliminar un producto |

### Listado, búsqueda y paginación

El endpoint de listado permite utilizar parámetros de consulta:

| Parámetro | Descripción |
|---|---|
| `page` | Número de página |
| `limit` | Cantidad de productos por página |
| `sortBy` | Campo por el cual ordenar |
| `order` | Orden ascendente (`asc`) o descendente (`desc`) |
| `nombre` | Buscar por nombre |
| `codigo` | Buscar por código |
| `categoria` | Filtrar por categoría |

Ejemplo:

```text
GET /api/productos?page=1&limit=10&sortBy=nombre&order=asc&categoria=Herramientas
```

La respuesta incluye los productos encontrados y los datos de paginación:

```json
{
  "productos": [],
  "total": 0,
  "pagina": 1,
  "limite": 10,
  "totalPaginas": 0
}
```

### Ejemplo de creación de producto

```json
{
  "codigo": "TAL-001",
  "nombre": "Taladro eléctrico",
  "descripcion": "Taladro eléctrico de 750W",
  "precio": 45000,
  "stockActual": 15,
  "stockMinimo": 5,
  "categoria": "Herramientas"
}
```

## Arquitectura

El backend está organizado siguiendo una separación de responsabilidades:

- **Routes:** definen los endpoints y dirigen las solicitudes.
- **Controllers:** reciben las solicitudes HTTP y construyen las respuestas.
- **Services:** contienen las reglas de negocio y las validaciones.
- **Repositories:** gestionan el acceso y la manipulación de los datos.
- **Models:** definen la estructura de las entidades del sistema.

Esta organización facilita el mantenimiento y permite reemplazar la implementación del almacenamiento sin modificar la lógica de negocio ni los controladores.

## Almacenamiento de datos

Actualmente, los productos se almacenan temporalmente en memoria mediante un repositorio simulado.

Esto permite probar las operaciones de la API sin depender de una base de datos durante la etapa de desarrollo del prototipo.

**Importante:** los datos se reinician cuando se detiene o reinicia el servidor. La persistencia mediante una base de datos se incorporará en una etapa posterior del proyecto.