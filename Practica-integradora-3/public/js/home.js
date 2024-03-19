//Boton logout 
const logout = document.getElementById("logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("/api/users/logout").then((result) => {
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

//Boton cambiar rol
const changeRole = document.querySelector("#changeRole");
changeRole.addEventListener("click", (e)=>{
  const uid = changeRole.dataset.userId;
  fetch(`/api/users/premium/${uid}`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
   }) .then((result) => {
     if (result.status === 200) {
      Swal.fire({
        icon: "success",
        text: `El rol de usuario ha sido modificado exitosamente.`,
        width: 400,
      });
     }
     if(result.status === 404){
       Swal.fire({
         icon: "error",
         text: `Error al intentar modificar el rol de usuario.`,
         width: 400,
       });
     }
   });  
})