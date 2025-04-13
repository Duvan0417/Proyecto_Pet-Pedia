// Al hacer clic en el botón con ID "uploadBtn", activa el input de tipo archivo con ID "image"
document.getElementById("uploadBtn").addEventListener("click", function() {
    // Simula un clic en el input de tipo archivo para abrir el selector de archivos
    document.getElementById("image").click();
});

// Cuando el usuario selecciona un archivo, se actualiza el texto con el nombre del archivo seleccionado
document.getElementById("image").addEventListener("change", function() {
    // Verifica si hay archivos seleccionados y obtiene el nombre del primer archivo
    let fileName = this.files.length > 0 ? this.files[0].name : "Ningún archivo seleccionado";
    // Actualiza el texto del elemento con ID "fileName" con el nombre del archivo
    document.getElementById("fileName").innerText = fileName;
});

// Maneja el envío del formulario y guarda los datos en localStorage
document.getElementById("productForm").addEventListener("submit", function(event) {
    // Previene el comportamiento por defecto del formulario (recargar la página)
    event.preventDefault();

    // Obtener valores del formulario
    let name = document.getElementById("name").value; // Obtiene el valor del campo "name"
    let price = document.getElementById("price").value; // Obtiene el valor del campo "price"
    let description = document.getElementById("description").value; // Obtiene el valor del campo "description"
    let imageInput = document.getElementById("image"); // Referencia al input de tipo archivo
    let imageUrl = ""; // Inicializa la variable para almacenar la URL de la imagen

    // Si hay una imagen seleccionada, convertirla a base64
    if (imageInput.files && imageInput.files[0]) {
        let reader = new FileReader(); // Crea un nuevo objeto FileReader
        reader.onload = function(e) {
            // Cuando la lectura del archivo se complete, se obtiene el resultado
            imageUrl = e.target.result; // Asigna la URL de la imagen en base64
            guardarProducto(name, price, description, imageUrl); // Llama a la función para guardar el producto
        };
        reader.readAsDataURL(imageInput.files[0]); // Lee el archivo como una URL de datos
    } else {
        // Si no hay imagen seleccionada, llama a la función sin URL de imagen
        guardarProducto(name, price, description, "");
    }
});

// Guarda los productos en localStorage
function guardarProducto(name, price, description, imageUrl) {
    // Recupera la lista de productos del localStorage o inicializa un arreglo vacío
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    // Agrega el nuevo producto al arreglo
    productos.push({ name, price, description, imageUrl });
    // Guarda el arreglo actualizado en el localStorage
    localStorage.setItem("productos", JSON.stringify(productos));

    // Muestra un mensaje de alerta indicando que el producto se ha guardado
    alert("Producto guardado correctamente!");
}

// Espera a que el contenido del documento esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    let btnVerProductos = document.getElementById("verProductos"); // Referencia al botón "verProductos"
    if (btnVerProductos) {
        // Si el botón existe, agrega un evento click
        btnVerProductos.addEventListener("click", function() {
            // Redirige a la página "index2.html" al hacer clic en el botón
            window.location.href = "index2.html";
        });
    }
});
