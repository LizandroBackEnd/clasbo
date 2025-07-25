document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendario');
    const horaSelect = document.getElementById('hora');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        selectable: true,
        validRange: {
            start: new Date().toISOString().split("T")[0]
        },

        dateClick: function (info) {
            const fecha = new Date(info.dateStr);
            const diaSemana = fecha.getUTCDay(); // 0 = Domingo

            if (diaSemana === 0) {
                alert("Lo sentimos, no hay citas los domingos.");
                return;
            }

            // Mostrar formulario
            document.getElementById('fechaSeleccionada').textContent = info.dateStr;
            document.getElementById('fecha').value = info.dateStr;
            document.getElementById('formulario-cita').style.display = 'block';
            document.getElementById('formulario-cita').scrollIntoView({ behavior: 'smooth' });

            
            horaSelect.innerHTML = '<option value="">Selecciona una hora</option>';
            const horas = generarHorasDisponibles();
            horas.forEach(hora => {
                const option = document.createElement('option');
                option.value = hora;
                option.textContent = hora;
                horaSelect.appendChild(option);
            });
        }
    });

    calendar.render();

    function generarHorasDisponibles() {
        const horas = [];
        const inicio = 9;
        const fin = 18;

        for (let h = inicio; h < fin; h++) {
            const hora = h.toString().padStart(2, '0') + ':00';
            const media = h.toString().padStart(2, '0') + ':30';
            horas.push(hora, media);
        }

        return horas;
    }
});