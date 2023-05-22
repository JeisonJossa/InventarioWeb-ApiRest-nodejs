// Importamos las dependencias necesarias
const express = require('express');
const router = express.Router();
const { leerArchivoJson, escribirArchivoJson } = require('../utilidades/archivo');



// Definimos la ruta para obtener todos los usuarios
router.get('/todos', (req, res) => {
    // Leemos el archivo 'usuario.json' usando la función 'leerArchivoJson'
    const usuarios = leerArchivoJson('usuario.json');

    // Enviamos la lista de usuarios como respuesta
    res.json(usuarios.usuario);
});

// Definimos la ruta para obtener un usuario por su CorreoElectronico
router.get('/usuario', (req, res) => {
    // Obtenemos el 'IdUsuario' desde el body de la ruta
    const correoElectronico = req.headers.correoelectronico;

    // Leemos el archivo 'usuario.json' usando la función 'leerArchivoJson'
    const usuarios = leerArchivoJson('usuario.json');

    // Buscamos el usuario con el 'CorreoElectronico' especificado
    const usuario = usuarios.usuario.find(u => u.CorreoElectronico === correoElectronico);

    // Si encontramos el usuario, enviamos el usuario como respuesta
    if (usuario) {
        res.json(usuario);
    } else {
        // Si no encontramos el usuario, enviamos un error 404 (No encontrado)
        res.status(404).send('Usuario no encontrado');
    }
});

// Definimos la ruta para crear un nuevo usuario
router.post('/crear', (req, res) => {
    // Obtenemos los datos del nuevo usuario desde el cuerpo de la petición
    const nuevoUsuario = req.body;

    // Leemos el archivo 'usuario.json' usando la función 'leerArchivoJson'
    const usuarios = leerArchivoJson('usuario.json');

    // Asignamos un nuevo 'IdUsuario' al nuevo usuario
    const idUsuarioMax = Math.max(...usuarios.usuario.map(u => u.IdUsuario));
    nuevoUsuario.IdUsuario = idUsuarioMax + 1;

    // Agregamos las propiedades al nuevo usuario
    nuevoUsuario.NombreUsuario = req.body.NombreUsuario;
    nuevoUsuario.CorreoElectronico = req.body.CorreoElectronico;
    nuevoUsuario.Contrasena = req.body.Contrasena;
    nuevoUsuario.EsAdmin = req.body.EsAdmin || 0;

    // Agregamos el nuevo usuario a la lista de usuarios
    usuarios.usuario.push(nuevoUsuario);

    // Escribimos la lista actualizada de usuarios en el archivo 'usuario.json' usando la función 'escribirArchivoJson'
    escribirArchivoJson('usuario.json', usuarios);

    // Enviamos el nuevo usuario creado como respuesta
    res.json({ usuario: nuevoUsuario });
});

// Definimos la ruta para actualizar un usuario por su CorreoElectronico
router.put('/actualizar', (req, res) => {

    // Obtenemos el 'CorreoElectronico' desde los Headers de la ruta
    const correoElectronico = req.headers.correoelectronico;

    // Obtenemos los datos actualizados del usuario desde el cuerpo de la petición
    const datosActualizados = req.body;

    // Leemos el archivo 'usuario.json' usando la función 'leerArchivoJson'
    const usuarios = leerArchivoJson('usuario.json');

    // Buscamos el índice del usuario con el 'CorreoElectronico' especificado
    const indiceUsuario = usuarios.usuario.findIndex(u => u.CorreoElectronico === correoElectronico);

    // Si no encontramos el usuario, enviamos un error 404 (No encontrado)
    if (indiceUsuario === -1) {
        res.status(404).send('Usuario no encontrado');
        return;
    }

    // Actualizamos el usuario con los nuevos datos
    usuarios.usuario[indiceUsuario] = { ...usuarios.usuario[indiceUsuario], ...datosActualizados };

    // Escribimos la lista actualizada de usuarios en el archivo 'usuario.json' usando la función 'escribirArchivoJson'
    escribirArchivoJson('usuario.json', usuarios);

    // Enviamos el usuario actualizado como respuesta
    res.json(usuarios.usuario[indiceUsuario]);


});

// Definimos la ruta para eliminar un usuario por su CorreoElectronico
router.delete('/eliminar', (req, res) => {
    // Obtenemos el 'IdUsuario' desde los Headers de la ruta
    const correoElectronico = req.headers.correoelectronico;

    // Leemos el archivo 'usuario.json' usando la función 'leerArchivoJson'
    const usuarios = leerArchivoJson('usuario.json');

    // Buscamos el índice del usuario con el 'CorreoElectronico' especificado
    const indiceUsuario = usuarios.usuario.findIndex(u => u.CorreoElectronico === correoElectronico);

    // Si encontramos el usuario, lo eliminamos de la lista de usuarios
    if (indiceUsuario !== -1) {
        // Eliminamos el usuario de la lista
        usuarios.usuario.splice(indiceUsuario, 1);

        // Escribimos la lista actualizada de usuarios en el archivo 'usuario.json' usando la función 'escribirArchivoJson'
        escribirArchivoJson('usuario.json', usuarios);

        // Enviamos un mensaje de éxito como respuesta
        res.send('Usuario eliminado con éxito');
    } else {
        // Si no encontramos el usuario, enviamos un error 404 (No encontrado)
        res.status(404).send('Usuario no encontrado');
    }
});

// Exportamos el enrutador para que pueda ser utilizado en otros archivos
module.exports = router;
