// Selecciona la barra lateral, el contenido principal y la barra de navegación
const sidebar = document.querySelector('.sidebar'); // Selecciona el elemento con la clase 'sidebar'
const mainContent = document.querySelector('.main-content'); // Selecciona el elemento con la clase 'main-content'
const navbar = document.querySelector('.navbar'); // Selecciona el elemento con la clase 'navbar'

// Agrega un evento de 'mouseover' al documento
document.addEventListener('mouseover', (event) => {
    // Verifica si el ratón está sobre la barra lateral
    if (sidebar.contains(event.target)) {
        sidebar.classList.add('active'); // Añade la clase 'active' a la barra lateral
        mainContent.classList.add('sidebar-active'); // Añade la clase 'sidebar-active' al contenido principal
    } 
    // Verifica si el ratón no está sobre la barra de navegación
    else if (!navbar.contains(event.target)) { 
        sidebar.classList.remove('active'); // Elimina la clase 'active' de la barra lateral
        mainContent.classList.remove('sidebar-active'); // Elimina la clase 'sidebar-active' del contenido principal
    }
});


document.addEventListener("DOMContentLoaded", function () {
    let contenedor = document.querySelector(".container-fluid .row");
    let veterinarias = JSON.parse(localStorage.getItem("veterinarias")) || [];

    console.log("Veterinarias en localStorage:", veterinarias); // Verificar si los datos se están cargando

    function mostrarVeterinarias() {
        contenedor.innerHTML = ""; // Limpia el contenedor antes de mostrar los datos

        if (veterinarias.length === 0) {
            contenedor.innerHTML = "<p>No hay veterinarias registradas.</p>";
            return;
        }

        veterinarias.forEach((vet) => {
            let card = document.createElement("div");
            card.classList.add("col-md-4", "col-sm-6", "mb-4");
            card.innerHTML = `
                <div class="pet-card">
                    ${vet.imagen ? `<img src="${vet.imagen}" class="pet-image" alt="Veterinaria">` : ""}
                    <div class="pet-info">
                        <h3 class="pet-name">${vet.nombre}</h3>
                        <p class="pet-description">${vet.descripcion}</p>
                        <p><strong>Horario:</strong> ${vet.horario}</p>
                        <button class="btn-action btn-delete" onclick="eliminarVeterinaria('${vet.nombre}')">Eliminar</button>
                    </div>
                </div>
            `;
            contenedor.appendChild(card);
        });
    }

    mostrarVeterinarias();
});

// Función para eliminar una veterinaria
function eliminarVeterinaria(nombre) {
    let veterinarias = JSON.parse(localStorage.getItem("veterinarias")) || [];
    let nuevasVeterinarias = veterinarias.filter(vet => vet.nombre !== nombre);
    localStorage.setItem("veterinarias", JSON.stringify(nuevasVeterinarias));
    location.reload(); // Recargar la página para actualizar la lista
}
document.addEventListener("DOMContentLoaded", function () {
    mostrarVeterinarias(); // Asegura que se cargan los datos guardados en index5
});







