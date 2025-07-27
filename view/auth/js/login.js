document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#login-form");
  const feedback = document.querySelector("#form-feedback");
  
  // Variables para control de intentos
  let failedAttempts = parseInt(localStorage.getItem('loginFailedAttempts')) || 0;
  let blockUntil = parseInt(localStorage.getItem('loginBlockUntil')) || 0;
  const MAX_ATTEMPTS = 5;
  const BLOCK_TIME = 30000; // 30 segundos en milisegundos

  function showMessage(type, message) {
    if (!feedback) {
      console.error("Element with ID 'form-feedback' not found");
      console.log(type + ":", message);
      return;
    }
    
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

  function checkIfBlocked() {
    const currentTime = Date.now();
    if (currentTime < blockUntil) {
      const remainingTime = Math.ceil((blockUntil - currentTime) / 1000);
      showMessage("error", `Demasiados intentos fallidos. Espera ${remainingTime} segundos para intentar de nuevo.`);
      return true;
    }
    
    // Si el tiempo de bloqueo ya pasó, reiniciar contadores
    if (blockUntil > 0 && currentTime >= blockUntil) {
      failedAttempts = 0;
      localStorage.removeItem('loginFailedAttempts');
      localStorage.removeItem('loginBlockUntil');
      blockUntil = 0;
    }
    
    return false;
  }

  function updateFailedAttempts() {
    failedAttempts++;
    localStorage.setItem('loginFailedAttempts', failedAttempts.toString());
    
    if (failedAttempts >= MAX_ATTEMPTS) {
      blockUntil = Date.now() + BLOCK_TIME;
      localStorage.setItem('loginBlockUntil', blockUntil.toString());
      showMessage("error", `Has excedido el número de intentos permitidos. Espera 30 segundos para intentar de nuevo.`);
      startCountdown();
    } else {
      const remainingAttempts = MAX_ATTEMPTS - failedAttempts;
      showMessage("error", `Credenciales incorrectas. Te quedan ${remainingAttempts} intento(s).`);
    }
  }

  function startCountdown() {
    const countdownInterval = setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = Math.ceil((blockUntil - currentTime) / 1000);
      
      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        failedAttempts = 0;
        localStorage.removeItem('loginFailedAttempts');
        localStorage.removeItem('loginBlockUntil');
        blockUntil = 0;
        feedback.style.display = "none";
      } else {
        showMessage("error", `Demasiados intentos fallidos. Espera ${remainingTime} segundos para intentar de nuevo.`);
      }
    }, 1000);
  }

  function resetAttempts() {
    failedAttempts = 0;
    localStorage.removeItem('loginFailedAttempts');
    localStorage.removeItem('loginBlockUntil');
    blockUntil = 0;
  }

  if (!form) {
    console.error("Form with ID 'login-form' not found");
    return;
  }

  if (!feedback) {
    console.error("Element with ID 'form-feedback' not found");
    return;
  }

  // Verificar al cargar la página si hay un bloqueo activo
  if (checkIfBlocked()) {
    startCountdown();
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Verificar si el usuario está bloqueado
    if (checkIfBlocked()) {
      return;
    }

    if (!form) {
      console.error("Form with ID 'login-form' not found");
      return;
    }

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
        updateFailedAttempts();
        return;
      }

      // Login exitoso, reiniciar intentos
      resetAttempts();

      localStorage.setItem("pb_token", result.token);
      localStorage.setItem("pb_user", JSON.stringify(result.record));

      showMessage("success", "¡Inicio de sesión exitoso! Redirigiendo...");

      setTimeout(() => {
        window.location.href = "./perfilUsuario.html";
      }, 1500);
    } catch (error) {
      console.error("Error", error);
      showMessage("error", "Error al iniciar sesión. Intenta de nuevo.");
    }
  });
});
