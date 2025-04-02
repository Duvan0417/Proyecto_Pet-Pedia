// Al hacer clic en el botón con ID "uploadBtn", activa el input de tipo archivo con ID "image"
document.getElementById("uploadBtn").addEventListener("click", function() {
    document.getElementById("image").click();
    // Simula un clic en el input de tipo archivo para abrir el selector de archivos.
});

// Cuando el usuario selecciona un archivo, se actualiza el texto con el nombre del archivo seleccionado
document.getElementById("image").addEventListener("change", function() {
    let fileName = this.files.length > 0 ? this.files[0].name : "Ningún archivo seleccionado";
    // Verifica si se ha seleccionado un archivo y obtiene su nombre, o muestra un mensaje predeterminado.

    document.getElementById("fileName").innerText = fileName;
    // Actualiza el texto del elemento con ID "fileName" para mostrar el nombre del archivo seleccionado.
});

// Maneja el envío del formulario y guarda los datos en localStorage
document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault();
    // Previene el comportamiento predeterminado del formulario (recarga de página).

    // Obtener valores del formulario
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let description = document.getElementById("description").value;
    let imageInput = document.getElementById("image");
    let imageUrl = "";

    // Si hay una imagen seleccionada, convertirla a base64
    if (imageInput.files && imageInput.files[0]) {
        // Verifica si hay archivos seleccionados en el input de imagen.

        let reader = new FileReader();
        // Crea un nuevo FileReader para leer el archivo.

        reader.onload = function(e) {
            imageUrl = e.target.result;
            // Al finalizar la lectura, guarda el resultado (imagen en base64) en imageUrl.

            guardarProducto(name, price, description, imageUrl);
            // Llama a la función guardarProducto con los datos del formulario y la imagen.
        };
        reader.readAsDataURL(imageInput.files[0]);
        // Lee el archivo seleccionado como una URL de datos (base64).
    } else {
        guardarProducto(name, price, description, "");
        // Si no hay imagen, llama a guardarProducto con una cadena vacía para imageUrl.
    }
});

// Guarda los productos en localStorage
function guardarProducto(name, price, description, imageUrl) {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    // Intenta recuperar los productos del almacenamiento local. 
    // Si no hay datos, inicializa productos como un arreglo vacío.

    productos.push({ name, price, description, imageUrl });
    // Agrega un nuevo objeto producto al arreglo productos.

    localStorage.setItem("productos", JSON.stringify(productos));
    // Guarda el arreglo actualizado en el almacenamiento local como una cadena JSON.

    alert("Producto guardado correctamente!");
    // Muestra un mensaje de alerta indicando que el producto ha sido guardado.
}

// Al cargar el contenido del documento, configura el evento para el botón de ver productos
document.addEventListener("DOMContentLoaded", function() {
    let btnVerProductos = document.getElementById("verProductos");
    // Selecciona el botón con ID "verProductos".

    if (btnVerProductos) {
        // Verifica si el botón existe en el DOM.

        btnVerProductos.addEventListener("click", function() {
            window.location.href = "index2.html";
            // Redirige al usuario a "index2.html" al hacer clic en el botón.
        });
    }
});
