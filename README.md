# Movimientos del Alma - Backend

## Descripción General
La aplicación "Movimientos del Alma" es una plataforma web diseñada para la gestión de cursos y alumnos. Permite a los administradores gestionar cursos y usuarios, y a los estudiantes inscribirse en cursos y acceder a los contenidos. La arquitectura del backend sigue un enfoque modular y está basada en componentes reutilizables para facilitar el desarrollo y mantenimiento.

## Componentes Principales

### Backend
- **Node.js**: 
  - **Descripción**: El servidor backend está construido con Node.js, proporcionando un entorno de ejecución para el código JavaScript en el servidor.
  - **Ventajas**: 
    - Alta escalabilidad y rendimiento.
    - Gran ecosistema de paquetes y módulos disponibles a través de npm.
    - Capacidad de manejar múltiples conexiones simultáneamente con un modelo de E/S no bloqueante.

- **Express**: 
  - **Descripción**: Framework utilizado para manejar las rutas y middleware del servidor, facilitando la creación de APIs RESTful.
  - **Ventajas**: 
    - Sencillez y flexibilidad en la creación de rutas y middleware.
    - Gran cantidad de middleware disponible para manejar diferentes necesidades (autenticación, validación, etc.).
    - Facilita la organización del código en controladores y rutas.

- **PostgreSQL**: 
  - **Descripción**: Base de datos relacional utilizada para almacenar la información de los cursos y alumnos, garantizando la integridad y consistencia de los datos.
  - **Ventajas**: 
    - Soporte para transacciones ACID, asegurando la integridad de los datos.
    - Escalabilidad y robustez para manejar grandes volúmenes de datos.

- **JWT**: 
  - **Descripción**: JSON Web Tokens se utilizan para la autenticación y autorización de usuarios.
  - **Ventajas**: 
    - Seguridad y facilidad de uso en aplicaciones web.
    - Permite la autenticación sin estado (stateless).

- **bcrypt**: 
  - **Descripción**: Biblioteca para el hashing de contraseñas.
  - **Ventajas**: 
    - Asegura que las contraseñas se almacenen de manera segura.
    - Protege contra ataques de fuerza bruta.

- **dotenv**: 
  - **Descripción**: Biblioteca para la gestión de variables de entorno.
  - **Ventajas**: 
    - Facilita la configuración y gestión de variables de entorno.
    - Permite mantener las credenciales y configuraciones sensibles fuera del código fuente.
    - Compatible con múltiples entornos (desarrollo, prueba, producción).

### Herramientas y Utilidades
- **Nodemon**: 
  - **Descripción**: Herramienta que reinicia automáticamente el servidor cuando se detectan cambios en el código fuente.
  - **Ventajas**: 
    - Acelera el desarrollo al eliminar la necesidad de reiniciar manualmente el servidor.
    - Fácil de configurar y utilizar.

- **ESLint**: 
  - **Descripción**: Herramienta de análisis estático de código para identificar y corregir problemas en el código JavaScript.
  - **Ventajas**: 
    - Mejora la calidad del código mediante la detección de errores y problemas de estilo.
    - Configurable para adaptarse a diferentes estilos de codificación.
    - Integración con editores de código y sistemas de CI/CD.

### Integración y Despliegue
- **Docker**: 
  - **Descripción**: Plataforma para desarrollar, enviar y ejecutar aplicaciones en contenedores.
  - **Ventajas**: 
    - Asegura la consistencia entre entornos de desarrollo, prueba y producción.
    - Facilita la escalabilidad y el despliegue de aplicaciones.
    - Amplio soporte y comunidad activa.

- **Jenkins**: 
  - **Descripción**: Herramienta de integración continua y entrega continua (CI/CD).
  - **Ventajas**: 
    - Automatiza el proceso de integración y despliegue.
    - Facilita la detección temprana de errores.
    - Mejora la eficiencia del desarrollo y despliegue de software.

## Estructura de Directorios

```
movimientos-del-alma-backend/
├── src/
│   ├── auth/
│   │   └── auth.js                # Módulo para la autenticación de usuarios
│   ├── controllers/
│   │   ├── authController.js      # Controlador para la autenticación
│   │   ├── courseController.js    # Controlador para la gestión de cursos
│   │   ├── enrollmentController.js# Controlador para la gestión de inscripciones
│   │   └── userController.js      # Controlador para la gestión de usuarios
│   ├── crud/
│   │   ├── crudCourses.js         # Operaciones CRUD para cursos
│   │   ├── crudEnrollments.js     # Operaciones CRUD para inscripciones
│   │   └── crudUsers.js           # Operaciones CRUD para usuarios
│   ├── db/
│   │   └── configPG.js            # Configuración de la base de datos PostgreSQL
│   ├── middleware/
│   │   └── authMiddleware.js      # Middleware para la autenticación
│   ├── routes/
│   │   ├── routesCourses.js       # Rutas para la gestión de cursos
│   │   ├── routesEnrollments.js   # Rutas para la gestión de inscripciones
│   │   └── routesUsers.js         # Rutas para la gestión de usuarios
│   ├── utils/
│   │   ├── utils.js               # Utilidades generales
│   │   └── utilsDBComands.sh      # Comandos de base de datos
│   └── app.js                     # Archivo principal de la aplicación
├── .env                           # Archivo de configuración de variables de entorno
├── package.json                   # Archivo de configuración de npm
└── README.md                      # Documentación del proyecto
```

## Instalación y Configuración

1. Clona el repositorio:
   ```
   git clone https://github.com/tu-usuario/movimientos-del-alma-backend.git
   cd movimientos-del-alma-backend
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Configura las variables de entorno:
Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables al archivo `.env`:

```
SECRET_KEY=tu_clave_secreta
PG_USER=tu_usuario_pg
PG_PASSWORD=tu_contraseña_pg
PG_DBNAME=tu_nombre_bd
HOST=tu_host
PORT=tu_puerto
SERVER_PORT=puerto_servidor
ORIGIN=tu_origen
```
## Ejecución

Para ejecutar el servidor en modo desarrollo:
```bash
npm run dev
```

Para ejecutar el servidor en modo producción:
```bash
npm start
```

## Pruebas

Para ejecutar las pruebas:
```bash
npm test
```

## API Endpoints

## Usuario

### Crear Usuario
- **URL**: `/users/createAdmin`
- **Método**: `Post`
- **Descripción**: crear nuevo usuario.
- **Cuerpo de la Solicitud**:
```json
{
  "id": 3,
  "email": "usuario@example.com",
  "password": "adminpassword"
}
```

### login Usuario
- **URL**: `/users/login`
- **Método**: `Post`
- **Descripción**: Loggear Admin.
- **Cuerpo de la Solicitud**:
  ```json
  {
     "email": "usuario@example.com",
     "password":"123456"
  }
  ```

### Cambiar Contraseña Usuario
- **URL**: `/users/changePassword`
- **Método**: `POST`
- **Descripción**: Cambiar Contraseña.
- **Cuerpo de la Solicitud**:
  ```json
  {
    "email": "usuario@example.com",
    "password": "contraseña_actual",
    "newPassword1": "nueva_contraseña",
    "newPassword2": "nueva_contraseña"
  }

  ```

### Borrar Usuario
- **URL**: `/users/deleteUser/:id`
- **Método**: `delete`
- **Descripción**: Borra Usuario segun id.


## Estudiantes

### Crear Estudiante
- **URL**: `/users/createCompleteStudent`
- **Método**: `POST`
- **Descripción**: Crea un nuevo estudiante.
- **Cuerpo de la Solicitud**:
  ```json
  {
    "identification_number": "123456",
    "name": "Nombre",
    "lastname": "lastname",
    "nationality": "nationality",
    "email": "usuario@example.com",
  }   
  ```
- **Respuesta Exitosa**:
  ```json
  {
    "succese": true,
    "message": "student and user created succesfully",
    "userId" : "id"
  }
  ```

### Obtener Estudiante por Identificacion
- **URL**: `/users/getStudentById`
- **Método**: `get`
- **headers**: require parametros de consulta, necesitas pasar un id
  ~~~  
  id=123456
  ~~~
  **Descripcion**: Obtienes informacion de alumno(id)
  **Respuesta Exitosa**
  ```json
  {
    "dni":"123456",
    "name": "Nombre",
    "lastname": "lastname",
    "email": "email@email.com",
    "nationality": "nationality",
    "identification_number":"123456"
  }

  ```
----

### Obtener todos los Estudiantes
- **URL**: `/users/getAllStudents`
- **Método**: `get`
  **Descripcion**: Obtienes informacion de todos los alumnos

### Obtener informacion de los cursos de cada alumno
- **URL**: `/users/getStudentsWithCourses`
- **Método**: `get`
  **Descripcion**: Obtienes informacion de todos los alumnos y los cursos que estos tengan

### Borrar Estudiante
- **URL**: `/users/deleteStudent/:id`
- **Método**: `delete`
  **Descripcion**: Borra alumnos , remplaza :id por el "id" del estudiante que deseas borrar.
----

## Profesor

### Crear Profesor 
- **URL**: `/users/createCompleteTeacher`
- **Método**: `POST`
- **Descripción**: Crea un nuevo Profesor.
- **Cuerpo de la Solicitud**:
  ```json
  {
    "identification_number": "123456",
    "name": "Nombre",
    "lastname": "lastname",
    "nationality": "nationality",
    "email": "usuario@example.com",
  }
  ```
- **Respuesta Exitosa**:
  ```json
  {
    "succese": true,
    "message": "Teacher and user created succesfully",
    "userId" : "id"
  }
  ```

### Obtener Profesor (///aun no esta implementado.)
  **URL**: `/users/getTeacher`
- **Método**: `get`
- **Descripción**: Obtener todos los profesores.

### Borrar Profesor
  **URL**: `/users/deleteTeacher/:id`
- **Método**: `delete`
- **Descripción**: Borra Profesor segun id. cambias :id por "id" profesor.

## Cursos

### Crear Curso
- **URL**: `/courses/createCourse`
- **Método**: `POST`
- **Descripción**: Crea un nuevo curso.
- **Cuerpo de la Solicitud**:
  ```json
  {
    "title": "Título del Curso",
    "description": "Descripción del Curso"
  }
  ```
- **Respuesta Exitosa**:
  ```json
  {
    "success": true,
    "message": "Course created successfully"
  }
  ```

### Eliminar Curso
- **URL**: `/courses/deleteCourse`
- **Método**: `POST`
- **Descripción**: Elimina Curso. En la pestaña body añade el id correspondiente al curso que se desea eliminar.

### Obtener Cursos
- **URL**: `/courses/getAllCourses`
- **Método**: `GET`
- **Descripción**: Obtiene una lista de todos los cursos.


### Obtener cursos de Estudiante 
- **URL**: `/courses/getCoursesById`
- **Método**: `GET`
**headers**: require parametros de consulta, necesitas pasar un id
  ~~~  
  id= w897ud
  ~~~
- **Descripción**: Obtiene una lista de todos los cursos que tiene el Estudiante.

### Obtener Cursos y sus modulos
- **URL**: `/courses/getAllCoursesWithModules`
- **Método**: `get`
- **Descripción**: Obtiene una lista con los cursos y sus modulos.

### Obtener Cursos, Modulos y Lecciones
- **URL**: `/courses/getAllCoursesWithModulesAndLessons`
- **Método**: `get`
- **Descripción**: Obtiene una lista con los cursos, modulos y lecciones.


## Modulos

### Crear Modulo
- **URL**: `/courses/createCourseModule`
- **Método**: `post`
- **Descripción**: Crear Modulo Nuevo. "course_id" debe coincidir con "id" del Curso.
- **Cuerpo de la Solicitud**:
  ```json
  {
    "course_id": 1,
    "module_number": 2,
    "name": "Modulo name",
    "description": "Modulo description"
  }
  ```

### Obtener todos los Modulos de los Estudiantes
- **URL**: `/courses/getModulesOfStudent`
- **Método**: `get`
- **Descripción**: Obtienes los modulos que posee el alumno. pasar parametros
- **Cuerpo de la Solicitud**:
  ```json
  {
    "student_id": 1,
    "course_id": 25351,
  }
  ```

### Obtener Modulos por cursos
- **URL**: `/courses/getModulesByCourseId/:id`
- **Método**: `get`
- **Descripción**: Obtienes los modulos de los Cursos. Añadir "Id" del curso correspondiente.

### Eliminar Modulo
- **URL**: `/courses/deleteModule/:id`
- **Método**: `delete`
- **Descripción**: Borra el Modulo segun "Id".

## Lecciones

### Crear Leccion
- **URL**: `/courses/createLesson`
- **Método**: `post`
- **Descripción**: Crear una Leccion Nueva.
- **Cuerpo de la Solicitud**:
  ```json
  {
    "module_id":1,
    "course_id": 1,
    "lesson_number": 2,
    "title": "lesson title",
    "description": "lesson description",
    "url": "http://example.com/lesson"
  }
  ```

### Obtener Lecciones
- **URL**: `/courses/getLessons`
- **Método**: `get`
- **Descripción**: Obtienes las Lecciones creadas.

### Obtener Lecciones por Curso y Modulo
- **URL**: `/courses/getLessonsByModuleIdAndCourseId`
- **Método**: `get`
- **Descripción**: Obtienes las Lecciones por Curso "Id" y Modulo "Id".
- **Cuerpo de la Solicitud**:
  ```json
  {
    "module_id":1,
    "course_id": 1,
  }
  ```


### Borrar Lecciones
- **URL**: `/courses/deleteLesson/:id`
- **Método**: `delete`
- **Descripción**: Borras leccion por "Id".





## Inscripciones

### Inscribir a un Curso
- **URL**: `/enrollments/registerToCourse`
- **Método**: `POST`
- **Descripción**: Inscribe a un estudiante en un curso.
- **Cuerpo de la Solicitud**:
  ```json
  {
    "identification_number": "214214",
    "courseId": 1,
    "modules_covered":2,
    "notes": " alguna nota"
  }
  ```

## Flujos de Datos

### 1. Autenticación y Autorización

El proceso de autenticación y autorización asegura que solo los usuarios autenticados puedan acceder a los recursos protegidos.

#### Diagrama de Flujo

```
+-------------------+       +-------------------+       +-------------------+
|                   |       |                   |       |                   |
|    Usuario        |       |  Servidor Backend |       |  Base de Datos    |
|                   |       |                   |       |                   |
+-------------------+       +-------------------+       +-------------------+
        |                           |                           |
        | 1. Enviar credenciales    |                           |
        |-------------------------->|                           |
        |                           |                           |
        |                           | 2. Validar credenciales   |
        |                           |-------------------------->|
        |                           |                           |
        |                           | 3. Generar token JWT      |
        |                           |<--------------------------|
        |                           |                           |
        | 4. Enviar token JWT       |                           |
        |<--------------------------|                           |
        |                           |                           |
        | 5. Usar token JWT para    |                           |
        |   solicitudes subsecuentes|                           |
        |-------------------------->|                           |
```

### 2. Gestión de Cursos

El proceso de gestión de cursos permite a los administradores crear, actualizar y eliminar cursos, y a los estudiantes inscribirse en cursos y acceder a los módulos y lecciones.

#### Diagrama de Flujo

```plaintext
+-------------------+       +-------------------+       +-------------------+
|                   |       |                   |       |                   |
|    Administrador  |       |  Servidor Backend |       |  Base de Datos    |
|                   |       |                   |       |                   |
+-------------------+       +-------------------+       +-------------------+
        |                           |                           |
        | 1. Crear/Actualizar/      |                           |
        |    Eliminar curso         |                           |
        |-------------------------->|                           |
        |                           | 2. Actualizar base de datos|
        |                           |-------------------------->|
        |                           |                           |
        |                           | 3. Confirmar operación    |
        |                           |<--------------------------|
        |                           |                           |
        | 4. Enviar confirmación    |                           |
        |<--------------------------|                           |
```

### 3. Gestión de Usuarios

El proceso de gestión de usuarios permite a los administradores crear, actualizar y eliminar usuarios, y a los usuarios actualizar su información personal y cambiar su contraseña.

#### Diagrama de Flujo

```plaintext
+-------------------+       +-------------------+       +-------------------+
|                   |       |                   |       |                   |
|    Administrador  |       |  Servidor Backend |       |  Base de Datos    |
|                   |       |                   |       |                   |
+-------------------+       +-------------------+       +-------------------+
        |                           |                           |
        | 1. Crear/Actualizar/      |                           |
        |    Eliminar usuario       |                           |
        |-------------------------->|                           |
        |                           | 2. Actualizar base de datos|
        |                           |-------------------------->|
        |                           |                           |
        |                           | 3. Confirmar operación    |
        |                           |<--------------------------|
        |                           |                           |
        | 4. Enviar confirmación    |                           |
        |<--------------------------|                           |
```

Para los usuarios:

```plaintext
+-------------------+       +-------------------+       +-------------------+
|                   |       |                   |       |                   |
|      Usuario      |       |  Servidor Backend |       |  Base de Datos    |
|                   |       |                   |       |                   |
+-------------------+       +-------------------+       +-------------------+
        |                           |                           |
        | 1. Actualizar información |                           |
        |    personal/cambiar       |                           |
        |    contraseña             |                           |
        |-------------------------->|                           |
        |                           | 2. Actualizar base de datos|
        |                           |-------------------------->|
        |                           |                           |
        |                           | 3. Confirmar operación    |
        |                           |<--------------------------|
        |                           |                           |
        | 4. Enviar confirmación    |                           |
        |<--------------------------|                           |
```

## Patrones de Diseño

### MVC (Model-View-Controller)

La aplicación sigue el patrón MVC para separar la lógica de negocio, la lógica de presentación y la lógica de control. Esto facilita el mantenimiento y la escalabilidad del código.

#### Ejemplo de Implementación

- **Modelo**: Representa la estructura de los datos y las reglas de negocio.
  ```javascript
  // filepath: /src/models/courseModel.js
  import { pool } from '../db/configPG.js';

  export const getCourses = async () => {
    const result = await pool.query('SELECT * FROM courses');
    return result.rows;
  };
  ```

- **Vista**: En el contexto de una API, la vista es la respuesta JSON enviada al cliente.
  ```javascript
  // filepath: /src/controllers/courseController.js
  import { getCourses } from '../models/courseModel.js';

  export const getAllCoursesController = async (req, res) => {
    try {
      const courses = await getCourses();
      return res.status(200).json({
        success: true,
        data: courses,
      });
    } catch (error) {
      console.error('Error in getAllCoursesController:', error);
      return res.status(500).json({
        success: false,
        errorMessage: 'Internal server error',
        error: error,
      });
    }
  };
  ```

- **Controlador**: Gestiona la lógica de la aplicación y coordina la interacción entre el modelo y la vista.
  ```javascript
  // filepath: /src/routes/routesCourses.js
  import express from 'express';
  import { getAllCoursesController } from '../controllers/courseController.js';

  const router = express.Router();

  router.get('/courses', getAllCoursesController);

  export default router;
  ```

### Singleton

El patrón Singleton se utiliza para asegurar que solo haya una instancia de la conexión a la base de datos.

#### Ejemplo de Implementación

```javascript
// filepath: /src/db/configPG.js
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export { pool };
```

### Factory

El patrón Factory se utiliza para la creación de objetos de servicios y controladores, facilitando la gestión y reutilización del código.

#### Ejemplo de Implementación

```javascript
// filepath: /src/factories/userFactory.js
import { createUser, getUser, updateUser, deleteUser } from '../models/userModel.js';

export const userFactory = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
```

### Observer

El patrón Observer se utiliza para la gestión de eventos y notificaciones, permitiendo que los componentes de la aplicación se suscriban y reaccionen a eventos específicos.

#### Ejemplo de Implementación

```javascript
// filepath: /src/utils/eventEmitter.js
import EventEmitter from 'events';

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

export default myEmitter;
```

```javascript
// filepath: /src/controllers/userController.js
import myEmitter from '../utils/eventEmitter.js';

myEmitter.on('userCreated', (user) => {
  console.log(`User created: ${user.name}`);
});

export const createUserController = async (req, res) => {
  const { name, email, password } = req.body;
  // ... lógica para crear usuario
  myEmitter.emit('userCreated', { name, email });
  res.status(201).json({ success: true, message: 'User created successfully' });
};
```

## Seguridad

- **Autenticación y Autorización**: Implementada con JWT para asegurar que solo los usuarios autenticados puedan acceder a los recursos protegidos.
- **Hashing de Contraseñas**: Utilizado bcrypt para asegurar que las contraseñas se almacenen de manera segura.
- **Validación de Datos**: Validación exhaustiva de los datos de entrada para prevenir ataques de inyección y otros tipos de ataques.
- **Comunicación Segura**: Todas las comunicaciones se realizan a través de HTTPS para asegurar la confidencialidad e integridad de los datos.

## Escalabilidad

- **Balanceo de Carga**: Utilizado para distribuir las solicitudes entre múltiples instancias del servidor.
- **Autoescalado**: Configurado para escalar automáticamente las instancias del servidor en función de la carga.
- **Sharding**: Implementado en la base de datos para distribuir los datos entre múltiples servidores.
- **Caché**: Utilizado para almacenar en caché las respuestas frecuentes y reducir la carga en la base de datos.

## Conclusión
La arquitectura del backend de "Movimientos del Alma" está diseñada para ser modular, escalable y segura, permitiendo una fácil expansión y mantenimiento a medida que la aplicación crece.
