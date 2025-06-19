const id = new URLSearchParams(window.location.search).get("id");

fetch("hotel.json")
  .then((res) => res.json())
  .then((habs) => {
    const habitacion = habs.find((h) => h.id === id);

    if (!habitacion) {
      document.getElementById("carouselContainer").innerHTML = "";
      document.getElementById("infoContainer").style.display = "none";
      document.body.insertAdjacentHTML("beforeend", `
        <p class='text-center text-danger mt-5'>Habitación no encontrada</p>
      `);
      return;
    }

    //Carrusel
    const imagenes = [
      habitacion.imagen1,
      habitacion.imagen2 + "&1",
      habitacion.imagen3 + "&2",
    ];

    let html = "";

    for (let i = 0; i < imagenes.length; i++) {
      let img = imagenes[i];
      let activeClass = i === 0 ? "active" : "";

      html += `
    <div class="carousel-item ${activeClass}">
      <img src="${img}" class="d-block carrusel-img1 mx-auto"  />
    </div>
  `;
    }

    document.getElementById("carouselInner").innerHTML = html;


    // Detalle de la habitacion
    document.getElementById("tituloHabitacion").innerText = habitacion.nombre;
    document.getElementById("infoHabitacion").innerHTML = `
      <p>${habitacion.detalles}</p>
      <p><strong>Capacidad:</strong> ${habitacion.capacidad}</p>
      <p><strong>Cama:</strong> ${habitacion.cama}</p>
      <p><strong>Medida:</strong> ${habitacion.medida}</p>
    `;

    // Validación del formulario 
    const formularioH = document.getElementById("formulario");

    formularioH.addEventListener("submit", function (e) {
      e.preventDefault();

      let nombre = document.getElementById("nombre").value.trim();
      let email = document.getElementById("email").value.trim();
      let telefono = document.getElementById("telefono").value.trim();
      let fechaIngVal = document.getElementById("fechaIng").value;
      let fechaEgrVal = document.getElementById("fechaEgr").value;
      let huespedes = document.getElementById("huespedes").value;

      let errores = [];

      if (nombre.length < 3 || !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(nombre)) errores.push("Ingrese un nombre válido");
      if (!email.includes("@") || !email.includes(".com")) errores.push("Ingrese un email válido");
      if (!telefono || !/^\d+$/.test(telefono)) errores.push("Ingrese un teléfono válido");
      if (!fechaIngVal) errores.push("Debe ingresar una fecha de ingreso");
      if (!fechaEgrVal) errores.push("Debe ingresar una fecha de egreso");

      if (fechaIngVal && fechaEgrVal) {
        let fechaIng = new Date(fechaIngVal);
        let fechaEgr = new Date(fechaEgrVal);
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


