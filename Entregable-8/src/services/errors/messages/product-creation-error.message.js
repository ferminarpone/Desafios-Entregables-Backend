export const generateFieldProductErrorInfo = (product) => {
    console.log( `Una o más propiedades fueron enviadas incompletas o no son válidas.
        Lista de propiedades requeridas:

            -> title: type String, recibido: ${product.title}
            -> description: type String, recibido: ${product.description}
            -> price: type String, recibido: ${product.price}
            -> code: type String, recibido: ${product.code}
            -> category: type String, recibido: ${product.category}
            -> stock: type String, recibido: ${product.stock}
    `);
};

export const generateCodeProductErrorInfo = (code) => {
    console.log( `La propiedad code, ya existe dentro de la DB para otro producto.
        Propiedades requerida:

            -> code: type String, recibido: ${code.code}
    `);
};