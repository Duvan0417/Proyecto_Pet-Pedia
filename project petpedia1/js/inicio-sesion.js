/**
 * SCRIPT PRINCIPAL DE PETPEDIA
 * Controla:
 * - Transiciones entre formularios (login/registro)
 * - Validación de campos
 * - Integración con Google Sign-In
 * - Efectos visuales (animaciones, mensajes)
 */

document.addEventListener('DOMContentLoaded', function() {
    // ================== SELECTORES DEL DOM ==================
    const loginBox = document.getElementById('loginBox');
    const registerBox = document.getElementById('registerBox');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const googleSignIn = document.getElementById('googleSignIn');
    const petParticlesEl = document.getElementById('petParticles');

    // ================== TRANSICIONES ENTRE FORMULARIOS ==================
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginBox.classList.remove('show');
        setTimeout(() => registerBox.classList.add('show'), 300);
    });

    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerBox.classList.remove('show');
        setTimeout(() => loginBox.classList.add('show'), 300);
    });

    // ================== VALIDACIÓN DE FORMULARIOS ==================
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        if (!email || !password) {
            showError('Por favor completa todos los campos');
            return;
        }
    
        simulateLoading(() => {
            console.log('Login exitoso (simulado)');
            showSuccess('¡Bienvenido a PetPedia!');
            setTimeout(() => {
                window.location.href = 'inicio.html'; // Redirigir a la página de inicio
            }, 1500);
        });
    });
    

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('regName').value;
        const petName = document.getElementById('regPetName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;

        if (!name || !petName || !email || !password || !confirmPassword) {
            showError('Todos los campos son obligatorios');
            return;
        }

        if (password !== confirmPassword) {
            showError('Las contraseñas no coinciden');
            return;
        }

        if (password.length < 6) {
            showError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        simulateLoading(() => {
            console.log('Registro exitoso (simulado)');
            showSuccess(`¡${petName} registrado con éxito!`);
            setTimeout(() => {
                registerBox.classList.remove('show');
                loginBox.classList.add('show');
                registerForm.reset();
            }, 2000);
        });
    });

    // ================== GOOGLE SIGN-IN ==================
    function decodeJwtResponse(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    }

    function initGoogleSignIn() {
        if (typeof google !== 'undefined') {
            google.accounts.id.initialize({
                client_id: 'TU_CLIENT_ID_GOOGLE.apps.googleusercontent.com', // ¡Reemplázalo!
                callback: response => {
                    const user = decodeJwtResponse(response.credential);
                    simulateLoading(() => {
                        showSuccess(`¡Bienvenido ${user.given_name}!`);
                    });
                }
            });

            google.accounts.id.renderButton(googleSignIn, {
                theme: 'filled_blue',
                size: 'large',
                shape: 'pill'
            });
        } else {
            setTimeout(initGoogleSignIn, 500);
        }
    }
    initGoogleSignIn();

    // ================== FUNCIONES AUXILIARES ==================
    function simulateLoading(callback) {
        const btn = document.activeElement;
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            callback();
        }, 1500);
    }

    function showError(message) {
        const el = document.createElement('div');
        el.className = 'error-message';
        el.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3000);
    }

    function showSuccess(message) {
        const el = document.createElement('div');
        el.className = 'success-message';
        el.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3000);
    }

    // ================== EFECTOS VISUALES ==================
    function createPawParticles() {
        const pawSVG = (isCat) => 
            isCat ? "data:image/svg+xml,..." : "data:image/svg+xml,..."; // SVG de huellas

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'paw-particle';
            particle.style.cssText = `
                width: ${Math.random() * 20 + 10}px;
                height: ${Math.random() * 20 + 10}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                background-image: url("${pawSVG(Math.random() > 0.5)}");
            `;
            petParticlesEl.appendChild(particle);
        }
    }

    // Inicialización
    createPawParticles();
});