// Importamos las dependencias necesarias
const express = require('express');
const router = express.Router();
const { leerArchivoJson, escribirArchivoJson } = require('../utilidades/archivo');

// Definimos la ruta para obtener todos los articulos
router.get('/todos', (req, res) => {
    // Leemos el archivo 'articulos.json' usando la función 'leerArchivoJson'
    const articulos = leerArchivoJson('articulo.json');

    // Enviamos la lista de articulos como respuesta
    res.json(articulos);
});

// Definimos la ruta para obtener un articulo por su id
router.get('/articulo', (req, res) => {
    // Obtenemos el 'idarticulo' desde los Headers de la ruta
    const idarticulo = parseInt(req.headers.idarticulo);

    // Leemos el archivo 'articulos.json' usando la función 'leerArchivoJson'
    const articulos = leerArchivoJson('articulo.json');

    // Buscamos el articulo con el 'idarticulo' especificado
    const articulo = articulos.find(a => a.idarticulo === idarticulo);

    // Si encontramos el articulo, enviamos el articulo como respuesta
    if (articulo) {
        res.json(articulo);
    } else {
        // Si no encontramos el articulo, enviamos un error 404 (No encontrado)
        res.status(404).send('Articulo no encontrado');
    }
});

// Definimos la ruta para crear un nuevo articulo
router.post('/crear', (req, res) => {
    // Obtenemos los datos del nuevo articulo desde el cuerpo de la petición
    const nuevoArticulo = req.body;

    // Leemos el archivo 'articulos.json' usando la función 'leerArchivoJson'
    const articulos = leerArchivoJson('articulo.json');

    // Asignamos un nuevo 'idarticulo' al nuevo articulo
    const idArticuloMax = Math.max(...articulos.map(a => a.idarticulo));
    nuevoArticulo.idarticulo = idArticuloMax + 1;

    // Agregamos el nuevo articulo a la lista de articulos
    articulos.push(nuevoArticulo);

    // Escribimos la lista actualizada de articulos en el archivo 'articulos.json' usando la función 'escribirArchivoJson'
    escribirArchivoJson('articulo.json', articulos);

    // Enviamos el nuevo articulo creado como respuesta
    res.json({ articulo: nuevoArticulo });
});

// Definimos la ruta para actualizar un articulo por su id
router.put('/actualizar', (req, res) => {
    // Obtenemos el 'idarticulo' desde los Headers de la ruta
    const idarticulo = parseInt(req.headers.idarticulo);

    // Obtenemos los datos actualizados del articulo desde el cuerpo de la petición
    const datosActualizados = req.body;

    // Leemos el archivo 'articulos.json' usando la función 'leerArchivoJson'
    const articulos = leerArchivoJson('articulo.json');

    // Buscamos el índice del articulo con el 'idarticulo' especificado
    const indiceArticulo = articulos.findIndex(a => a.idarticulo === idarticulo);

    // Si no encontramos el articulo, enviamos un error 404 (No encontrado)
    if (indiceArticulo === -1) {
        res.status(404).send('Articulo no encontrado');
        return;
    }

    // Actualizamos el articulo con los nuevos datos
    articulos[indiceArticulo] = { ...articulos[indiceArticulo], ...datosActualizados };

    // Escribimos la lista actualizada de articulos en el archivo 'articulos.json' usando la función 'escribirArchivoJson'
    escribirArchivoJson('articulo.json', articulos);

    // Enviamos el articulo actualizado como respuesta
    res.json(articulos[indiceArticulo]);
});

// Definimos la ruta para eliminar un articulo por su id
router.delete('/eliminar', (req, res) => {
    // Obtenemos el 'idarticulo' desde los Headers de la ruta
    const idarticulo = parseInt(req.headers.idarticulo);

    // Leemos el archivo 'articulos.json' usando la función 'leerArchivoJson'
    const articulos = leerArchivoJson('articulo.json');

    // Buscamos el índice del articulo con el 'idarticulo' especificado
    const indiceArticulo = articulos.findIndex(a => a.idarticulo === idarticulo);

    // Si encontramos el articulo, lo eliminamos de la lista de articulos
    if (indiceArticulo !== -1) {
        // Eliminamos el articulo de la lista
        articulos.splice(indiceArticulo, 1);

        // Escribimos la lista actualizada de articulos en el archivo 'articulos.json' usando la función 'escribirArchivoJson'
        escribirArchivoJson('articulo.json', articulos);

        // Enviamos un mensaje de éxito como respuesta
        res.send('Articulo eliminado con éxito');
    } else {
        // Si no encontramos el articulo, enviamos un error 404 (No encontrado)
        res.status(404).send('Articulo no encontrado');
    }
});

// Exportamos el enrutador para que pueda ser utilizado en otros archivos
module.exports = router;
