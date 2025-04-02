// Función para mostrar la imagen seleccionada en la vista previa
function mostrarImagen(event) {  
    let input = event.target; // Obtiene el elemento input que activó el evento
    let vistaPrevia = document.getElementById("vistaPrevia"); // Obtiene el elemento donde se mostrará la imagen

    if (input.files && input.files[0]) { // Verifica que haya un archivo seleccionado
        let reader = new FileReader(); // Crea un objeto FileReader para leer el archivo

        reader.onload = function(e) { // Cuando la imagen esté cargada
            vistaPrevia.src = e.target.result; // Asigna la imagen cargada a la vista previa
            vistaPrevia.style.display = "block"; // Muestra la imagen
        }
        reader.readAsDataURL(input.files[0]); // Lee el archivo como una URL de datos
    }
}

// Función para guardar los datos de una veterinaria
function guardarVeterinaria() {
    let nombre = document.getElementById("nombre").value; // Obtiene el valor del campo nombre
    let descripcion = document.getElementById("descripcion").value; // Obtiene el valor del campo descripción
    let horario = document.getElementById("horario").value; // Obtiene el valor del campo horario
    let vistaPrevia = document.getElementById("vistaPrevia"); // Obtiene la vista previa de la imagen

    // Verifica que todos los campos obligatorios estén llenos
    if (!nombre || !descripcion || !horario) {
        alert("Por favor completa todos los campos."); // Muestra una alerta si falta información
        return; // Detiene la ejecución de la función
    }

    let veterinarias = JSON.parse(localStorage.getItem("veterinarias")) || []; // Recupera las veterinarias guardadas o crea un array vacío si no hay ninguna

    // Crea un objeto con la información ingresada
    let nuevaVeterinaria = {
        nombre,
        descripcion,
        horario,
        imagen: vistaPrevia.src && vistaPrevia.src !== "#" ? vistaPrevia.src : "" // Guarda la imagen si está definida
    };

    veterinarias.push(nuevaVeterinaria); // Agrega la nueva veterinaria al array
    localStorage.setItem("veterinarias", JSON.stringify(veterinarias)); // Guarda la lista actualizada en localStorage

    alert("Veterinaria guardada correctamente."); // Muestra un mensaje de éxito
}

// Asociar la función al botón de guardar
document.getElementById("guardarBtn").addEventListener("click", guardarVeterinaria);

// Función para mostrar la lista de veterinarias guardadas
function verListaVeterinarias() {
    let veterinarias = JSON.parse(localStorage.getItem("veterinarias")) || []; // Recupera las veterinarias guardadas

    if (veterinarias.length === 0) { // Si no hay veterinarias guardadas
        alert("No hay veterinarias guardadas."); // Muestra un mensaje
        return;
    }

    let lista = "Veterinarias Guardadas:\n"; // Inicia la lista

    veterinarias.forEach((vet, index) => { // Recorre la lista de veterinarias
        lista += `${index + 1}. ${vet.nombre} - ${vet.horario}\n`; // Agrega cada veterinaria a la lista
    });

    alert(lista); // Muestra la lista en una alerta
}

// Función para redirigir a otra página
function irAIndex3() {
    window.location.href = "index3.html"; // Redirige a index3.html
}
