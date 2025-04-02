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

// Función para ampliar una tarjeta
function enlargeCard(card) {
    card.classList.toggle('enlarged'); // Alterna la clase 'enlarged' en la tarjeta
    // Verifica si la tarjeta tiene la clase 'enlarged'
    if (card.classList.contains('enlarged')) {
        card.style.transform = 'scale(1.1)'; // Aumenta el tamaño de la tarjeta
        card.style.zIndex = '10'; // Asegura que la tarjeta ampliada esté por encima de otros elementos
    } else {
        card.style.transform = 'scale(1)'; // Restaura el tamaño original de la tarjeta
        card.style.zIndex = '1'; // Restaura el índice z original
    }
}
