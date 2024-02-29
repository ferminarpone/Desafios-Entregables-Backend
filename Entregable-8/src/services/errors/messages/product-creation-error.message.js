export const generateFieldProductErrorInfo = (product) => {
    console.log( `Una o más propiedades fueron enviadas incompletas o no son válidas.
        Lista de propiedades requeridas:

            -> title: type String, recibido: ${product[0]}
            -> description: type String, recibido: ${product[1]}
            -> price: type String, recibido: ${product[2]}
            -> code: type String, recibido: ${product[3]}
            -> category: type String, recibido: ${product[4]}
            -> stock: type String, recibido: ${product[5]}
    `);
};

export const generateCodeProductErrorInfo = (code) => {
    console.log( `La propiedad code, ya existe dentro de la DB para otro producto.
        Propied requerida:

            -> code: type String, recibido: ${code.code} ya existente.
    `);
};