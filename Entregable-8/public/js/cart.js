const purchase = document.querySelector("#purchase");

if (purchase) {
  purchase.addEventListener("click", (e) => {
    const cid = e.target.dataset.purchase;
    fetch(`/api/carts/${cid}/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((result) => {

      fetch("/api/email");

      if (result.status === 200) {
        Swal.fire({
          title: "Compra exitosa!",
          text: "Revisa el detalle en tu correo electronico!",
          icon: "success",
          confirmButtonText: `
          <span id="confirmButton"></span>OK
        `,
        }).then((result) =>{
          window.location.replace("/products/cart");
        });

      }
    });
  });
}
