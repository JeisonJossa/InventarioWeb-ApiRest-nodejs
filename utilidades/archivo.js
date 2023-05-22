// Importamos el módulo 'fs' (file system) para trabajar con archivos
const fs = require('fs');

// Función para leer un archivo JSON
const leerArchivoJson = (nombreArchivo) => {
    // Leemos el archivo de forma síncrona usando 'readFileSync'
    // Concatenamos la ruta de la carpeta 'basedatosjson' con el nombre del archivo
    const datos = fs.readFileSync(`basedatosjson/${nombreArchivo}`);

    // Convertimos el contenido del archivo (string) a un objeto JSON y lo retornamos
    return JSON.parse(datos);
};

// Función para escribir en un archivo JSON
const escribirArchivoJson = (nombreArchivo, datos) => {
    // Convertimos el objeto JSON a una cadena de texto con formato (indentado con 2 espacios)
    const datosString = JSON.stringify(datos, null, 2);

    // Escribimos la cadena de texto en el archivo de forma síncrona usando 'writeFileSync'
    // Concatenamos la ruta de la carpeta 'basedatosjson' con el nombre del archivo
    fs.writeFileSync(`basedatosjson/${nombreArchivo}`, datosString);
};

// Exportamos las funciones 'leerArchivoJson' y 'escribirArchivoJson' para que puedan ser utilizadas en otros archivos
module.exports = {
    leerArchivoJson,
    escribirArchivoJson
};
