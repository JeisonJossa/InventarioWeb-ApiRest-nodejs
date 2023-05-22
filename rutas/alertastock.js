// Importamos las dependencias necesarias
const express = require('express');
const router = express.Router();
const { leerArchivoJson, escribirArchivoJson } = require('../utilidades/archivo');

// Definimos la ruta para obtener todas las alertas de stock
router.get('/todos', (req, res) => {
    // Leemos el archivo 'alertastock.json' usando la función 'leerArchivoJson'
    const alertas = leerArchivoJson('alertastock.json');

    // Enviamos la lista de alertas como respuesta
    res.json(alertas);
});

// Definimos la ruta para obtener una alerta por su id
router.get('/alertastock', (req, res) => {
    // Obtenemos el 'idalertastock' desde el body de la ruta
    const idalertastock = req.headers.idalertastock;

    // Leemos el archivo 'alertastock.json' usando la función 'leerArchivoJson'
    const alertas = leerArchivoJson('alertastock.json');

    // Buscamos la alerta con el 'idalertastock' especificado
    const alerta = alertas.find(a => a.idalertastock === idalertastock);

    // Si encontramos la alerta, enviamos la alerta como respuesta
    if (alerta) {
        res.json(alerta);
    } else {
        // Si no encontramos la alerta, enviamos un error 404 (No encontrado)
        res.status(404).send('Alerta no encontrada');
    }
});

// Definimos la ruta para crear una nueva alerta
router.post('/crear', (req, res) => {
    // Obtenemos los datos de la nueva alerta desde el cuerpo de la petición
    const nuevaAlerta = req.body;

    // Leemos el archivo 'alertastock.json' usando la función 'leerArchivoJson'
    const alertas = leerArchivoJson('alertastock.json');

    // Asignamos un nuevo 'idalertastock' a la nueva alerta
    const idAlertaMax = Math.max(...alertas.map(a => a.idalertastock));
    nuevaAlerta.idalertastock = idAlertaMax + 1;

    // Agregamos la nueva alerta a la lista de alertas
    alertas.push(nuevaAlerta);

    // Escribimos la lista actualizada de alertas en el archivo 'alertastock.json' usando la función 'escribirArchivoJson'
    escribirArchivoJson('alertastock.json', alertas);

    // Enviamos la nueva alerta creada como respuesta
    res.json(nuevaAlerta);
});

// Definimos la ruta para actualizar una alerta por su id
router.put('/actualizar', (req, res) => {
    // Obtenemos el 'idalertastock' desde los Headers de la ruta
    const idalertastock = parseInt(req.headers.idalertastock);

    // Obtenemos los datos actualizados de la alerta desde el cuerpo de la petición
    const datosActualizados = req.body;

    // Leemos el archivo 'alertastock.json' usando la función 'leerArchivoJson'
    const alertas = leerArchivoJson('alertastock.json');

    // Buscamos el índice de la alerta con el 'idalertastock' especificado
    const indiceAlerta = alertas.findIndex(a => a.idalertastock === idalertastock);

    // Si encontramos la alerta, la actualizamos
    if (indiceAlerta !== -1) {
        // Actualizamos los datos de la alerta
        alertas[indiceAlerta] = { ...alertas[indiceAlerta], ...datosActualizados };

        // Escribimos la lista actualizada de alertas en el archivo 'alertastock.json' usando la función 'escribirArchivoJson'
        escribirArchivoJson('alertastock.json', alertas);

        // Enviamos la alerta actualizada como respuesta
        res.json(alertas[indiceAlerta]);
    } else {
        // Si no encontramos la alerta, enviamos un error 404 (No encontrado)
        res.status(404).send('Alerta no encontrada');
    }
});

// Definimos la ruta para eliminar una alerta por su id
router.delete('/eliminar', (req, res) => {
    // Obtenemos el 'idalertastock' desde los Headers de la ruta
    const idalertastock = parseInt(req.headers.idalertastock);

    // Leemos el archivo 'alertastock.json' usando la función 'leerArchivoJson'
    const alertas = leerArchivoJson('alertastock.json');

    // Buscamos el índice de la alerta con el 'idalertastock' especificado
    const indiceAlerta = alertas.findIndex(a => a.idalertastock === idalertastock);

    // Si encontramos la alerta, la eliminamos
    if (indiceAlerta !== -1) {
        // Eliminamos la alerta de la lista
        const alertaEliminada = alertas.splice(indiceAlerta, 1);

        // Escribimos la lista actualizada de alertas en el archivo 'alertastock.json' usando la función 'escribirArchivoJson'
        escribirArchivoJson('alertastock.json', alertas);

        // Enviamos la alerta eliminada como respuesta
        res.json(alertaEliminada);
    } else {
        // Si no encontramos la alerta, enviamos un error 404 (No encontrado)
        res.status(404).send('Alerta no encontrada');
    }
});

module.exports = router;
