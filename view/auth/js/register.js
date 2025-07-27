document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#register-form");
  const feedback = document.querySelector("#form-feedback");

  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function showMessage(type, message) {
    feedback.className = `form-feedback ${type}`;
    feedback.innerHTML = message;
    feedback.style.display = "block";
    feedback.style.opacity = "1";

    if (type !== "error") {
      setTimeout(() => {
        feedback.style.opacity = "0";
        setTimeout(() => (feedback.style.display = "none"), 300);
      }, 5000);
    }
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {
      name: formData.get("name").toUpperCase(),
      last_name: formData.get("last_name").toUpperCase(),
      second_last_name: formData.get("second_last_name").toUpperCase(),
      email: formData.get("email"),
      date: formatDate(formData.get("date")),
      password: formData.get("password"),
      passwordConfirm: formData.get("confirm_password"),
      phone: formData.get("phone"),
    };

    // Validaciones
    if (data.password.length < 8) {
      showMessage("error", "La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (data.password !== data.passwordConfirm) {
      showMessage("error", "Las contraseñas no coinciden.");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(data.phone)) {
      showMessage("error", "El teléfono debe contener solo 10 dígitos.");
      return;
    }

    showMessage("info", "Registrando usuario...");

    try {
      const response = await fetch(
        "https://clasbo.pockethost.io/api/collections/users/records",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log("Response:", result);

      if (!response.ok) {
        let details = "";
        if (result.data) {
          details = Object.entries(result.data)
            .map(([field, err]) => `<li>${field}: ${err.message}</li>`)
            .join("");
          details = `<ul>${details}</ul>`;
        }
        showMessage("error", `Error: ${result.message || "Error al registrar"} ${details}`);
      } else {
        showMessage("success", "¡Registro exitoso! Ya puedes iniciar sesión.");
        form.reset();
      }
    } catch (error) {
      console.error("Error", error);
      showMessage("error", "Error de conexión. Intenta de nuevo.");
    }
  });
});
