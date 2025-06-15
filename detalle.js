function toggleMenu() {
  let menu = document.getElementById("menu");
  menu.classList.toggle("mostrar");
}

const id = new URLSearchParams(window.location.search).get("id");

fetch("hotel.json")
  .then((res) => res.json())
  .then((habs) => {
    const habitacion = habs.find((h) => h.id === id);

    if (!habitacion) {
      document.body.innerHTML =
        "<p class='text-center text-danger mt-5'>Habitación no encontrada</p>";
      return;
    }

    const imagenes = [
      habitacion.imagen1,
      habitacion.imagen2 + "&1",
      habitacion.imagen3 + "&2",
    ];

    //Carrusel
    document.getElementById("carouselContainer").innerHTML = `
        <div id="carouselHotel" class="carousel slide carrusel" data-bs-ride="carousel">
          <div class="carousel-inner">
            ${imagenes.map((img, i) => `
              <div class="carousel-item ${i === 0 ? "active" : ""}">
                <img src="${img}" class="d-block carrusel-img1 mx-auto" alt="Habitación ${i + 1}" />
              </div>
            `
    ).join("")}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselHotel" data-bs-slide="prev">
            <div class="carousel-control-prev-icon" aria-hidden="true"></div>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselHotel" data-bs-slide="next">
            <div class="carousel-control-next-icon" aria-hidden="true"></div>
          </button>
        </div>
        `;

    document.getElementById("infoContainer").innerHTML = `
          <div class="row">
            <div class="col-12">
              <h1 class="titulo">${habitacion.nombre}</h1>
            </div>
          </div>
          <!--Detalle-->
          <div class="row justify-content-center">
            <div class="col-sm-6">
              <p>${habitacion.detalles}</p>
              <p><strong>Capacidad:</strong> ${habitacion.capacidad || habitacion.cantidad}</p>
              <p><strong>Cama:</strong> ${habitacion.cama}</p>
              <p><strong>Medida:</strong> ${habitacion.medida}</p>
            </div>
            <div class="col-sm-1"></div>

            <!--Formulario-->
            <div class="col-sm-5">
              <h5>¿Te interesa? Consultá si está disponible</h5>
              <form id="formulario">
                <div class="mb-3">
                  <label for="nombre" class="form-label">Nombre y apellido</label>
                  <input type="text" class="form-control" id="nombre" required minlength="3" maxlength="40" />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control" id="email" required />
                </div>
                <div class="mb-3">
                  <label for="telefono" class="form-label">Teléfono</label>
                  <input type="tel" class="form-control" id="telefono" required minlength="10" />
                </div>
                <div class="mb-3">
                  <label for="fechaIng" class="form-label">Fecha de ingreso</label>
                  <input type="date" class="form-control" id="fechaIng" min="2025-06-12" required />
                </div>
                <div class="mb-3">
                  <label for="fechaEgr" class="form-label">Fecha de egreso</label>
                  <input type="date" class="form-control" id="fechaEgr" max="2026-06-12" required />
                </div>
                <div class="mb-3">
                  <label for="huespedes" class="form-label">Cantidad de huéspedes</label>
                  <input type="number" min="1" max="10" class="form-control" id="huespedes" required />
                </div>
                <div class="text-end">
                  <button type="submit" class="btn btn-dark">Consultar disponibilidad</button>
                </div>
              </form>
            </div>
          </div>
        `;

    //Validacion formulario
    const formularioH = document.getElementById("formulario");

    formularioH.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const email = document.getElementById("email").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const fechaIngVal = document.getElementById("fechaIng").value;
      const fechaEgrVal = document.getElementById("fechaEgr").value;
      const huespedes = document.getElementById("huespedes").value;

      let errores = [];

      if (nombre.length < 3 || !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(nombre)) errores.push("El nombre debe tener al menos 3 caracteres");
      if (!email.includes("@") || !email.includes(".com")) errores.push("Ingrese un email válido");
      if (!telefono || !/^\d+$/.test(telefono)) errores.push("Ingrese un teléfono válido");
      if (!fechaIngVal) errores.push("Debe ingresar una fecha de ingreso");
      if (!fechaEgrVal) errores.push("Debe ingresar una fecha de egreso");

      if (fechaIngVal && fechaEgrVal) {
        const fechaIng = new Date(fechaIngVal);
        const fechaEgr = new Date(fechaEgrVal);
        if (fechaIng >= fechaEgr) errores.push("La fecha de egreso debe ser posterior a la fecha de ingreso");
      }

      if (!huespedes || isNaN(huespedes) || huespedes < 1) {
        errores.push("Debe ingresar al menos 1 huésped");
      }

      if (errores.length > 0) {
        alert(errores.join("\n"));
      } else {
        alert(`¡Gracias, ${nombre}! Te contactaremos pronto al ${telefono} o al correo ${email}.`);
        formularioH.reset();

      }
    });
  });

