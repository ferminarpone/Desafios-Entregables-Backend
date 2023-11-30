const socketClient = io();

socketClient.emit("message", "Hola soy el cliente");

const button = document.querySelector("#button");
button.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title");
  const description = document.querySelector("#description");
  const code = document.querySelector("#code");
  const price = document.querySelector("#price");
  const stock = document.querySelector("#stock");
  const category = document.querySelector("#category");
  const thumbnails = document.querySelector("#thumbnails");

  const newProduct = {
    title: title.value,
    description: description.value,
    code: code.value,
    price: price.value,
    stock: stock.value,
    category: category.value,
    thumbnails: thumbnails.value,
  };

  socketClient.emit("form_connection", newProduct);
});

socketClient.on("products_list", (data) => {
  const div = document.querySelector("#productList");
  let products = " ";
  data.forEach((product) => {
    products += `
  <h2>${product.title}</h2>
  <img src=${product.thumbnails} style="witdh:300px; height:300px"/>
  <p>Descripcion: ${product.description}</p>
  <p>Categoria: ${product.category}</p>
  <p>Stock: ${product.stock}</p>
  <p>Precio: ${product.price}</p>
  <button id="delete${product.id}"> Eliminar Producto </button>
  `;
  });
  div.innerHTML = products;
  data.forEach((prod) => {
    const deleteButton = document.querySelector(`#delete${prod.id}`);
    deleteButton.addEventListener("click", (e) => {
        e.preventDefault();
        socketClient.emit("product_delete", prod.id)
    });
  });
});
