const socketClient = io();

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

  const input = document.querySelectorAll(
    "#title, #description, #code, #price, #stock, #category, #thumbnails"
  );
  input.forEach((e) => (e.value = ""));
});

socketClient.on("products_list", (data) => {
  if (Array.isArray(data)) {
    const div = document.querySelector("#productList");
    let products = " ";
    data.forEach((product) => {
      products += `
          <h2>${product.title}</h2>
          <img src=${product.thumbnails} />
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
        socketClient.emit("product_delete", prod.id);
      });
    });
  } else {
    const error = document.querySelector("#error");
    error.innerHTML = `
      <h1>Error</h1>
      <p>${data}</p>`;
  }
});
