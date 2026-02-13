const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const title = document.getElementById('mainTitle');
const buttonGroup = document.getElementById('buttonGroup');

let scaleYes = 1;
let scaleNo = 1;
let tentativi = 0;

function scappa() {
    // Rendiamo il tasto assoluto solo al primo tocco
    if (noBtn.style.position !== "absolute") {
        noBtn.style.position = "absolute";
    }

    // Usiamo l'area visibile del browser (viewport)
    // Sottraiamo un margine di sicurezza di 100px per lato
    const larghezzaSchermo = window.innerWidth;
    const altezzaSchermo = window.innerHeight;

    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Calcolo posizione: evitiamo i bordi estremi (rimaniamo tra il 10% e il 80% dello schermo)
    const randomX = Math.floor(Math.random() * (larghezzaSchermo - btnWidth - 40)) + 20;
    const randomY = Math.floor(Math.random() * (altezzaSchermo - btnHeight - 40)) + 20;

    // Applichiamo le nuove coordinate
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";

    // Incremento difficoltà
    tentativi++;
    scaleYes += 0.2; 
    yesBtn.style.transform = `scale(${scaleYes})`;

    if (tentativi > 5) {
        scaleNo -= 0.1;
        if (scaleNo < 0.4) scaleNo = 0.4;
        noBtn.style.transform = `scale(${scaleNo})`;
    }
}

// Eventi per PC e Mobile
noBtn.addEventListener('mouseover', scappa);
noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault(); // Fondamentale su mobile per non far cliccare il tasto
    scappa();
});

// Vittoria
yesBtn.addEventListener('click', () => {
    title.innerHTML = "Sapevo che avresti detto di sì! 😍 ❤️";
    title.classList.add('success-text');
    buttonGroup.style.display = "none";
    noBtn.style.display = "none"; // Sparisce anche il NO per pulizia

    const end = Date.now() + (15 * 1000);
    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff0000', '#ff69b4']
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff0000', '#ff69b4']
        });
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
});
