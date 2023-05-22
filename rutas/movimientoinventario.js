// Importamos las dependencias necesarias
const express = require('express');
const router = express.Router();
const { leerArchivoJson, escribirArchivoJson } = require('../utilidades/archivo');

// Definimos la ruta para obtener todos los movimientos de inventario
router.get('/todos', (req, res) => {
    // Leemos el archivo 'movimientoinventario.json' usando la función 'leerArchivoJson'
    const movimientos = leerArchivoJson('movimientoinventario.json');

    // Enviamos la lista de movimientos de inventario como respuesta
    res.json(movimientos);
});

// Definimos la ruta para obtener un movimiento de inventario por su id
router.get('/movimiento', (req, res) => {
    // Obtenemos el 'idmovimiento' desde los headers de la ruta
    const idmovimiento = req.headers.idmovimiento;

    // Leemos el archivo 'movimientoinventario.json' usando la función 'leerArchivoJson'
    const movimientos = leerArchivoJson('movimientoinventario.json');

    // Buscamos el movimiento con el 'idmovimiento' especificado
    const movimiento = movimientos.find(m => m.idmovimiento == idmovimiento);

    // Si encontramos el movimiento, enviamos el movimiento como respuesta
    if (movimiento) {
        res.json(movimiento);
    } else {
        // Si no encontramos el movimiento, enviamos un error 404 (No encontrado)
        res.status(404).send('Movimiento no encontrado');
    }
});

// Definimos la ruta para crear un nuevo movimiento de inventario
router.post('/crear', (req, res) => {
    // Obtenemos los datos del nuevo movimiento desde el cuerpo de la petición
    const nuevoMovimiento = req.body;

    // Leemos el archivo 'movimientoinventario.json' usando la función 'leerArchivoJson'
    const movimientos = leerArchivoJson('movimientoinventario.json');

    // Asignamos un nuevo 'idmovimiento' al nuevo movimiento
    const idMovimientoMax = Math.max(...movimientos.map(m => m.idmovimiento));
    nuevoMovimiento.idmovimiento = idMovimientoMax + 1;

    // Agregamos el nuevo movimiento a la lista de movimientos
    movimientos.push(nuevoMovimiento);

    // Escribimos la lista actualizada de movimientos en el archivo 'movimientoinventario.json' usando la función 'escribirArchivoJson'
    escribirArchivoJson('movimientoinventario.json', movimientos);

    // Enviamos el nuevo movimiento creado como respuesta
    res.json({ movimiento: nuevoMovimiento });
});

// Definimos la ruta para actualizar un movimiento por su id
router.put('/actualizar', (req, res) => {
    // Obtenemos el 'idmovimiento' desde los headers de la ruta
    const idmovimiento = req.headers.idmovimiento;

    // Obtenemos los datos actualizados del movimiento desde el cuerpo de la petición
    const datosActualizados = req.body;

    // Leemos el archivo 'movimientoinventario.json' usando la función 'leerArchivoJson'
    const movimientos = leerArchivoJson('movimientoinventario.json');

    // Buscamos el índice del movimiento con el 'idmovimiento' especificado
    const indiceMovimiento = movimientos.findIndex(m => m.idmovimiento == idmovimiento);

    // Si no encontramos el movimiento, enviamos un error 404 (No encontrado)
    if (indiceMovimiento === -1) {
        res.status(404).send('Movimiento no encontrado');
        return;
    }

    // Actualizamos el movimiento con los nuevos datos
    movimientos[indiceMovimiento] = { ...movimientos[indiceMovimiento], ...datosActualizados };

    // Escribimos la lista actualizada de movimientos en el archivo 'movimientoinventario.json' usando la función 'escribirArchivoJson'
    escribirArchivoJson('movimientoinventario.json', movimientos);

    // Enviamos el movimiento actualizado como respuesta
    res.json(movimientos[indiceMovimiento]);
});

// Definimos la ruta para eliminar un movimiento por su id
router.delete('/eliminar', (req, res) => {
    // Obtenemos el 'idmovimiento' desde los headers de la ruta
    const idmovimiento = req.headers.idmovimiento;

    // Leemos el archivo 'movimientoinventario.json' usando la función 'leerArchivoJson'
    const movimientos = leerArchivoJson('movimientoinventario.json');

    // Buscamos el índice del movimiento con el 'idmovimiento' especificado
    const indiceMovimiento = movimientos.findIndex(m => m.idmovimiento == idmovimiento);

    // Si encontramos el movimiento, lo eliminamos de la lista de movimientos
    if (indiceMovimiento !== -1) {
        // Eliminamos el movimiento de la lista
        movimientos.splice(indiceMovimiento, 1);

        // Escribimos la lista actualizada de movimientos en el archivo 'movimientoinventario.json' usando la función 'escribirArchivoJson'
        escribirArchivoJson('movimientoinventario.json', movimientos);

        // Enviamos un mensaje de éxito como respuesta
        res.send('Movimiento eliminado con éxito');
    } else {
        // Si no encontramos el movimiento, enviamos un error 404 (No encontrado)
        res.status(404).send('Movimiento no encontrado');
    }
});

// Exportamos el enrutador para que pueda ser utilizado en otros archivos
module.exports = router;

