import { Server } from "socket.io";
/* import productsDao from "../services/dbManager/products.dao.js"; */
import ChatServices from "../services/dbManager/dao/chat.services.js";
import ProductServices from "../services/dbManager/dao/products.services.js";

const initSocketServer = (server) =>{
    const socketServer = new Server(server);

    socketServer.on("connection", async (socketCliente) => {
        // Socket Realtimeproducts
          socketCliente.on("form_information", async (data) => {
            try {
              await ProductServices.createProduct(data);
              const prod = await ProductServices.getAllProducts();
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
              await ProductServices.deleteProduct(data);
              const prod = await ProductServices.getAllProducts();
              socketCliente.emit("products_list", prod.payload);
            } catch (e) {
              socketCliente.emit("products_list", { error: e.message });
            }
          });
          const prod = await ProductServices.getAllProducts();
          socketCliente.emit("products_list", prod.payload);
        
        
          //Socket chat
          socketCliente.on("chat_information", async(data)=>{
            try{
              await ChatServices.saveMessage(data);
              const messages = await ChatServices.getAllMessages();
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
          const messages = await ChatServices.getAllMessages();
          socketCliente.emit("chat_allMessages", messages)
        });
        
        
}
export { initSocketServer }