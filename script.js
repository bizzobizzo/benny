const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const title = document.getElementById('mainTitle');
const buttonGroup = document.getElementById('buttonGroup');

let scaleYes = 1;      // Grandezza iniziale del SÌ
let scaleNo = 1;       // Grandezza iniziale del NO
let tentativi = 0;     // Contatore di quante volte scappa il NO

function scappa() {
    // Rende il tasto NO "assoluto" così può saltare ovunque
    noBtn.style.position = "absolute";

    const padding = 50;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;

    // Incrementiamo il numero di tentativi
    tentativi++;

    // 1. Il tasto SÌ cresce sempre
    scaleYes += 0.2; 
    yesBtn.style.transform = `scale(${scaleYes})`;

    // 2. Il tasto NO dopo 5 volte inizia a rimpicciolirsi
    if (tentativi > 5) {
        scaleNo -= 0.1;
        if (scaleNo < 0.3) scaleNo = 0.3; // Non lo facciamo sparire del tutto, ma diventa minuscolo
        noBtn.style.transform = `scale(${scaleNo})`;
    }
}

// Supporto per PC (mouseover) e Telefono (touchstart)
noBtn.addEventListener('mouseover', scappa);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    scappa();
});

// Azione finale quando clicca SÌ
yesBtn.addEventListener('click', () => {
    // Messaggio finale gigante
    title.innerHTML = "Sapevo che avresti detto di sì! 😍 ❤️";
    title.classList.add('success-text');
    
    // Nascondiamo i bottoni
    buttonGroup.style.display = "none";

    // Esplosione di coriandoli/cuori
    const end = Date.now() + (15 * 1000); // 15 secondi di pioggia

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
