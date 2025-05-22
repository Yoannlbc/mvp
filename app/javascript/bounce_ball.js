gsap.from(".basketball", {
  y: 260,
  duration:1,
  repeat: -1,
  yoyo: true,
  rotation:90,
})

gsap.to(".trophee-image",{
  y:-570,
  duration:10,
  delay:1,
})


// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelectorAll(".basketball-button").forEach((button) => {
//     button.addEventListener("click", (e) => {
//       e.preventDefault();

//       const isCorrect = button.dataset.correct === "true";
//       const form = button.closest("form");
//       const ball = button.querySelector(".basketball-image");

//       if (!ball) {
//         form.requestSubmit();
//         return;
//       }

//       if (isCorrect) {
//         animateBall(ball, () => {
//           form.requestSubmit(); // après animation
//         });
//       } else {
//         animateMissedBall(ball, () => {
//           form.requestSubmit(); // après animation
//         });
//       }
//     });
//   });
// });

// function animateBall(ball, callback) {
//   let startTime = null;
//   const duration = 700; // en ms

//   ball.style.transition = "none";
//   ball.style.transform = "none";

//   function step(timestamp) {
//     if (!startTime) startTime = timestamp;
//     const progress = Math.min((timestamp - startTime) / duration, 1);

//     // Mouvement parabolique vers le panier
//     const x = 100 * progress; // ajuster pour viser le panier
//     const y = -300 * Math.sin(Math.PI * progress); // belle courbe

//     ball.style.transform = `translate(${x}px, ${y}px)`;

//     if (progress < 1) {
//       requestAnimationFrame(step);
//     } else {
//       setTimeout(callback, 100); // délai léger pour bien voir
//     }
//   }

//   requestAnimationFrame(step);
// }

// function animateMissedBall(ball, callback) {
//   let startTime = null;
//   const duration = 700; // en ms

//   ball.style.transition = "none";
//   ball.style.transform = "none";

//   function step(timestamp) {
//     if (!startTime) startTime = timestamp;
//     const progress = Math.min((timestamp - startTime) / duration, 1);


//     const x = -10 * progress; // plus à droite
//     const y = -380 * Math.sin(Math.PI * progress);

//     ball.style.transform = `translate(${x}px, ${y}px)`;

//     if (progress < 1) {
//       requestAnimationFrame(step);
//     } else {
//       setTimeout(callback, 100); // pareil, attendre un peu
//     }
//   }

//   requestAnimationFrame(step);
// }

document.addEventListener("DOMContentLoaded", () => {
  console.log("Script initialisé");

  const countdownElement = document.getElementById("countdown-timer");
  const swishSound = document.getElementById("swish-sound");
  const failSound = document.getElementById("fail-sound");
  let timeLeft = 10;

  if (countdownElement) {
    countdownElement.textContent = `${timeLeft}`;
    const timerInterval = setInterval(() => {
      timeLeft--;
      countdownElement.textContent = `${timeLeft}`;

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        autoSubmitFirstChoice();
      }
    }, 1000);
  }

  function autoSubmitFirstChoice() {
    const firstButton = document.querySelector(".basketball-button");
    if (firstButton) {
      firstButton.click();
    }
  }

  document.querySelectorAll(".basketball-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const isCorrect = button.dataset.correct === "true";
      const form = button.closest("form");
      const ball = button.querySelector("img");

      if (!ball || !form) {
        form?.requestSubmit();
        return;
      }

      if (isCorrect) {
        // CHANGEMENT: Retarder le son de réussite
        setTimeout(() => {
          if (swishSound) {
            swishSound.currentTime = 0;
            swishSound.play().catch((err) => console.warn("Erreur lecture son panier :", err));
          }
        }, 500); // Délai de 500ms - vous pouvez ajuster cette valeur

        animateBallToHoop(ball, () => setTimeout(() => form.requestSubmit(), 500));
      } else {
        // CHANGEMENT: Retarder le son d'échec
        setTimeout(() => {
          if (failSound) {
            failSound.currentTime = 0;
            failSound.play().catch((err) => console.warn("Erreur lecture son échec :", err));
          }
        }, 400); // Délai de 400ms - vous pouvez ajuster cette valeur

        animateBallMiss(ball, () => setTimeout(() => form.requestSubmit(), 500));
      }
    });
  });
});

function animateBallToHoop(originalBall, callback) {
  const hoop = document.querySelector(".basketball-hoop");
  if (!hoop) return;

  const ballRect = originalBall.getBoundingClientRect();
  const hoopRect = hoop.getBoundingClientRect();

  const clone = originalBall.cloneNode(true);
  Object.assign(clone.style, {
    position: "fixed",
    left: `${ballRect.left}px`,
    top: `${ballRect.top}px`,
    width: `${ballRect.width}px`,
    height: `${ballRect.height}px`,
    zIndex: 2000,
    pointerEvents: "none",
  });

  document.body.appendChild(clone);

  requestAnimationFrame(() => {
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    const dx = hoopRect.left + hoopRect.width / 3 - ballRect.left + offsetX;
    const dy = hoopRect.top + hoopRect.height / 4 - ballRect.top + offsetY;

    clone.style.transition = "transform 0.8s ease-in-out, opacity 0.6s ease 0.8s";
    clone.style.transform = `translate(${dx}px, ${dy}px) scale(1) rotate(${Math.random() * 20 - 10}deg)`;
    clone.style.opacity = "0";

    setTimeout(() => {
      clone.remove();
      if (callback) callback();
    }, 2000);
  });
}

function animateBallMiss(ball, callback) {
  const hoop = document.querySelector(".basketball-hoop");
  if (!hoop) return;

  const ballRect = ball.getBoundingClientRect();
  const hoopRect = hoop.getBoundingClientRect();

  const clone = ball.cloneNode(true);
  Object.assign(clone.style, {
    position: "fixed",
    left: `${ballRect.left}px`,
    top: `${ballRect.top}px`,
    width: `${ballRect.width}px`,
    height: `${ballRect.height}px`,
    zIndex: 2000,
    pointerEvents: "none",
    transition: "none",
    transform: "translate(0, 0) scale(1) rotate(0deg)",
    opacity: "1",
  });

  document.body.appendChild(clone);
  clone.getBoundingClientRect();

  requestAnimationFrame(() => {
    const missOffsetX = 30 + Math.random() * 5;
    const missOffsetY = 10 + Math.random() * 5;
    const dx = hoopRect.left + hoopRect.width / 2 - ballRect.left + missOffsetX;
    const dy = hoopRect.top + hoopRect.height / 2 - ballRect.top + missOffsetY;

    clone.style.transition = "transform 0.8s ease-in-out, opacity 0.6s ease 0.8s";
    clone.style.transform = `translate(${dx}px, ${dy}px) scale(1) rotate(${Math.random() * 20 - 10}deg)`;
    clone.style.opacity = "0";

    setTimeout(() => {
      clone.remove();
      if (callback) callback();
    }, 2000);
  });
}

"use strict";

window.addEventListener("load", function () {
  // CONDITION : Vérifier si on est sur la page de résultats
  // Option 1 : Vérifier l'URL (le plus fiable pour votre cas)
  const isResultPage = window.location.pathname.includes('/result');

  // Option 2 : Vérifier la présence d'un élément spécifique (en backup)
  const resultPageElement = document.querySelector('.result-page');
  const resultContainer = document.querySelector('.result-container');

  // Si on n'est pas sur la page de résultats, on arrête l'exécution
  if (!isResultPage && !resultPageElement && !resultContainer) {
    return; // Sortir de la fonction, pas de feux d'artifice
  }

  const canv = document.createElement("canvas");
  canv.style.position = "absolute";
  canv.style.top = "0";
  canv.style.left = "0";
  canv.style.width = "100%";
  canv.style.height = "100%";
  canv.style.pointerEvents = "none";
  canv.style.zIndex = "1";
  document.body.appendChild(canv);
  const ctx = canv.getContext("2d");

  let maxx = window.innerWidth;
  let maxy = window.innerHeight;
  canv.width = maxx;
  canv.height = maxy;

  window.addEventListener("resize", () => {
    maxx = window.innerWidth;
    maxy = window.innerHeight;
    canv.width = maxx;
    canv.height = maxy;
  });

  const rand = (min, max) => Math.random() * (max - min) + min;
  const randInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
  const randColor = () => `hsl(${randInt(0, 360)}, 100%, 50%)`;

  class Particle {
    constructor(x, y, color, speed, direction, gravity, friction, size) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.speed = speed;
      this.direction = direction;
      this.vx = Math.cos(direction) * speed;
      this.vy = Math.sin(direction) * speed;
      this.gravity = gravity;
      this.friction = friction;
      this.alpha = 1;
      this.decay = rand(0.005, 0.02);
      this.size = size;
    }

    update() {
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }

    isAlive() {
      return this.alpha > 0;
    }
  }

  class Firework {
    constructor(x, y, targetY, color, speed, size) {
      this.x = x;
      this.y = y;
      this.targetY = targetY;
      this.color = color;
      this.speed = speed;
      this.size = size;
      this.angle = -Math.PI / 2 + rand(-0.3, 0.3);
      this.vx = Math.cos(this.angle) * this.speed;
      this.vy = Math.sin(this.angle) * this.speed;
      this.trail = [];
      this.trailLength = randInt(10, 25);
      this.exploded = false;
    }

    update() {
      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > this.trailLength) {
        this.trail.shift();
      }

      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.02;

      if (this.vy >= 0 || this.y <= this.targetY) {
        this.explode();
        return false;
      }
      return true;
    }

    explode() {
      const numParticles = randInt(50, 150);
      for (let i = 0; i < numParticles; i++) {
        const angle = rand(0, Math.PI * 2);
        const speed = rand(2, 7);
        const particleSize = rand(1, 5);
        explosions.push(
          new Particle(
            this.x,
            this.y,
            this.color,
            speed,
            angle,
            0.05,
            0.98,
            particleSize
          )
        );
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.beginPath();
      if (this.trail.length > 1) {
        ctx.moveTo(this.trail[0].x, this.trail[0].y);
        for (let point of this.trail) {
          ctx.lineTo(point.x, point.y);
        }
      } else {
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y);
      }
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.size;
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.restore();
    }
  }

  let fireworks = [];
  let explosions = [];

  function launchFirework() {
    const x = rand(maxx * 0.1, maxx * 0.9);
    const y = maxy;
    const targetY = rand(maxy * 0.1, maxy * 0.4);
    const color = randColor();
    const speed = rand(4, 8);
    const size = rand(2, 5);
    fireworks.push(new Firework(x, y, targetY, color, speed, size));

    const timeout = rand(300, 800);
    setTimeout(launchFirework, timeout);
  }

  launchFirework();

  function animate() {
    ctx.clearRect(0, 0, maxx, maxy);

    for (let i = fireworks.length - 1; i >= 0; i--) {
      const firework = fireworks[i];
      if (!firework.update()) {
        fireworks.splice(i, 1);
      } else {
        firework.draw(ctx);
      }
    }

    for (let i = explosions.length - 1; i >= 0; i--) {
      const particle = explosions[i];
      particle.update();
      if (particle.isAlive()) {
        particle.draw(ctx);
      } else {
        explosions.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("click", function (event) {
    const x = event.clientX;
    const y = maxy;
    const targetY = event.clientY;
    const color = randColor();
    const speed = rand(4, 8);
    const size = rand(2, 5);
    fireworks.push(new Firework(x, y, targetY, color, speed, size));
  });
});
