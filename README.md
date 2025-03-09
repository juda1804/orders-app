
## Guía de Desarrollo

### Requisitos Previos
- Node.js v18.17.1 o superior
- npm o yarn
- Docker (opcional)

### Instalación
1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Iniciar en desarrollo: `npm start`
4. Construir para producción: `npm run build`

### Convenciones de Código
- TypeScript strict mode
- Componentes funcionales con hooks
- Material-UI para estilos
- Nombres de archivos en PascalCase para componentes
- Nombres de archivos en kebab-case para utilidades

### Testing
- Jest para pruebas unitarias
- React Testing Library para pruebas de componentes
- Ejecutar tests: `npm test`

## API Endpoints

### Pedidos
- GET `/order` - Lista de pedidos
- GET `/order/:guia` - Detalle de pedido
- POST `/order/:guia` - Actualizar pedido

### Estados
- GET `/status` - Obtener configuración de estados
- POST `/status` - Guardar configuración de estados

## Consideraciones de Seguridad
- Autenticación basada en localStorage
- Rutas protegidas
- Validación de entrada en formularios
- Sanitización de datos

## Mantenimiento
- Logs de errores en consola
- Manejo de estados de carga
- Feedback visual para acciones del usuario
- Mensajes de error amigables

## Roadmap Futuro
- Integración con más proveedores de dropshipping
- Sistema de roles y permisos
- Dashboard analytics avanzado
- Exportación de reportes
- Integración con sistemas de notificaciones

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
