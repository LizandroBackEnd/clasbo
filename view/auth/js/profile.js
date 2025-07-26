document.addEventListener("DOMContentLoaded", () => {
  const userData = localStorage.getItem("pb_user");

  if (userData) {
    try {
      const user = JSON.parse(userData);
      const nombreCompleto =
        `${user.name} ${user.last_name} ${user.second_last_name}`.trim();

      const nombreElement = document.getElementById("nombre-usuario");
      if (nombreElement && nombreCompleto) {
        nombreElement.textContent = nombreCompleto;
      }
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
    }
  } else {
    console.log("No hay datos de usuario, redirigiendo al login...");
    window.location.href = "login.html";
  }

  const cerrarSesionBtn = document.getElementById("Cerrarsesion");
  if (cerrarSesionBtn) {
    cerrarSesionBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("pb_token");
      localStorage.removeItem("pb_user");
      window.location.href = "login.html";
    });
  }
});
