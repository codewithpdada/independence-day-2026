document.addEventListener('DOMContentLoaded', () => {
    const flag = document.getElementById('flag');
    const hoistBtn = document.getElementById('hoistBtn');
    const statusText = document.getElementById('statusText');
    const generatePledgeBtn = document.getElementById('generatePledgeBtn');
    const userNameInput = document.getElementById('userName');
    const pledgeCard = document.getElementById('pledgeCard');
    const displayName = document.getElementById('displayName');

    let isHoisted = false;

    // Web Audio API Procedural Fanfare Sound Effect (No external assets required!)
    function playPatrioticFanfare() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();

            // Simple celebratory triad chord notes (Hz)
            const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
            notes.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);

                gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.15);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.15 + 1.5);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(ctx.currentTime + idx * 0.15);
                osc.stop(ctx.currentTime + idx * 0.15 + 1.5);
            });
        } catch (e) {
            console.log('Audio playback context not supported');
        }
    }

    // Flag Hoisting Action
    hoistBtn.addEventListener('click', () => {
        if (isHoisted) return;

        isHoisted = true;
        statusText.textContent = "Hoisting the Tiranga...";
        hoistBtn.disabled = true;

        // Animate flag position
        flag.classList.add('hoisted');

        // Sound effect
        playPatrioticFanfare();

        // Trigger celebration after flag reaches top (3 seconds)
        setTimeout(() => {
            statusText.textContent = "✨ Flag Hoisted High! Happy Independence Day 2026! 🇮🇳";
            startPetalShower();
            hoistBtn.style.opacity = '0.6';
            hoistBtn.style.cursor = 'default';
        }, 3000);
    });

    // Digital Pledge Generator
    generatePledgeBtn.addEventListener('click', () => {
        const name = userNameInput.value.trim();
        if (name !== "") {
            displayName.textContent = name;
            pledgeCard.classList.remove('hidden');
        } else {
            alert("Please enter your name first!");
        }
    });

    // Flower Petals Particle System (Canvas)
    const canvas = document.getElementById('petalCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Petal {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 8 + 6;
            this.speedY = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            // Colors: Saffron, White, Green, and Rose Pink
            const colors = ['#FF9933', '#FFFFFF', '#138808', '#FFB6C1'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.angle = Math.random() * 360;
            this.spin = Math.random() * 2 - 1;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.angle += this.spin;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.angle * Math.PI) / 180);
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    let showering = false;
    function startPetalShower() {
        showering = true;
        // Spawn 80 initial particles
        for (let i = 0; i < 80; i++) {
            particles.push(new Petal());
        }
        animatePetals();
    }

    function animatePetals() {
        if (!showering) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Keep generating new petals continuously
        if (particles.length < 120 && Math.random() < 0.3) {
            particles.push(new Petal());
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].y > canvas.height + 20) {
                particles.splice(i, 1);
            }
        }
        requestAnimationFrame(animatePetals);
    }
});
