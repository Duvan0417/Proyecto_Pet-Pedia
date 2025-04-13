document.addEventListener("DOMContentLoaded", function() {
    // Se ejecuta cuando el contenido del documento HTML ha sido completamente cargado y analizado.

    let cart = JSON.parse(localStorage.getItem("carrito")) || [];
    // Intenta recuperar el carrito de compras del almacenamiento local. 
    // Si no hay datos, inicializa cart como un arreglo vacío.

    let total = 0;
    // Inicializa la variable total a 0 para calcular el precio total de los artículos en el carrito.

    function updateCart() {
        // Define una función para actualizar la visualización del carrito y el total.
        
        const cartList = document.getElementById('cart');
        // Obtiene el elemento del DOM con el ID 'cart'.

        cartList.innerHTML = "";
        // Limpia el contenido del elemento cartList.

        total = 0;
        // Reinicia el total a 0 antes de recalcularlo.

        cart.forEach((item, index) => {
            // Itera sobre cada artículo en el carrito.

            const li = document.createElement('li');
            // Crea un nuevo elemento de lista para representar el artículo.

            li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
            // Establece el texto del elemento li para mostrar el nombre, precio y cantidad del artículo.

            const controls = document.createElement('div');
            // Crea un nuevo div que contendrá los controles para modificar la cantidad.

            controls.className = 'quantity-controls';
            // Asigna la clase 'quantity-controls' al div para aplicar estilos.

            const increaseButton = document.createElement('button');
            // Crea un nuevo botón para aumentar la cantidad del artículo.

            increaseButton.textContent = '+';
            // Establece el texto del botón de aumento a '+'.

            increaseButton.onclick = () => increaseQuantity(index);
            // Asigna una función al evento onclick del botón que llama a increaseQuantity con el índice del artículo.

            const decreaseButton = document.createElement('button');
            // Crea un nuevo botón para disminuir la cantidad del artículo.

            decreaseButton.textContent = '-';
            // Establece el texto del botón de disminución a '-'.

            decreaseButton.onclick = () => decreaseQuantity(index);
            // Asigna una función al evento onclick del botón que llama a decreaseQuantity con el índice del artículo.

            const removeButton = document.createElement('button');
            // Crea un nuevo botón para eliminar el artículo del carrito.

            removeButton.textContent = 'Eliminar';
            // Establece el texto del botón de eliminación a 'Eliminar'.

            removeButton.style.backgroundColor = '#dc3545';
            // Cambia el color de fondo del botón de eliminación a rojo.

            removeButton.onclick = () => removeFromCart(index);
            // Asigna una función al evento onclick del botón que llama a removeFromCart con el índice del artículo.

            controls.appendChild(decreaseButton);
            // Añade el botón de disminución al div de controles.

            controls.appendChild(increaseButton);
            // Añade el botón de aumento al div de controles.

            controls.appendChild(removeButton);
            // Añade el botón de eliminación al div de controles.

            li.appendChild(controls);
            // Añade el div de controles al elemento li.

            cartList.appendChild(li);
            // Añade el elemento li (artículo y controles) al cartList.

            total += item.price * item.quantity;
            // Actualiza el total sumando el precio del artículo multiplicado por su cantidad.
        });

        document.getElementById('total').textContent = `Total: $${total}`;
        // Actualiza el contenido del elemento con el ID 'total' para mostrar el total calculado.

        localStorage.setItem("carrito", JSON.stringify(cart)); // Guarda cambios
        // Guarda el carrito actualizado en el almacenamiento local como una cadena JSON.
    }

    function increaseQuantity(index) {
        // Define una función que aumenta la cantidad de un artículo en el carrito.

        cart[index].quantity++;
        // Incrementa la cantidad del artículo en el índice especificado.

        updateCart();
        // Llama a updateCart para refrescar la visualización del carrito.
    }

    function decreaseQuantity(index) {
        // Define una función que disminuye la cantidad de un artículo en el carrito.

        if (cart[index].quantity > 1) {
            // Verifica si la cantidad del artículo es mayor que 1.

            cart[index].quantity--;
            // Si es mayor que 1, disminuye la cantidad del artículo.
        } else {
            // Si la cantidad no es mayor que 1, ejecuta el siguiente bloque.

            cart.splice(index, 1);
            // Elimina el artículo del carrito si su cantidad es 1 o menos.
        }

        updateCart();
        // Llama a updateCart para refrescar la visualización del carrito.
    }

    function removeFromCart(index) {
        // Define una función que elimina un artículo del carrito.

        cart.splice(index, 1);
        // Elimina el artículo en el índice especificado del carrito.

        updateCart();
        // Llama a updateCart para refrescar la visualización del carrito.
    }

    updateCart();
    // Llama a updateCart por primera vez para mostrar el contenido del carrito al cargar la página.
});
