//Home
const home = document.querySelector("#home");
home.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.replace("/products");
});

//Boton cambiar rol
const changeRole = document.querySelector("#changeRole");
changeRole.addEventListener("click", (e) => {
  const uid = changeRole.dataset.userId;
  let role = changeRole.dataset.userRol;
  fetch(`/api/users/premium/${uid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => {
    if (result.status === 200) {
      let title;
      if (role === "User") {
        title = "Ahora eres usuario Premium!!";
      } else {
        title = "Ya no eres usuario Premium.";
      }
      Swal.fire({
        icon: "success",
        title: title,
        customClass: {
          title: "titleSARol",
        },
        text: `En tu proximo ingreso, verás las modificaciones!`,
        width: 400,
      });
    }
    if (result.status === 400) {
      Swal.fire({
        icon: "error",
        text: `Para ser usuario Premium es necesario completar la documentación requerida.`,
        width: 400,
      });
    }
    if (result.status === 404) {
      Swal.fire({
        icon: "error",
        text: `Error al intentar modificar el rol de usuario.`,
        width: 400,
      });
    }
  });
});

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

//Form de Documentación
const formIdentificacion = document.getElementById("formIdentificacion");
formIdentificacion.addEventListener("submit", async (e) => {
  e.preventDefault();
  const uid = e.target.dataset.form;
  const identificacion = document.getElementById("identificacion").files[0];
  const formData = new FormData();
  formData.append("file", identificacion);
  formData.set("doc", "identificacion");
  fetching(uid, formData);
});

const formDomicilio = document.getElementById("formDomicilio");

formDomicilio.addEventListener("submit", async (e) => {
  e.preventDefault();
  const uid = e.target.dataset.form;
  const domicilio = document.getElementById("domicilio").files[0];
  const formData = new FormData();
  formData.append("file", domicilio);
  formData.set("doc", "domicilio");
  fetching(uid, formData);
});

const formCuenta = document.getElementById("formCuenta");
formCuenta.addEventListener("submit", async (e) => {
  e.preventDefault();
  const uid = e.target.dataset.form;
  const cuenta = document.getElementById("cuenta").files[0];
  const formData = new FormData();
  formData.append("file", cuenta);
  formData.set("doc", "cuenta");
  fetching(uid, formData);
});

const fetching = async (uid, formData) => {
  await fetch(`/api/users/${uid}/documents`, {
    method: "POST",
    body: formData,
  }).then((result) => {
    if (result.status === 400) {
      Swal.fire({
        icon: "error",
        text: `Debes adjuntar el documento.`,
        width: 400,
      });
    }
    if (result.status === 500) {
      Swal.fire({
        icon: "error",
        text: `Se ha producido un error al intentar cargar la documentación.`,
        width: 400,
      });
    }
    if (result.status === 200) {
      Swal.fire({
        icon: "success",
        text: `Se subió la documentacion exitosamente.`,
        width: 400,
      });
    }
  });
};
