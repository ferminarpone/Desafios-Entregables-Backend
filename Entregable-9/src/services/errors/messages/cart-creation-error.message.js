export const nullIdCartErrorInfo = (req, cid) => {
    req.logger.error(`
      El Id ingresado no corresponde a ningun carrito de la DB.
          Propied requerida:
  
              -> Id recibido: ${cid}.
      `);
  };

  export const IdCartErrorInfo = (req, cid) => {
    req.logger.error(`
      El Id ingresado no corresponde a ningun carrito de la DB.
          Propied requerida:
  
              -> Id recibido: ${cid}.
      `);
  };