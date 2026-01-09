// Menú móvil toggle
document.getElementById('menu-toggle').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', function() {
        document.getElementById('mobile-menu').classList.add('hidden');
    });
});

// Animación de scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de aparición al hacer scroll
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
};

// Verificar elementos al cargar y al hacer scroll
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// Inicializar algunos elementos con efecto fade-in al cargar
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar el hero section inmediatamente
    const heroSection = document.querySelector('#inicio');
    if(heroSection) {
        setTimeout(() => {
            heroSection.classList.add('visible');
        }, 100);
    }
});

// Año actual en el pie de página
document.getElementById("year").textContent = new Date().getFullYear();

// ===========================================================
// Envío de formulario con AJAX a Web3Forms
// ===========================================================
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const submitBtn = form.querySelector('[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    // Mostrar estado de carga
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    
    // Obtener datos del formulario
    const formData = new FormData(form);
    
    // Crear petición
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.web3forms.com/submit', true);
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const result = JSON.parse(xhr.responseText);
                if (result.success) {
                    // alert('¡Mensaje enviado exitosamente!');
                    form.reset();
                    // Redirigir a página de agradecimiento archivo gracias.html
                    window.location.href = 'gracias.html';
                } else {
                    alert('Error: ' + (result.message || 'Error desconocido'));
                }
            } catch (error) {
                console.error('Error parsing response:', error);
                alert('Error procesando la respuesta del servidor');
            }
        } else {
            alert('Error de conexión. Código: ' + xhr.status);
        }
        
        // Restaurar estado del botón
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    };
    
    xhr.onerror = function() {
        alert('Error de red. Por favor, verifica tu conexión.');
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    };
    
    xhr.send(formData);
});
