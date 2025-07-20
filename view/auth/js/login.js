document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#login-form");
  const feedback = document.querySelector("#form-feedback");

  function showMessage(type, message) {
    feedback.className = `form-feedback ${type}`; // clase para estilo
    feedback.textContent = message;
    feedback.style.display = "block";
    feedback.style.opacity = "1";

    if (type !== "error") {
      setTimeout(() => {
        feedback.style.opacity = "0";
        setTimeout(() => (feedback.style.display = "none"), 300);
      }, 4000);
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
      identity: formData.get("email"),
      password: formData.get("password"),
    };
    console.log("Sending data:", data);

    try {
      const response = await fetch(
        "https://clasbo.pockethost.io/api/collections/users/auth-with-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log("Response:", result);

      if (!response.ok) {
        showMessage("error", "Credenciales incorrectas");
        return;
      }

      localStorage.setItem("pb_token", result.token);
      localStorage.setItem("pb_user", JSON.stringify(result.record));

      showMessage("success", "¡Inicio de sesión exitoso! Redirigiendo...");

      setTimeout(() => {
        window.location.href = "../user/profile.user.html";
      }, 1500);
    } catch (error) {
      console.error("Error", error);
      showMessage("error", "Error al iniciar sesión. Intenta de nuevo.");
    }
  });
});
