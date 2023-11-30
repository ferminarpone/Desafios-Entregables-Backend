const socketClient = io();

socketClient.emit("message", "Hola soy el cliente");

const button = document.querySelector("#button");
button.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title");
  const description = document.querySelector("#description");
  const code = document.querySelector("#code");
  const price = document.querySelector("#price");
/*   const status = document.querySelector("#status"); */
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
  console.log(data);
});
