let todasLasHabitaciones = [];

// Función para renderizar habitaciones en la grilla
function mostrarHabitaciones(habitaciones) {
    const container = document.getElementById("container1");
    container.innerHTML = ""; // Limpiar contenido anterior

    habitaciones.forEach((habitacion) => {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-4";

        col.innerHTML = `
    <div class="card h-100 shadow-sm" style="cursor: pointer;" onclick="window.location.href='detalle.html?id=${habitacion.id
            }'">
        <img src="${habitacion.imagen1}" class="card-img-top" alt="${habitacion.nombre
            }" style="height: 200px; object-fit: cover;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${habitacion.nombre}</h5>
          <p class="card-text mb-1"><strong>Capacidad:</strong> ${habitacion.capacidad || habitacion.cantidad
            }</p>
          <p class="card-text mb-1"><strong>Cama:</strong> ${habitacion.cama
            }</p>
          <p class="card-text mb-1"><strong>Medida:</strong> ${habitacion.medida
            }</p>
        </div>
      </div>
      
    `;
        container.appendChild(col);
    });
}

// Cargar JSON y mostrar todo al inicio
fetch("hotel.json")
    .then((response) => {
        if (!response.ok) throw new Error("Error al cargar habitaciones");
        return response.json();
    })
    .then((data) => {
        todasLasHabitaciones = data;
        mostrarHabitaciones(todasLasHabitaciones);
    })
    .catch((error) => {
        console.error("Error:", error);
    });

// Filtrar habitaciones por tipo (capacidad o cantidad)
document.querySelector(".form-filtro").addEventListener("change", (e) => {
    const filtro = e.target.value;

    if (filtro === "todas") {
        mostrarHabitaciones(todasLasHabitaciones);
    } else {
        const filtradas = todasLasHabitaciones.filter(
            (habitacion) =>
                (habitacion.capacidad &&
                    habitacion.capacidad.toLowerCase() === filtro) ||
                (habitacion.cantidad &&
                    habitacion.cantidad.toLowerCase() === filtro)
        );
        mostrarHabitaciones(filtradas);
    }
});