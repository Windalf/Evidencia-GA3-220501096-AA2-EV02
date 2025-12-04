// ---------------------------
// FUNCIONES DE UTILIDAD
// ---------------------------

function guardarUsuario(usuario) {
    localStorage.setItem("usuarioRegistrado", JSON.stringify(usuario));
}

function obtenerUsuario() {
    return JSON.parse(localStorage.getItem("usuarioRegistrado"));
}

function guardarSesion(usuario) {
    localStorage.setItem("usuarioSesion", usuario);
}

function obtenerSesion() {
    return localStorage.getItem("usuarioSesion");
}

function cerrarSesion() {
    localStorage.removeItem("usuarioSesion");
}

function desconectar() {
    cerrarSesion();
    window.location.href = "index.html";
}

// ---------------------------
// REGISTRO
// ---------------------------

if (document.getElementById("formularioRegistro")) {
    document.getElementById("formularioRegistro").addEventListener("submit", function(e) {
        e.preventDefault();

        let usuario = {
            nombreCompleto: document.getElementById("nombreCompleto").value,
            direccion: document.getElementById("direccion").value,
            documento: document.getElementById("documento").value,
            correo: document.getElementById("correo").value,
            telefono: document.getElementById("telefono").value,
            usuario: document.getElementById("nuevoUsuario").value,
            clave: document.getElementById("nuevaClave").value
        };

        let clave2 = document.getElementById("confirmarClave").value;

        if (usuario.clave !== clave2) {
            alert("Las contraseñas no coinciden");
            return;
        }

        guardarUsuario(usuario);

        alert("Registro exitoso, ahora ingresa con tu usuario y contraseña.");

        window.location.href = "index.html";
    });
}

// ---------------------------
// INICIO DE SESIÓN
// ---------------------------

if (document.getElementById("formularioInicio")) {
    document.getElementById("formularioInicio").addEventListener("submit", function(e) {
        e.preventDefault();

        let usuarioIngresado = document.getElementById("usuario").value;
        let claveIngresada = document.getElementById("clave").value;

        let usuario = obtenerUsuario();

        if (!usuario) {
            alert("No existe ningún usuario registrado.");
            return;
        }

        if (usuario.usuario === usuarioIngresado && usuario.clave === claveIngresada) {
            guardarSesion(usuario.usuario);
            window.location.href = "mascotas.html";
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    });
}

// ---------------------------
// LISTA DE MASCOTAS
// ---------------------------

const mascotas = [
    { nombre: "Luna", descripcion: "Perra cariñosa y tranquila.", imagen: "img//perro1.jpg" },
    { nombre: "Max", descripcion: "Perro juguetón y energético.", imagen: "img//perro3.jpg" },
    { nombre: "Michi", descripcion: "Gato dormilón y curioso.", imagen: "img//gato1.jpg" },
    { nombre: "Rocky", descripcion: "Perro guardián, muy noble.", imagen: "img//perro2.jpg" },
    { nombre: "Nieve", descripcion: "Gatita alegre y sociable.", imagen: "img//gato2.jpg" }
];

if (document.getElementById("listaMascotas")) {
    let lista = document.getElementById("listaMascotas");

    mascotas.forEach((m, i) => {
        let div = document.createElement("div");
        div.className = "mascota";

        div.innerHTML = `
        <img src="${m.imagen}" alt="${m.nombre}">
        <h3>${m.nombre}</h3>
        <p>${m.descripcion}</p>
        <button onclick="seleccionarMascota(${i})">Adoptar</button>
        `;

        lista.appendChild(div);
    });
}

function seleccionarMascota(indice) {
    localStorage.setItem("mascotaSeleccionada", JSON.stringify(mascotas[indice]));
    window.location.href = "confirmar.html";
}

// ---------------------------
// CONFIRMAR ADOPCIÓN
// ---------------------------

if (document.getElementById("infoMascota")) {
    let mascota = JSON.parse(localStorage.getItem("mascotaSeleccionada"));
    let div = document.getElementById("infoMascota");

    div.innerHTML = `
        <img src="${mascota.imagen}" alt="${mascota.nombre}"style="width: 260px; height: 180px; object-fit: cover; display: block; margin: 0 auto; border-radius: 12px;">
        <h2>${mascota.nombre}</h2>
        <p>${mascota.descripcion}</p>
    `;
}

function confirmarAdopcion() {
    window.location.href = "gracias.html";
}

function cancelarAdopcion() {
    window.location.href = "mascotas.html";
}

// ---------------------------
// PANTALLA DE AGRADECIMIENTO
// ---------------------------

if (document.getElementById("mensajeAgradecimiento")) {
    let usuario = obtenerUsuario();
    let mascota = JSON.parse(localStorage.getItem("mascotaSeleccionada"));

    document.getElementById("mensajeAgradecimiento").innerText =
        `Gracias ${usuario.nombreCompleto} por darle un nuevo hogar a ${mascota.nombre}.`;

    setTimeout(() => {
        window.location.href = "index.html";
    }, 4000);
}
