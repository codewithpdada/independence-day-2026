document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamically render 24 spokes in the Ashoka Chakra
  const chakra = document.getElementById('chakra');
  if (chakra) {
    for (let i = 0; i < 12; i++) {
      const spoke = document.createElement('div');
      spoke.className = 'spoke';
      spoke.style.transform = `rotate(${i * 15}deg)`;
      chakra.appendChild(spoke);
    }
  }

  // 2. Confetti Hoist Event
  const hoistBtn = document.getElementById('hoistBtn');
  if (hoistBtn) {
    hoistBtn.addEventListener('click', hoistFlag);
  }

  function hoistFlag() {
    // Center confetti blast
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF9933', '#FFFFFF', '#138808']
    });

    // Dual side cannons
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF9933', '#FFFFFF', '#138808']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF9933', '#FFFFFF', '#138808']
      });
    }, 250);
  }

  // 3. Audio Toggle
  const audio = document.getElementById('patrioticAudio');
  const musicBtn = document.getElementById('musicBtn');
  let isPlaying = false;

  if (musicBtn && audio) {
    musicBtn.addEventListener('click', () => {
      if (isPlaying) {
        audio.pause();
        musicBtn.innerHTML = '🎵 Play Anthem / Audio';
      } else {
        audio.play();
        musicBtn.innerHTML = '⏸️ Pause Audio';
      }
      isPlaying = !isPlaying;
    });
  }

  // 4. Dynamic Greeting Generator
  const userNameInput = document.getElementById('userName');
  const greetingOutput = document.getElementById('greetingMessage');

  if (userNameInput && greetingOutput) {
    userNameInput.addEventListener('input', () => {
      const name = userNameInput.value.trim();
      if (name.length > 0) {
        greetingOutput.innerHTML = `🧡 Proud Indian <strong>${name}</strong> wishes you a Happy Independence Day 2026! 💚`;
      } else {
        greetingOutput.innerHTML = '';
      }
    });
  }
});
