const resetForm = document.getElementById("resetPswForm");
let token = window.location.href.split('/').pop();

resetForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(resetForm);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  console.log(obj)
  fetch(`/api/settings/reset-password/${token}`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => {
    if (result.status === 200) {
      window.location.replace("/");
        }else {
      Swal.fire({
        icon: "error",
        text: `Credenciales incorrectas`,
        width: 400,
      });
    }
  });
});
