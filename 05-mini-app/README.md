# 🔍 GitHub Finder Mini-App

Una aplicación moderna y rápida para explorar perfiles de GitHub, construida con React y Vite.

## 🚀 ¿Qué se hizo?

Se desarrolló una herramienta de búsqueda de usuarios de GitHub que proporciona una visión detallada de cualquier perfil público. Las características principales incluyen:

- **Búsqueda Instantánea**: Encuentra cualquier usuario de GitHub por su username.
- **Perfil Detallado**: Visualización de avatar, bio, seguidores, seguidos y ubicación.
- **Integración de README**: Si el usuario tiene un repositorio de perfil (el repositorio especial con el mismo nombre que el usuario), la aplicación extrae y renderiza el contenido del `README.md`.
- **Repositorios Recientes**: Listado de los últimos 6 repositorios actualizados del usuario.
- **Historial de Búsqueda**: Los usuarios buscados recientemente se guardan localmente para un acceso rápido.
- **Estados de Carga Progresivos**: Implementación de skeletons (esqueletos de carga) para una mejor experiencia de usuario (UX).
- **Manejo de Errores**: Feedback visual para usuarios no encontrados o límites de la API de GitHub excedidos.

## 🛠️ ¿Cómo se hizo?

La aplicación se construyó siguiendo las mejores prácticas de React moderno:

### Arquitectura y Tech Stack
- **React 18**: Librería principal para la interfaz.
- **Vite**: Herramienta de construcción para una experiencia de desarrollo ultrarrápida.
- **CSS Vanilla (Custom Properties)**: Sistema de diseño personalizado con variables CSS para mantener la consistencia en colores, espaciados y efectos de glassmorphism.

### Lógica y Estado
- **Custom Hook (`useGithubSearch`)**: Se centralizó toda la lógica de negocio en un hook personalizado. Este hook gestiona:
  - Llamadas asíncronas a la API de GitHub usando `fetch`.
  - Estados de carga, error y datos del usuario.
  - Sincronización con `localStorage` para persistir el historial de búsqueda.
- **GitHub API**: Se utilizaron múltiples endpoints de la API REST de GitHub:
  - `GET /users/{username}` para datos básicos.
  - `GET /repos/{owner}/{repo}/readme` para el contenido del README.
  - `GET /users/{username}/repos` para el listado de proyectos.

### Componentización
- **`SearchBar`**: Componente de entrada controlado con debounce y feedback visual de carga.
- **`UserCard`**: Componente principal que utiliza un sistema de pestañas para alternar entre la información de "Acerca de" (README) y los "Repositorios".
- **`SearchHistory`**: Componente lateral/inferior que permite re-visitar búsquedas previas con un solo clic.

## 📦 Instalación y Ejecución

1. Entra en la carpeta del proyecto:
   ```bash
   cd 05-mini-app
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre tu navegador en `http://localhost:5173`
