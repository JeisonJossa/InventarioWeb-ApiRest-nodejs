// Importamos las dependencias necesarias
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); // Creamos una instancia de la aplicación Express

// Importamos las rutas para cada entidad
const articuloRutas = require('./rutas/articulo');
const alertastockRutas = require('./rutas/alertastock');
const movimientoinventarioRutas = require('./rutas/movimientoinventario');
const usuarioRutas = require('./rutas/usuario');

// Configuramos el analizador del cuerpo de las peticiones.
// Esto nos permite acceder a los datos enviados en el cuerpo de las peticiones HTTP
app.use(bodyParser.json()); // Analiza las peticiones con contenido tipo 'application/json'
app.use(bodyParser.urlencoded({ extended: false })); // Analiza las peticiones con contenido tipo 'application/x-www-form-urlencoded'

// Registramos las rutas importadas para que sean utilizadas por la aplicación Express

app.use('/inventarioweb/articulos', articuloRutas); // Registramos las rutas de artículo en la ruta base '/articulos'
app.use('/inventarioweb/alertastock', alertastockRutas); // Registramos las rutas de alertastock en la ruta base '/alertastock'
app.use('/inventarioweb/movimientoinventario', movimientoinventarioRutas); // Registramos las rutas de movimientoinventario en la ruta base '/movimientoinventario'
app.use('/inventarioweb/usuarios', usuarioRutas); // Registramos las rutas de usuario en la ruta base '/usuarios'



// Iniciamos el servidor en un puerto específico
const puerto = 3000; // Definimos el puerto en el que queremos que el servidor escuche
app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`); // Mostramos un mensaje en la consola indicando que el servidor está escuchando en el puerto definido
});
