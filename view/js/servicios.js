const servicesData = {
  "Ortopedia Dental": {
    description: "La ortopedia dental es una especialidad que se enfoca en corregir alteraciones en el crecimiento y desarrollo de los huesos y músculos faciales, especialmente durante la infancy y adolescencia.",
    cost: "Desde $2,500 - $5,000 MXN",
    benefits: [
      "Corrige problemas de mordida tempranamente",
      "Mejora la función respiratoria",
      "Previene problemas más severos en la edad adulta",
      "Mejora la estética facial",
      "Reduce la necesidad de tratamientos más invasivos"
    ],
    recommendations: "Ideal para niños entre 6-12 años. Es importante iniciar el tratamiento durante el crecimiento activo para obtener mejores resultados."
  },
  "Odontopediatría": {
    description: "Especialidad dental dedicada exclusivamente a la atención de la salud bucal de bebés, niños y adolescentes, creando un ambiente cómodo y amigable.",
    cost: "desde $500 - $1,000 MXN por consulta",
    benefits: [
      "Prevención temprana de caries",
      "Educación en higiene bucal",
      "Detección precoz de problemas dentales",
      "Tratamiento sin dolor ni estrés",
      "Creación de hábitos saludables"
    ],
    recommendations: "Primera visita recomendada al año de edad o cuando aparezca el primer diente. Visitas cada 6 meses para mantenimiento."
  },
  "Tratamiento previo para la colocación de implantes": {
    description: "Preparación integral de la cavidad oral para garantizar el éxito de los implantes dentales, incluyendo evaluación del hueso y tejidos blandos.",
    cost: "Desde $12,000 - $20,000 MXN",
    benefits: [
      "Mayor éxito en la colocación de implantes",
      "Reducción de complicaciones",
      "Mejor cicatrización",
      "Resultados más duraderos",
      "Planificación personalizada"
    ],
    recommendations: "Incluye radiografías 3D, análisis de densidad ósea y tratamiento de encías si es necesario. Fundamental para el éxito del implante."
  },
  "Implantes": {
    description: "Reemplazo de dientes perdidos mediante raíces artificiales de titanio que se integran al hueso, proporcionando una base sólida para coronas, puentes o prótesis.",
    cost: "Desde $1,500 - $8,000 MXN por implante",
    benefits: [
      "Solución permanente y duradera",
      "Preserva el hueso dental",
      "Apariencia y función natural",
      "No afecta dientes adyacentes",
      "Mejora la confianza al sonreír"
    ],
    recommendations: "Requiere buena salud bucal y densidad ósea adecuada. Proceso de 3-6 meses para completar la osteointegración."
  },
  "Periodoncia": {
    description: "Tratamiento especializado de las encías y estructuras de soporte de los dientes para prevenir y tratar enfermedades periodontales como gingivitis y periodontitis.",
    cost: "Desde $6,000 - $16,000 MXN por sesión",
    benefits: [
      "Previene la pérdida de dientes",
      "Elimina infecciones gingivales",
      "Mejora la salud bucal general",
      "Reduce el mal aliento",
      "Previene complicaciones sistémicas"
    ],
    recommendations: "Esencial mantener excelente higiene bucal. Puede requerir varias sesiones según la severidad del caso."
  },
  "Cirugía bucal": {
    description: "Procedimientos quirúrgicos en la cavidad oral incluyendo extracciones complejas, biopsias, remoción de quistes y otras intervenciones especializadas.",
    cost: "Desde $1,500 - $6,000 MXN según complejidad",
    benefits: [
      "Soluciona problemas complejos",
      "Procedimientos mínimamente invasivos",
      "Recuperación rápida",
      "Alivio del dolor",
      "Previene complicaciones futuras"
    ],
    recommendations: "Seguir estrictamente las indicaciones post-operatorias. Incluye medicación para el dolor y antibióticos si es necesario."
  },
  "Cirugía maxilofacial": {
    description: "Corrección quirúrgica de deformidades, traumatismos y patologías que afectan cara, mandíbula, maxilar y estructuras relacionadas.",
    cost: "Desde $1,300 - $3,000 MXN",
    benefits: [
      "Mejora función masticatoria",
      "Corrige asimetrías faciales",
      "Mejora la respiración",
      "Resultados estéticos superiores",
      "Solución definitiva a problemas complejos"
    ],
    recommendations: "Requiere estudios previos completos incluyendo tomografías. Proceso de recuperación de varias semanas."
  },
  "Diagnóstico": {
    description: "Evaluación integral de la salud bucal utilizando tecnología avanzada para detectar cualquier patología o problema dental en etapas tempranas.",
    cost: "Desde $500 - $2,500 MXN",
    benefits: [
      "Detección temprana de problemas",
      "Planificación de tratamientos precisos",
      "Prevención de complicaciones",
      "Tecnología de punta",
      "Diagnóstico preciso y confiable"
    ],
    recommendations: "Incluye radiografías digitales, fotografías intraorales y examen clínico completo. Recomendado anualmente."
  },
  "Operatoria dental": {
    description: "Tratamiento y restauración de dientes afectados por caries, fracturas o desgaste, utilizando materiales estéticos de última generación.",
    cost: "Desde $1000 - $6,000 MXN por pieza",
    benefits: [
      "Restaura la función dental",
      "Resultados estéticamente superiores",
      "Materiales duraderos",
      "Procedimientos sin dolor",
      "Preserva estructura dental sana"
    ],
    recommendations: "Importante tratar las caries tempranamente para evitar tratamientos más complejos como endodoncia."
  },
  "Oclusión protésica": {
    description: "Estudio y corrección de la forma en que los dientes superiores e inferiores hacen contacto al morder, optimizando la función masticatoria.",
    cost: "Desde $500 - $2,500 MXN",
    benefits: [
      "Mejora la función masticatoria",
      "Reduce el desgaste dental",
      "Alivia dolores de mandíbula",
      "Mejora la digestión",
      "Previene problemas temporomandibulares"
    ],
    recommendations: "Puede requerir uso de férulas de descarga nocturnas. Seguimiento periódico para mantener resultados."
  },
  "Diseño de sonrisa": {
    description: "Transformación estética completa de la sonrisa mediante la combinación de diferentes tratamientos para lograr armonía, proporción y belleza.",
    cost: "Desde $3,000 - $9,000 MXN",
    benefits: [
      "Sonrisa perfectamente diseñada",
      "Mejora la autoestima",
      "Resultados naturales y armoniosos",
      "Tratamiento personalizado",
      "Tecnología digital avanzada"
    ],
    recommendations: "Incluye estudio fotográfico, encerado diagnóstico y pruebas estéticas antes del tratamiento final."
  },
  "Tratamiento de ortodoncia": {
    description: "Corrección de la posición de los dientes y maxilares para mejorar la función masticatoria, estética y salud bucal general.",
    cost: "Desde $2,000 - $14,000 MXN",
    benefits: [
      "Dientes perfectamente alineados",
      "Mejora la función masticatoria",
      "Facilita la higiene bucal",
      "Mejora la estética facial",
      "Previene problemas futuros"
    ],
    recommendations: "Duración promedio de 18-24 meses. Requiere visitas mensuales y excelente higiene bucal durante el tratamiento."
  },
  "Alineadores y retenedor": {
    description: "Sistema de ortodoncia invisible mediante alineadores transparentes removibles, cómodos y prácticamente imperceptibles.",
    cost: "Desde $500 - $1,000 MXN",
    benefits: [
      "Prácticamente invisibles",
      "Removibles para comer y limpiar",
      "Mayor comodidad",
      "Menos visitas al dentista",
      "Resultados predecibles"
    ],
    recommendations: "Uso mínimo de 22 horas diarias. Cambio de alineadores cada 1-2 semanas según indicaciones."
  },
  "Trauma facial y dental": {
    description: "Atención de urgencia para lesiones dentales y faciales causadas por accidentes, golpes o traumatismos, restaurando función y estética.",
    cost: "Desde $2,500 - $6,000 MXN según severidad",
    benefits: [
      "Atención inmediata las 24 horas",
      "Preservación de dientes traumatizados",
      "Restauración estética completa",
      "Manejo del dolor eficaz",
      "Prevención de complicaciones"
    ],
    recommendations: "Buscar atención inmediata. En caso de diente avulsionado, mantenerlo en leche y acudir de urgencia."
  },
  "Endodoncia": {
    description: "Tratamiento del interior del diente cuando la pulpa está infectada o dañada, permitiendo conservar el diente natural evitando la extracción.",
    cost: "Desde $1,000 - $2,000 MXN",
    benefits: [
      "Conserva el diente natural",
      "Elimina el dolor e infección",
      "Alta tasa de éxito",
      "Procedimiento sin dolor",
      "Evita extracciones innecesarias"
    ],
    recommendations: "Fundamental colocar corona después del tratamiento para proteger el diente. Puede requerir 2-3 sesiones."
  },
  "Prótesis bucal": {
    description: "Rehabilitación oral mediante prótesis dentales parciales o totales, fijas o removibles, para restaurar función masticatoria y estética.",
    cost: "Desde $1,000 - $20,000 MXN",
    benefits: [
      "Restaura la función masticatoria",
      "Mejora la pronunciación",
      "Soporte facial adecuado",
      "Variedad de opciones",
      "Mejora la calidad de vida"
    ],
    recommendations: "Requiere período de adaptación. Mantenimiento y revisiones periódicas para asegurar buen ajuste."
  },
  "Patología": {
    description: "Diagnóstico y tratamiento de enfermedades que afectan los tejidos bucales mediante estudios clínicos, histopatológicos y de laboratorio.",
    cost: "Desde $1,000 - $10,000 MXN",
    benefits: [
      "Diagnóstico preciso de lesiones",
      "Detección temprana de patologías",
      "Tratamiento oportuno",
      "Prevención de complicaciones",
      "Tranquilidad y certeza diagnóstica"
    ],
    recommendations: "Incluye biopsia si es necesario. Seguimiento periódico según el diagnóstico establecido."
  }
};

// Inicializar modal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Elementos del modal
  const modal = document.getElementById('serviceModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalCost = document.getElementById('modalCost');
  const modalBenefits = document.getElementById('modalBenefits');
  const modalRecommendations = document.getElementById('modalRecommendations');
  const closeBtn = document.querySelector('.close');
  const agendarBtn = document.getElementById('agendarCitaBtn');

  // Agregar event listeners a todas las cards
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const serviceName = card.querySelector('h3').textContent;
      const serviceData = servicesData[serviceName];
      
      if (serviceData) {
        modalTitle.textContent = serviceName;
        modalDescription.textContent = serviceData.description;
        modalCost.textContent = serviceData.cost;
        modalRecommendations.textContent = serviceData.recommendations;
        
        // Llenar beneficios
        modalBenefits.innerHTML = '';
        serviceData.benefits.forEach(benefit => {
          const li = document.createElement('li');
          li.textContent = benefit;
          modalBenefits.appendChild(li);
        });
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevenir scroll
      }
    });
  });

  // Cerrar modal
  closeBtn.addEventListener('click', closeModal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Función para cerrar modal
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll
  }

  // Botón agendar cita
  agendarBtn.addEventListener('click', () => {
    closeModal();
    window.location.href = './citas.html';
  });

  // Cerrar modal con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
});
