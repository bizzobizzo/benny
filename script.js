const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const title = document.getElementById('mainTitle');
const buttonGroup = document.getElementById('buttonGroup');

// Funzione per spostare il tasto NO
function scappa() {
    // Calcoliamo i limiti dello schermo
    const padding = 50;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    // Generiamo posizioni casuali
    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

// Funziona sia con mouse (PC) che con tocco (Smartphone)
noBtn.addEventListener('mouseover', scappa);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Impedisce il click accidentale
    scappa();
});

// Logica per il tasto SÌ
yesBtn.addEventListener('click', () => {
    // 1. Cambia il messaggio e lo rende gigante
    title.innerHTML = "Sapevo che avresti detto di sì! 😍 ❤️";
    title.classList.add('success-text');
    
    // 2. Spariscono i bottoni
    buttonGroup.style.display = "none";

    // 3. Pioggia infinita di cuoricini
    const end = Date.now() + (15 * 1000); // Dura 15 secondi

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff0000', '#ff69b4'],
            shapes: ['circle'] // I cerchi piccoli sembrano coriandoli dolci
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff0000', '#ff69b4'],
            shapes: ['circle']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
});