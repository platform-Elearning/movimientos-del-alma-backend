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
    - Potente sistema de tipos de datos y soporte para consultas complejas.
    - Extensibilidad a través de funciones y procedimientos almacenados.

- **JWT (JSON Web Tokens)**: 
  - **Descripción**: Utilizado para la autenticación y autorización de usuarios, asegurando que solo los usuarios autenticados puedan acceder a los recursos protegidos.
  - **Ventajas**: 
    - Tokens auto-contenidos que incluyen toda la información necesaria para la autenticación.
    - Fácil de implementar y utilizar en aplicaciones web y móviles.
    - Seguridad mejorada mediante la firma de tokens.

- **bcrypt**: 
  - **Descripción**: Utilizado para el hashing de contraseñas, asegurando que las contraseñas se almacenen de manera segura.
  - **Ventajas**: 
    - Algoritmo de hashing robusto y seguro.
    - Soporte para salting, añadiendo una capa adicional de seguridad.
    - Amplio uso y confianza en la comunidad de desarrollo.

- **dotenv**: 
  - **Descripción**: Utilizado para la gestión de variables de entorno, permitiendo configurar el entorno de desarrollo de manera flexible.
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
    - Automatiza el proceso de construcción, prueba y despliegue.
    - Extensible a través de plugins.
    - Facilita la detección temprana de errores y problemas.

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
## Flujos de Datos

1. **Autenticación y Autorización**:
   - El usuario envía sus credenciales al endpoint de login.
   - El servidor valida las credenciales y genera un token JWT.
   - El token se utiliza para autenticar y autorizar solicitudes subsecuentes.

   **Ejemplo**:
   - El usuario envía una solicitud POST a `/users/login` con su email y contraseña.
   - El controlador [`loginController`](src/controllers/authController.js) valida las credenciales utilizando la función [`readLoginData`](src/crud/crudUsers.js).
   - Si las credenciales son válidas, se genera un token JWT utilizando `jsonwebtoken` y se envía al cliente.
   - El cliente almacena el token y lo incluye en el encabezado de autorización para futuras solicitudes.

2. **Gestión de Cursos**:
   - Los administradores pueden crear, actualizar y eliminar cursos.
   - Los estudiantes pueden inscribirse en cursos y acceder a los módulos y lecciones.

   **Ejemplo**:
   - Un administrador envía una solicitud POST a `/courses/createCourse` con los datos del curso.
   - El controlador [`createCourseController`](src/controllers/courseController.js) llama a la función [`createCourse`](src/crud/crudCourses.js) para insertar el curso en la base de datos.
   - Los estudiantes pueden obtener la lista de cursos disponibles enviando una solicitud GET a `/courses/getAllCourses`.
   - El controlador [`getAllCoursesController`](src/controllers/courseController.js) llama a la función [`getCourses`](src/crud/crudCourses.js) para recuperar los cursos de la base de datos y enviarlos al cliente.

3. **Gestión de Usuarios**:
   - Los administradores pueden crear, actualizar y eliminar usuarios.
   - Los usuarios pueden actualizar su información personal y cambiar su contraseña.

   **Ejemplo**:
   - Un administrador envía una solicitud POST a `/users/createCompleteStudent` con los datos del estudiante.
   - El controlador [`createStudentController`](src/controllers/userController.js) llama a la función [`createStudent`](src/crud/crudUsers.js) para insertar al estudiante en la base de datos.
   - Un usuario puede cambiar su contraseña enviando una solicitud POST a `/users/changePassword` con su email, contraseña actual y nueva contraseña.
   - El controlador [`changePasswordController`](src/controllers/authController.js) valida la contraseña actual y actualiza la contraseña en la base de datos utilizando la función [`changePassword`](src/crud/crudUsers.js).

4. **Gestión de Inscripciones**:
   - Los estudiantes pueden inscribirse en cursos y actualizar su progreso en los módulos.

   **Ejemplo**:
   - Un estudiante envía una solicitud POST a `/enrollments/registerToCourse` con su DNI, ID del curso y módulos cubiertos.
   - El controlador [`createEnrollmentToCourseController`](src/controllers/enrollmentController.js) llama a la función [`registerToCourse`](src/crud/crudCourses.js) para registrar la inscripción en la base de datos.
   - El estudiante puede obtener sus inscripciones enviando una solicitud GET a `/courses/getCoursesByStudentId`.
   - El controlador [`getCoursesWithStudentIdController`](src/controllers/courseController.js) llama a la función [`getAllEnrollmentsByStudentId`](src/crud/crudEnrollments.js) para recuperar las inscripciones del estudiante y enviarlas al cliente.

## Patrones de Diseño

- **MVC (Model-View-Controller)**: La aplicación sigue el patrón MVC para separar la lógica de negocio, la lógica de presentación y la lógica de control.
  - **Model**: Representa la estructura de los datos y la lógica de negocio. Se encarga de la interacción con la base de datos.
  - **View**: Representa la interfaz de usuario y la presentación de los datos.
  - **Controller**: Gestiona la comunicación entre el modelo y la vista, procesando las entradas del usuario y actualizando el modelo y la vista en consecuencia.

- **Singleton**: Utilizado para la configuración de la base de datos para asegurar que solo haya una instancia de la conexión a la base de datos.
  - **Ejemplo**: La clase `DatabaseConnection` asegura que solo haya una instancia de la conexión a la base de datos, evitando múltiples conexiones innecesarias.

- **Factory**: Utilizado para la creación de objetos de servicios y controladores.
  - **Ejemplo**: La `ServiceFactory` se encarga de crear instancias de los servicios necesarios, como `UserService` y `CourseService`, proporcionando una interfaz común para la creación de estos objetos.

- **Observer**: Utilizado para la gestión de eventos y notificaciones.
  - **Ejemplo**: El patrón Observer se utiliza para notificar a los usuarios sobre eventos importantes, como la inscripción en un curso o la actualización de un módulo. Los observadores se suscriben a estos eventos y son notificados cuando ocurren.

- **Decorator**: Utilizado para añadir funcionalidad adicional a los objetos de manera dinámica.
  - **Ejemplo**: El patrón Decorator se utiliza para añadir características adicionales a los objetos de respuesta HTTP, como la adición de encabezados de seguridad o la transformación de datos antes de enviarlos al cliente.

- **Strategy**: Utilizado para definir una familia de algoritmos, encapsular cada uno de ellos y hacerlos intercambiables.
  - **Ejemplo**: El patrón Strategy se utiliza para implementar diferentes estrategias de validación de datos, permitiendo cambiar la estrategia de validación sin modificar el código cliente.

- **Adapter**: Utilizado para permitir que clases con interfaces incompatibles trabajen juntas.
  - **Ejemplo**: El patrón Adapter se utiliza para integrar servicios de terceros con la aplicación, adaptando sus interfaces para que sean compatibles con el resto del sistema.

- **Facade**: Utilizado para proporcionar una interfaz simplificada a un conjunto de interfaces en un subsistema.
  - **Ejemplo**: El patrón Facade se utiliza para proporcionar una interfaz simplificada para la gestión de usuarios, cursos y inscripciones, ocultando la complejidad de las interacciones subyacentes.

## Seguridad

- **Autenticación y Autorización**: 
  - **JWT (JSON Web Tokens)**: Utilizamos JWT para asegurar que solo los usuarios autenticados puedan acceder a los recursos protegidos. 
  - **Funcionamiento**: 
    - El usuario envía sus credenciales al endpoint de login.
    - El servidor valida las credenciales y genera un token JWT.
    - El token JWT se envía al cliente y se almacena en el almacenamiento local o en cookies seguras.
    - Para acceder a los recursos protegidos, el cliente debe incluir el token JWT en el encabezado de autorización de las solicitudes subsecuentes.
    - El servidor verifica la validez del token JWT en cada solicitud protegida.

- **Hashing de Contraseñas**: 
  - **bcrypt**: Utilizamos bcrypt para asegurar que las contraseñas se almacenen de manera segura.
  - **Funcionamiento**: 
    - Cuando un usuario crea una cuenta o cambia su contraseña, la contraseña se hashea utilizando bcrypt antes de almacenarse en la base de datos.
    - Durante el proceso de autenticación, la contraseña proporcionada por el usuario se compara con el hash almacenado utilizando bcrypt.

- **Validación de Datos**: 
  - **express-validator**: Utilizamos bibliotecas como `express-validator` para validar y sanitizar los datos de entrada.
  - **Funcionamiento**: 
    - Cada endpoint de la API valida los datos de entrada para asegurar que cumplen con los requisitos esperados.
    - La validación incluye la verificación de tipos de datos, formatos y la sanitización para prevenir ataques de inyección.

- **Comunicación Segura**: 
  - **HTTPS**: Todas las comunicaciones entre el cliente y el servidor se realizan a través de HTTPS.
  - **Funcionamiento**: 
    - El servidor está configurado para redirigir todas las solicitudes HTTP a HTTPS.
    - Utilizamos certificados SSL para cifrar las comunicaciones, asegurando la confidencialidad e integridad de los datos transmitidos.

- **Protección contra CSRF**: 
  - **Tokens CSRF**: Implementamos tokens CSRF para proteger contra ataques de falsificación de solicitudes entre sitios.
  - **Funcionamiento**: 
    - Los formularios y solicitudes POST incluyen un token CSRF único.
    - El servidor verifica la validez del token CSRF en cada solicitud para asegurar que proviene de un usuario autenticado.

- **Protección contra XSS**: 
  - **Escape y Sanitización**: Utilizamos técnicas de escape y sanitización para prevenir ataques de scripting entre sitios.
  - **Funcionamiento**: 
    - Todas las entradas de usuario se escapan y sanitizan antes de renderizarlas en la vista.
    - Esto previene la ejecución de scripts maliciosos que podrían comprometer la seguridad del usuario.

- **Rate Limiting**: 
  - **express-rate-limit**: Implementamos límites de tasa para prevenir ataques de fuerza bruta y denegación de servicio.
  - **Funcionamiento**: 
    - Limitamos el número de solicitudes que un usuario puede hacer en un período de tiempo determinado.
    - Esto ayuda a prevenir intentos de autenticación masivos y otros tipos de abuso.

- **Monitoreo y Registro**: 
  - **Winston y Morgan**: Utilizamos herramientas de monitoreo y registro para detectar y responder a posibles amenazas de seguridad.
  - **Funcionamiento**: 
    - Registramos todas las solicitudes y actividades del servidor.
    - Monitoreamos continuamente las actividades sospechosas y respondemos a incidentes de seguridad en tiempo real.

## Escalabilidad

- **Balanceo de Carga**: Utilizado para distribuir las solicitudes entre múltiples instancias del servidor.
  - **Funcionamiento**: 
    - Un balanceador de carga distribuye las solicitudes entrantes entre varias instancias del servidor para asegurar que ninguna instancia se sobrecargue.
    - Esto mejora la disponibilidad y la capacidad de respuesta de la aplicación.

- **Autoescalado**: Configurado para escalar automáticamente las instancias del servidor en función de la carga.
  - **Funcionamiento**: 
    - Utilizamos servicios de autoescalado que monitorean la carga del servidor y automáticamente añaden o eliminan instancias según sea necesario.
    - Esto asegura que la aplicación pueda manejar picos de tráfico sin intervención manual.

- **Sharding**: Implementado en la base de datos para distribuir los datos entre múltiples servidores.
  - **Funcionamiento**: 
    - La base de datos se divide en fragmentos (shards), cada uno de los cuales se almacena en un servidor diferente.
    - Esto permite distribuir la carga de trabajo y mejorar el rendimiento de las consultas a la base de datos.

- **Caché**: Utilizado para almacenar en caché las respuestas frecuentes y reducir la carga en la base de datos.
  - **Funcionamiento**: 
    - Utilizamos sistemas de caché como Redis o Memcached para almacenar temporalmente las respuestas de las consultas frecuentes.
    - Esto reduce la latencia y la carga en la base de datos, mejorando el rendimiento general de la aplicación.

- **Microservicios**: Arquitectura basada en microservicios para permitir la escalabilidad horizontal.
  - **Funcionamiento**: 
    - La aplicación está dividida en microservicios independientes que pueden ser escalados individualmente según la demanda.
    - Esto permite una mayor flexibilidad y eficiencia en la gestión de recursos.

- **CDN (Content Delivery Network)**: Utilizado para distribuir contenido estático a través de múltiples ubicaciones geográficas.
  - **Funcionamiento**: 
    - Utilizamos una CDN para almacenar y servir contenido estático (como imágenes, CSS y JavaScript) desde servidores ubicados en diferentes partes del mundo.
    - Esto reduce la latencia y mejora la velocidad de carga para los usuarios finales.

- **Desacoplamiento de Servicios**: Utilizado para minimizar las dependencias entre componentes del sistema.
  - **Funcionamiento**: 
    - Los servicios se comunican entre sí a través de APIs bien definidas, lo que permite que cada servicio sea desarrollado, desplegado y escalado de manera independiente.
    - Esto mejora la resiliencia y facilita la implementación de cambios sin afectar a otros componentes.


## Conclusión
La arquitectura del backend de "Movimientos del Alma" está diseñada para ser modular, escalable y segura, permitiendo una fácil expansión y mantenimiento a medida que la aplicación crece. 

### Resumen de la Arquitectura:
- **Modularidad**: La aplicación está dividida en componentes reutilizables y microservicios independientes, lo que facilita el desarrollo y la gestión del código.
- **Escalabilidad**: Utiliza técnicas como el balanceo de carga, autoescalado, sharding y caché para manejar un mayor volumen de usuarios y datos sin comprometer el rendimiento.
- **Seguridad**: Implementa medidas robustas de seguridad, incluyendo autenticación y autorización con JWT, validación de datos, protección contra ataques comunes y comunicación segura a través de HTTPS.
- **Patrones de Diseño**: Sigue patrones de diseño como MVC, Singleton, Factory y Observer para mantener el código organizado y fácil de mantener.
- **Monitoreo y Alertas**: Utiliza herramientas de monitoreo y alertas proactivas para asegurar el rendimiento y la disponibilidad de la aplicación en todo momento.

Estas características aseguran que "Movimientos del Alma" pueda crecer y adaptarse a las necesidades cambiantes de los usuarios, proporcionando una plataforma confiable y eficiente para la gestión de cursos y alumnos.
```