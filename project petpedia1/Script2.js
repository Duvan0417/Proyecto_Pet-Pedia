// Selecciona la barra lateral, el contenido principal y la barra de navegación
const sidebar = document.querySelector('.sidebar'); 
// Selecciona el elemento con la clase 'sidebar'.

const mainContent = document.querySelector('.main-content'); 
// Selecciona el elemento con la clase 'main-content'.

const navbar = document.querySelector('.navbar'); 
// Selecciona el elemento con la clase 'navbar'.

// Agrega un evento que se ejecuta cuando el contenido del documento HTML ha sido completamente cargado y analizado
document.addEventListener("DOMContentLoaded", function() {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    // Intenta recuperar los productos del almacenamiento local. 
    // Si no hay datos, inicializa productos como un arreglo vacío.

    let contenedor = document.querySelector(".container-fluid .row");
    // Selecciona el contenedor donde se mostrarán los productos.

    function mostrarProductos() {
        // Define una función para mostrar los productos en el contenedor.

        contenedor.innerHTML = ""; 
        // Limpia el contenido del contenedor antes de mostrar los productos.

        productos.forEach((producto, index) => {
            // Itera sobre cada producto en el arreglo productos.

            let card = document.createElement("div");
            // Crea un nuevo div para representar una tarjeta de producto.

            card.classList.add("col-md-3", "col-sm-6", "mb-4");
            // Asigna clases para el diseño responsivo y el margen inferior.

            card.innerHTML = `
                <div class="pet-card">
                    <img src="${producto.imageUrl || 'https://via.placeholder.com/400x200'}" alt="${producto.name}" class="pet-image">
                    <div class="pet-info">
                        <h3 class="pet-name">${producto.name}</h3>
                        <p class="pet-description">${producto.description}</p>
                        <p><strong>Precio:</strong> $${producto.price}</p>
                        <button class="btn-action flex-grow-1" onclick="agregarAlCarrito(${index})">
                            Agregar <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
            `;
            // Establece el contenido HTML de la tarjeta, incluyendo la imagen, nombre, descripción, precio y un botón para agregar al carrito.

            contenedor.appendChild(card);
            // Añade la tarjeta al contenedor.
        });
    }

    window.agregarAlCarrito = function(index) {
        // Define una función global para agregar un producto al carrito.

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        // Intenta recuperar el carrito del almacenamiento local. 
        // Si no hay datos, inicializa carrito como un arreglo vacío.

        let producto = productos[index];
        // Obtiene el producto correspondiente al índice proporcionado.

        if (producto) {
            // Verifica que el producto existe.

            let existe = carrito.find(item => item.name === producto.name);
            // Busca si el producto ya está en el carrito.

            if (existe) {
                existe.quantity++;
                // Si existe, incrementa la cantidad.
            } else {
                carrito.push({ ...producto, quantity: 1 });
                // Si no existe, agrega el producto al carrito con cantidad 1.
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));
            // Guarda el carrito actualizado en el almacenamiento local.

            alert("Producto agregado al carrito");
            // Muestra un mensaje de alerta indicando que el producto ha sido agregado.
        } else {
            console.error("El producto no existe o el índice es incorrecto.");
            // Muestra un error en la consola si el producto no existe.
        }
    };

    mostrarProductos();
    // Llama a la función mostrarProductos para mostrar los productos al cargar la página.
});
