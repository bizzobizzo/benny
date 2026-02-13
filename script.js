const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const title = document.getElementById('mainTitle');
const buttonGroup = document.getElementById('buttonGroup');

let scaleYes = 1; // Variabile per la grandezza del tasto SI

function scappa() {
    // Rendiamo il tasto NO "assoluto" solo dopo il primo movimento
    // così all'inizio sta al suo posto ordinato.
    noBtn.style.position = "absolute";

    const padding = 50;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;

    // Ogni volta che il NO scappa, il SI diventa più grande del 15%
    scaleYes += 0.15;
    yesBtn.style.transform = `scale(${scaleYes})`;
}

noBtn.addEventListener('mouseover', scappa);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    scappa();
});

yesBtn.addEventListener('click', () => {
    title.innerHTML = "Sapevo che avresti detto di sì! 😍 ❤️";
    title.classList.add('success-text');
    
    buttonGroup.style.display = "none";

    // Pioggia di cuori (libreria confetti)
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
