//Boton logout 
const logout = document.getElementById("logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("/api/jwt/logout").then((result) => {
    if (result.status === 200) {
      window.location.replace("/");
    }
  });
}); 

//Boton Agregar carrito
document.addEventListener('DOMContentLoaded', ()=> {
  const cid = document.querySelector("#idCart").dataset.cartId;
  const addCartButtons = document.querySelectorAll('.addCartBtn');
  addCartButtons.forEach((btn) => {
      btn.addEventListener('click', (e)=> {
          const pid = e.target.dataset.productId;
           fetch(`/api/carts/${cid}/product/${pid}`,{
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
          }).then((result) => {
            if (result.status === 200) {
               window.location.replace("/products/cart");
            }
            if(result.status === 404){
              Swal.fire({
                icon: "error",
                text: `No es posible agregar productos propios al carrito.`,
                width: 400,
              });
            }
          }); 
      });
  });
});

