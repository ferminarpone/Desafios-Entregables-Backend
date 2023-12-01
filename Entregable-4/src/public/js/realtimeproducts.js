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
  socketClient.emit("form_information", newProduct);
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
      <div class="col-sm-4 mb-4">
      <div class="card" style="width: auto;">
        <img src=${product.thumbnails} class="mx-auto mt-2" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text"><strong>Descripcion:</strong> ${product.description}</p>
          <p class="card-text"><strong>Categoria:</strong> ${product.category}</p>
          <p class="card-text"><strong>Stock:</strong> ${product.stock}</p>
          <p class="card-text"><strong>Precio:</strong> ${product.price}</p>
          <p class="card-text"><strong>Code:</strong> ${product.code}</p>
          <p class="card-text"><strong>Id:</strong> ${product.id}</p>
          <button class="btn btn-outline-secondary" id="delete${product.id}"> Eliminar Producto </button>
        </div>
      </div>
    </div>
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
    Swal.fire({
      icon: "error",
      text: `${data}`,
      width: 400,
    });
  }
});
