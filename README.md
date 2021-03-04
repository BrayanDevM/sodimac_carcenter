# SODIMAC TEST - CARCENTER 🚀

Ejercicio de prueba para admisión laboral en SODIMAC

# Configuración 🔧

Dependencias

- NodeJS

## Servidor en NodeJS

Una vez descargado, es necesario reconstruír los módulos de Node usando el comando:

```
npm install
```

Posteriormente debemos crear un archivo para usar las variables de entorno en la raíz del proyecto, el archivo debe llamarse: `.env`, en él establecemos la configuración de variables sensibles, aquí esta el usuario, contraseña y URI de la base de datos en ORACLE:

```
DB_USER=system
DB_PASS=admin
DB_URI=localhost:1521/xe
```

## Base de datos con Oracle

Crear una base de datos en Oracle, ir a la carpeta `sodimac_carcenter_DB` ahí se encuentran exportadas las tablas de la aplicación:.

1. Crear tabla `TIENDAS`.
2. Crear tabla `CLIENTES`.
3. Crear tabla `VEHICULOS`.
4. Crear tabla `SOLICITUDES`.
5. Crear tabla `EMPLEADOS`.
6. Crear tabla `MANTENIMIENTOS`.
7. Crear tabla `REPUESTOS`.
8. Crear tabla `FACTURAS`.

> En la carpeta `sodimac_carcenter_DB/Modelos` se encuentran los modelos generados por SQL Developer.

# Estructutra del Back-End

El proyecto está construído siguiendo el estilo de arquitectura **Modelo Vista Controlador** (MVC), en este caso las vistas son las rutas que devuelven la respuesta en formato JSON.

## Controladores 📝

Los controladores ejecutan los métodos que disparan las peticiones a través de las rutas, estos realizan el CRUD en las tablas.

## Middlewares 🛡

Los middlewares ejecutan validaciones antes de ejecutar cualquier petición en los controladores: `no implementado`

## Rutas (vista)

Devuelven objetos JSON con los resultados de las peticiones.

# Comandos Back-End

Para inicializar el servidor una vez instaladas las dependencias podemos usar dos comandos:

```
npm start
```

Este comando permite iniciar servidor con node por defecto.

#

```
npm run start-dev
```

Este comando permite iniciar el servidor con **nodemon**, el cual activa la escucha para reiniciar servidor tras cada cambio realizado.

# Comandos Front-End

Para inicializar la aplicación una vez instaladas las dependencias podemos usar dos comandos:

```
ng serve -o
```

# Tecnologías usadas 🛠

- JavaScript
- NodeJS
- Express
- Oracledb
- Oracle SQL
- Body-parser
- Dotenv
- Angular

# Autor

## Brayan Devia Machado

_Analista y Desarrollador de sistemas de información_

Contacto:
[Facebook](https://www.facebook.com/BrayanDevM.Developer) |
[Instagram](https://www.instagram.com/brayan.dev.m/) |
[WhatsApp](https://api.whatsapp.com/send?phone=573115071561)
