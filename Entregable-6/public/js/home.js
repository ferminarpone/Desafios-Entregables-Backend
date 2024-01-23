const logout = document.getElementById("logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("/api/sessions/logout").then((result) => {
    if (result.status === 200) {
      window.location.replace("/users/login");
    }
  });
});
