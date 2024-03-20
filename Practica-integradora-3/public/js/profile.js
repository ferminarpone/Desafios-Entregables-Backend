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

//Boton cambiar rol
const changeRole = document.querySelector("#changeRole");
changeRole.addEventListener("click", (e)=>{
  const uid = changeRole.dataset.userId;
  let role = changeRole.dataset.userRol;
  fetch(`/api/users/premium/${uid}`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
   }) .then((result) => {
     if (result.status === 200) {
        let title;
        if(role === "User"){
            title = "Ahora eres usuario Premium!!"
        }else{
            title = "Ya no eres usuario Premium."
        }
      Swal.fire({
        icon: "success",
        title: title,
        customClass: {
            title: 'titleSARol'
          },
        text: `En tu proximo ingreso, verás las modificaciones!`,
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

//Home
const home = document.querySelector('#home');
home.addEventListener("click", (e)=>{
  e.preventDefault();
  window.location.replace("/products");
})