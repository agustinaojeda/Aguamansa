/*MENU HAMBURGUESA*/
function toggleMenu() {
    let menu = document.getElementById("menu");
    menu.classList.toggle("mostrar");
}

//Contacto
let formulario = document.getElementById("formCds");
formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    let nombre = document.getElementById("nombrecontacto").value;
    let email = document.getElementById("emailcontacto").value;
    let mensaje = document.getElementById("mensaje").value;
    let errores = [];

    if (nombre.length < 3 || !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(nombre)) {
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
    } else {
        alert(`¡Gracias, ${nombre}! Hemos recibido tu mensaje y te responderemos pronto.`)
        formulario.reset();
    }
}
);
