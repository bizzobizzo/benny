const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const title = document.getElementById('mainTitle');
const buttonGroup = document.getElementById('buttonGroup');

let scaleYes = 1;
let scaleNo = 1;
let tentativi = 0;

function scappa() {
    // Rendiamo il tasto assoluto
    noBtn.style.position = "fixed"; // 'fixed' è meglio di 'absolute' per i telefoni

    // Dimensioni della finestra (quello che l'utente vede effettivamente)
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Dimensioni del tasto
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Margine di sicurezza per non farlo mai uscire (10% dai bordi)
    const marginX = vw * 0.1;
    const marginY = vh * 0.1;

    // Calcolo posizione entro i margini di sicurezza
    const randomX = Math.floor(Math.random() * (vw - btnWidth - (marginX * 2))) + marginX;
    const randomY = Math.floor(Math.random() * (vh - btnHeight - (marginY * 2))) + marginY;

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;

    // Incremento contatore
    tentativi++;

    // 1. Ingrandiamo il SÌ (dopo 10 tentativi sarà circa 3.5 volte più grande)
    scaleYes += 0.25; 
    yesBtn.style.transform = `scale(${scaleYes})`;
    // Alziamo lo z-index del SI per farlo passare sopra a tutto man mano che cresce
    yesBtn.style.zIndex = tentativi;

    // 2. Il NO scappa e dopo 10 volte diventa minuscolo
    if (tentativi >= 10) {
        scaleNo = 0.2; // Diventa piccolissimo
        noBtn.style.opacity = "0.5"; // Diventa anche semi-trasparente per confondere
    } else if (tentativi > 5) {
        scaleNo -= 0.1;
    }
    
    noBtn.style.transform = `scale(${scaleNo})`;
}

// Eventi per PC e Mobile
noBtn.addEventListener('mouseover', scappa);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    scappa();
});

// Vittoria
yesBtn.addEventListener('click', () => {
    title.innerHTML = "Sapevo che avresti detto di sì! 😍 ❤️";
    title.classList.add('success-text');
    buttonGroup.style.display = "none";
    noBtn.style.display = "none";

    // Effetto coriandoli
    const end = Date.now() + (15 * 1000);
    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.8 },
            colors: ['#ff0000', '#ff69b4']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.8 },
            colors: ['#ff0000', '#ff69b4']
        });
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
});
