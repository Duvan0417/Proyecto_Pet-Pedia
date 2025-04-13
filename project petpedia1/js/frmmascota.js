// Evento que captura cuando el usuario envía el formulario
document.getElementById('formMascota').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que la página se recargue

    // Obtener valores del formulario
    let nombre = document.getElementById('nombre').value;
    let edad = document.getElementById('edad').value;
    let raza = document.getElementById('raza').value;
    let tipo = document.getElementById('tipo').value;
    let sexo = document.getElementById('sexo').value;
    let descripcion = document.getElementById('descripcion').value;
    let fotoInput = document.getElementById('foto');
    let fotoURL = "";

    // Verificar si el usuario seleccionó una imagen
    if (fotoInput.files.length > 0) {
        let reader = new FileReader();
        reader.onload = function(e) {
            fotoURL = e.target.result; // Convertir imagen a base64
            agregarMascota(nombre, edad, raza, tipo, sexo, descripcion, fotoURL);
        };
        reader.readAsDataURL(fotoInput.files[0]); // Leer archivo de imagen
    } else {
        agregarMascota(nombre, edad, raza, tipo, sexo, descripcion, fotoURL);
    }

    this.reset(); // Limpiar el formulario después de enviar
});

// Función para agregar una nueva mascota a la lista
function agregarMascota(nombre, edad, raza, tipo, sexo, descripcion, fotoURL) {
    let mascotas = JSON.parse(localStorage.getItem("mascotas")) || [];

    let nuevaMascota = {
        nombre,
        edad,
        raza,
        tipo,
        sexo,
        descripcion,
        fotoURL
    };

    mascotas.push(nuevaMascota);
    localStorage.setItem("mascotas", JSON.stringify(mascotas));
}

// Función para eliminar una mascota
function eliminarMascota(boton) {
    boton.parentElement.parentElement.remove(); // Elimina la tarjeta completa
}

// Función para editar el nombre de la mascota
function editarMascota(boton) {
    let tarjeta = boton.parentElement.parentElement;
    let nombre = prompt("Nuevo nombre:", tarjeta.querySelector('h3').textContent);
    if (nombre) {
        tarjeta.querySelector('h3').textContent = nombre; // Actualiza el nombre en la tarjeta
    }
}
function irAIndex1() {
    window.location.href = "index1.html"; // Redirige a la página donde se mostrarán las mascotas
}
