/*MENU HAMBURGUESA*/
function toggleMenu() {
    let menu = document.getElementById("menu");
    menu.classList.toggle("mostrar");
}

let formularioH = document.getElementById("formulario");

formularioH.addEventListener("submit", function (e) {
    e.preventDefault();

    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var telefono = document.getElementById("telefono").value;
    var fechaIngVal = document.getElementById("fechaIng").value;
    var fechaEgrVal = document.getElementById("fechaEgr").value;
    var huespedes = document.getElementById("huespedes").value;

    let errores = [];

    if (nombre.length < 3) {
        errores.push("El nombre debe tener al menos 3 caracteres");
    }

    if (!email.includes("@") || !email.includes(".")) {
        errores.push("Ingrese un email válido");
    }

    if (!telefono || !/^\d+$/.test(telefono)) {
        errores.push("Ingrese un teléfono válido");
    }

    if (!fechaIngVal) {
        errores.push("Debe ingresar una fecha de ingreso");
    }

    if (!fechaEgrVal) {
        errores.push("Debe ingresar una fecha de egreso");
    }

    if (fechaIngVal && fechaEgrVal) {
        const fechaIng = new Date(fechaIngVal);
        const fechaEgr = new Date(fechaEgrVal);
        if (fechaIng >= fechaEgr) {
            errores.push("La fecha de egreso debe ser posterior a la fecha de ingreso");
        }
    }

    if (!huespedes || isNaN(huespedes) || huespedes < 1) {
        errores.push("Debe ingresar la cantidad de huéspedes (al menos 1)");
    }

    if (errores.length > 0) {
        alert(errores.join("\n"));
    } else {
        alert("Formulario válido, listo para enviar!");
    }
});


//Contacto
let formulario = document.getElementById("formC");
formulario.addEventListener("click", function () {

    let nombre = document.getElementById("nombrecontacto").value;
    let email = document.getElementById("emailcontacto").value;
    let mensaje = document.getElementById("mensaje").value;
    let errores = [];
    alert("Entre");

    if (nombre.length < 3) {
        errores.push("Ingrese un nombre válido");
    }
    if (!(email.endsWith(".com"))) {
        errores.push("Ingrese un email válido");
    }
    if (!mensaje) {
        errores.push("Ingrese un mensaje");
    }

    if (errores.length > 0) {
        alert(errores.join("\n"));
    }
}
);
fetch('hotel.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("No se pudo cargar el archivo hotel.json");
        }
        return response.json();
    })
    .then(data => {
        console.log(data.nombre);
    })
    .catch(error => {
        console.error(error);
    });