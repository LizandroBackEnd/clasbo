// Datos de las ofertas
const ofertas = {
    "Blanqueamiento Dental": {
        descripcion: "Aprovecha un 25% de descuento en tu primera sesión de blanqueamiento dental.",
        costo: "Precio regular: $1,200 MXN, Ahora $1,875 MXN",
        vigencia: "Oferta válida hasta el 15 de agosto de 2025.",
        beneficios: [
            "Resultados visibles en una sola sesión",
            "Mejora la estética de tu sonrisa",
            "Procedimiento seguro y efectivo",
        ],
        recomendaciones: "Recomendado para personas con manchas superficiales en los dientes. No apto para embarazadas o lactantes."
    },
    "Limpieza Dental": {
        descripcion: "Limpieza dental profunda para eliminar sarro y placa bacteriana.",
        costo: "Precio regular: $1,000 MXN, Ahora $399 MXN",
        vigencia: "Oferta válida hasta el 15 de agosto de 2025.",
        beneficios: [
            "Eliminación de placa y sarro",
            "Ambiente amigable y seguro",
            "Mejora la salud bucal",
        ],
        recomendaciones: "Recomendado cada 6 meses. No apto para personas con enfermedades periodontales avanzadas."
    },
    "Ortodoncia": {
        descripcion: "Alinea tus dientes con un 20% de descuento en tratamientos de ortodoncia.",
        costo: "Precio regular: $15,000 MXN, Ahora $12,000 MXN",
        vigencia: "Oferta válida hasta el 30 de agosto de 2025.",
        beneficios: [
            "Mejora la alineación dental",
            "Previene problemas futuros de mordida",
            "Tratamientos personalizados",
        ],
        recomendaciones: "Recomendado para adolescentes y adultos. Consulta previa obligatoria."
    },
    "Implantes Dentales": {
        descripcion: "Recupera tu sonrisa con un 20% de descuento en implantes dentales.",
        costo: "Precio regular: $20,000 MXN, Ahora $16,000 MXN",
        vigencia: "Oferta válida hasta el 30 de agosto de 2025.",
        beneficios: [
            "Solución permanente para dientes perdidos",
            "Mejora la función masticatoria",
            "Previene la pérdida ósea",
        ],
        recomendaciones: "Recomendado para personas con pérdida de uno o más dientes. Consulta médica previa obligatoria."
    },
    "Resinas Estéticas": {
        descripcion: "Restaura tus dientes con resinas estéticas a un precio especial.",
        costo: "Precio regular: $1300 MXN, Ahora $1040 MXN",
        vigencia: "Oferta válida hasta el 30 de septiembre de 2025.",
        beneficios: [
            "Solución estética para caries",
            "Procedimiento rápido y efectivo",
            "Materiales de alta calidad",
        ],
        recomendaciones: "Recomendado para caries superficiales. No apto para dientes con daño estructural severo."
    },
    "Coronas de Zirconio": {
        descripcion: "Protege y embellece tus dientes con coronas de zirconio.",
        costo: "Precio regular: $2,500 MXN, Ahora $1,875 MXN",
        vigencia: "Oferta válida hasta el 30 de septiembre de 2025.",
        beneficios: [
            "Alta resistencia y durabilidad",
            "Aspecto natural y estético",
            "Procedimiento mínimamente invasivo",
        ],
        recomendaciones: "Recomendado para dientes dañados o debilitados. Consulta previa obligatoria."
    },
    "Exodoncia Infantil": {
        descripcion: "Extracción dental segura y amigable para niños.",
        costo: "Precio regular: $800 MXN, Ahora $640 MXN",
        vigencia: "Oferta válida hasta el 30 de septiembre de 2025.",
        beneficios: [
            "Procedimiento rápido y sin dolor",
            "Ambiente amigable para niños",
            "Atención especializada por pediatras dentales",
        ],
        recomendaciones: "Recomendado para dientes de leche que necesitan extracción. Consulta previa obligatoria."
    },
    "Alineadores Transparentes": {
        descripcion: "Alinea tus dientes de forma discreta con nuestros alineadores transparentes.",
        costo: "Precio regular: $12,500 MXN, Ahora $9,375 MXN",
        vigencia: "Oferta válida hasta el 30 de octubre de 2025.",
        beneficios: [
            "Tratamiento estético y cómodo",
            "Removibles para facilitar la higiene bucal",
            "Resultados visibles en meses",
        ],
        recomendaciones: "Recomendado para adultos y adolescentes. Consulta previa obligatoria."
    }
};

// Inicializar modal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    // Elementos del modal
    const modal                  = document.getElementById('serviceModal');
    const modalTitle             = document.getElementById('modalTitle');
    const modalDescripcion       = document.getElementById('modalDescripcion');
    const modalCosto             = document.getElementById('modalCosto');
    const modalVigencia          = document.getElementById('modalVigencia');
    const modalBeneficios        = document.getElementById('modalBeneficios');
    const modalRecommendaciones  = document.getElementById('modalRecommendaciones');
    const closeBtn               = document.querySelector('.close');
    const agendarBtn             = document.getElementById('agendarCitaBtn');

    // Agregar eventos a cada oferta
    document.querySelectorAll('.ofertas, .columnaP').forEach(card => {
        card.addEventListener('click', () => {
            const img         = card.querySelector('img');
            const serviceName = img?.alt?.trim();
            const serviceData = ofertas[serviceName];

            if (serviceData) {
                modalTitle.textContent             = serviceName;
                modalDescripcion.textContent       = serviceData.descripcion;
                modalCosto.textContent             = serviceData.costo;
                modalVigencia.textContent          = serviceData.vigencia;
                modalRecommendaciones.textContent  = serviceData.recomendaciones;

                modalBeneficios.innerHTML = '';
                serviceData.beneficios.forEach(benefit => {
                    const li     = document.createElement('li');
                    li.textContent = benefit;
                    modalBeneficios.appendChild(li);
                });

                modal.style.display      = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Cerrar modal
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Agendar cita
    agendarBtn.addEventListener('click', () => {
        closeModal();
        window.location.href = './citas.html';
    });

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});