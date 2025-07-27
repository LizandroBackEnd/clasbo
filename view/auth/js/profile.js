document.addEventListener("DOMContentLoaded", () => {
  const userData = localStorage.getItem("pb_user");
  let currentUser = null;

  if (userData) {
    try {
      currentUser = JSON.parse(userData);
      const nombreCompleto =
        `${currentUser.name} ${currentUser.last_name} ${currentUser.second_last_name}`.trim();

      const nombreElement = document.getElementById("nombre-usuario");
      if (nombreElement && nombreCompleto) {
        nombreElement.textContent = nombreCompleto;
      }

      // Cargar foto de perfil si existe
      loadProfilePhoto();
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
    }
  } else {
    console.log("No hay datos de usuario, redirigiendo al login...");
    window.location.href = "login.html";
  }

  // Función para cargar la foto de perfil
  async function loadProfilePhoto() {
    if (currentUser) {
      try {
        const token = localStorage.getItem("pb_token");
        
        // Buscar el perfil del usuario
        const response = await fetch(`https://clasbo.pockethost.io/api/collections/profile/records?filter=(id_user='${currentUser.id}')`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const profileData = await response.json();
          if (profileData.items && profileData.items.length > 0) {
            const profile = profileData.items[0];
            if (profile.photo) {
              const fotoPerfil = document.getElementById("foto-perfil");
              if (fotoPerfil) {
                // URL de PocketBase para la imagen del perfil
                const photoUrl = `https://clasbo.pockethost.io/api/files/profile/${profile.id}/${profile.photo}`;
                fotoPerfil.src = photoUrl;
              }
            }
          }
        }
      } catch (error) {
        console.error("Error al cargar foto de perfil:", error);
      }
    }
  }

  // Funcionalidad del modal para cambiar foto de perfil
  const fotoPerfil = document.getElementById("foto-perfil");
  const modal = document.getElementById("modal-foto");
  const modalClose = document.getElementById("modal-close");
  const fileInput = document.getElementById("file-input");
  const btnConfirmar = document.getElementById("btn-confirmar");
  const btnCancelar = document.getElementById("btn-cancelar");
  const previewContainer = document.getElementById("preview-container");
  
  let selectedFile = null;

  // Abrir modal al hacer click en la foto de perfil
  if (fotoPerfil) {
    fotoPerfil.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  }

  // Cerrar modal
  function closeModal() {
    modal.style.display = "none";
    fileInput.value = "";
    previewContainer.innerHTML = "";
    selectedFile = null;
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (btnCancelar) {
    btnCancelar.addEventListener("click", closeModal);
  }

  // Cerrar modal al hacer click fuera del contenido
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Preview de la imagen seleccionada
  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        selectedFile = file;
        
        // Validar que sea una imagen
        if (!file.type.startsWith('image/')) {
          alert('Por favor selecciona un archivo de imagen válido.');
          return;
        }

        // Validar tamaño (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('La imagen debe ser menor a 5MB.');
          return;
        }

        // Crear preview
        const reader = new FileReader();
        reader.onload = (e) => {
          previewContainer.innerHTML = `
            <img src="${e.target.result}" alt="Preview" class="preview-image">
            <p style="margin-top: 10px; color: #666; font-size: 14px;">
              ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          `;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Confirmar cambio de foto
  if (btnConfirmar) {
    btnConfirmar.addEventListener("click", async () => {
      if (!selectedFile) {
        alert('Por favor selecciona una imagen primero.');
        return;
      }

      if (!currentUser) {
        alert('Error: No se encontraron datos del usuario.');
        return;
      }

      try {
        // Mostrar indicador de carga
        btnConfirmar.disabled = true;
        btnConfirmar.textContent = 'Subiendo...';

        const token = localStorage.getItem("pb_token");
        if (!token) {
          throw new Error('Token de autenticación no encontrado');
        }

        // Crear FormData para enviar la imagen
        const formData = new FormData();
        formData.append('id_user', currentUser.id);
        formData.append('photo', selectedFile);

        // Primero, verificar si ya existe un perfil para este usuario
        const checkResponse = await fetch(`https://clasbo.pockethost.io/api/collections/profile/records?filter=(id_user='${currentUser.id}')`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        let profileResponse;
        
        if (checkResponse.ok) {
          const existingProfile = await checkResponse.json();
          
          if (existingProfile.items && existingProfile.items.length > 0) {
            // Actualizar perfil existente
            const profileId = existingProfile.items[0].id;
            profileResponse = await fetch(`https://clasbo.pockethost.io/api/collections/profile/records/${profileId}`, {
              method: 'PATCH',
              headers: {
                'Authorization': `Bearer ${token}`
              },
              body: formData
            });
          } else {
            // Crear nuevo perfil
            profileResponse = await fetch(`https://clasbo.pockethost.io/api/collections/profile/records`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`
              },
              body: formData
            });
          }
        } else {
          throw new Error('Error al verificar el perfil existente');
        }

        if (!profileResponse.ok) {
          const errorData = await profileResponse.json();
          throw new Error(errorData.message || 'Error al actualizar la foto de perfil');
        }

        const updatedProfile = await profileResponse.json();

        // Actualizar la imagen en la página
        const photoUrl = `https://clasbo.pockethost.io/api/files/profile/${updatedProfile.id}/${updatedProfile.photo}?t=${Date.now()}`;
        fotoPerfil.src = photoUrl;

        // Cerrar modal y mostrar mensaje de éxito
        closeModal();
        
        // Mostrar notificación de éxito
        showNotification('Foto de perfil actualizada correctamente', 'success');

      } catch (error) {
        console.error('Error al actualizar foto de perfil:', error);
        alert('Error al actualizar la foto de perfil: ' + error.message);
      } finally {
        // Restaurar botón
        btnConfirmar.disabled = false;
        btnConfirmar.textContent = 'Confirmar';
      }
    });
  }

  // Función para mostrar notificaciones
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 5px;
      color: white;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      z-index: 1001;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      transition: opacity 0.3s ease;
      ${type === 'success' ? 'background-color: #4CAF50;' : 'background-color: #B2E4F2; color: #000;'}
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
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
