import { Server } from "socket.io";
import productsDao from "../dao/dbManager/products.dao.js";
import chatDao from "../dao/dbManager/chat.dao.js";

const initSocketServer = (server) =>{
    const socketServer = new Server(server);

    socketServer.on("connection", async (socketCliente) => {
        // Socket Realtimeproducts
          socketCliente.on("form_information", async (data) => {
            try {
              await productsDao.createProduct(data);
              const prod = await productsDao.getAllProducts();
              socketCliente.emit("products_list", prod.payload);
            } catch (e) {
              if (e.message.includes("required")) {
                return socketCliente.emit(
                  "products_list",
                  "Para agregar un nuevo producto, es necesario ingresar todos los campos requeridos."
                );
              }
              socketCliente.emit("products_list", e.message);
            }
          });
        
          socketCliente.on("product_delete", async(data) => {
            try {
              await productsDao.deleteProduct(data);
              const prod = await productsDao.getAllProducts();
              socketCliente.emit("products_list", prod.payload);
            } catch (e) {
              socketCliente.emit("products_list", { error: e.message });
            }
          });
          const prod = await productsDao.getAllProducts();
          socketCliente.emit("products_list", prod.payload);
        
        
          //Socket chat
          socketCliente.on("chat_information", async(data)=>{
            try{
              await chatDao.saveMessage(data);
              const messages = await chatDao.getAllMessages();
              socketServer.emit("chat_allMessages", messages) 
            }catch (e) {
              if (e.message.includes("required")) {
                return socketCliente.emit("chat_allMessages",
                  "Para comenzar es necesario ingresar todos los campos requeridos."
                );
              }
              socketCliente.emit("chat_allMessages", { error: e.message });
            }
          })
          const messages = await chatDao.getAllMessages();
          socketCliente.emit("chat_allMessages", messages)
        });
        
        
}
export { initSocketServer }