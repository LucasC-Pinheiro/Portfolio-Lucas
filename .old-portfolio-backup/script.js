// script.js

// Menu Hamburger
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

function toggleMenu(e) {
    e.preventDefault();
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Captura click e toque (iOS compatível)
hamburger.addEventListener('click', toggleMenu);
hamburger.addEventListener('touchstart', toggleMenu);

// Fecha menu ao clicar em algum link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Força carregar do topo ao abrir o site
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});
