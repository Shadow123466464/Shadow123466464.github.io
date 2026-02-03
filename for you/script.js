const messages = [
  "I didn’t expect you… but my heart did.",
  "Every beat learned your name without asking.",
  "This love grew quietly — now it’s everything."
];

/* FIREWORKS */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createFirework(x, y) {
  for (let i = 0; i < 40; i++) {
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 7,
      vy: (Math.random() - 0.5) * 7,
      life: 70
    });
  }
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;

    ctx.font = "16px serif";
    ctx.fillText("❤️", p.x, p.y);

    if (p.life <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animateFireworks);
}

animateFireworks();

/* ENVELOPES */
function openEnvelope(index) {
  document.querySelectorAll(".envelope")[index].classList.add("open");

  createFirework(canvas.width / 2, canvas.height / 2);

  setTimeout(() => {
    document.getElementById("letterText").textContent = messages[index];
    document.getElementById("letterModal").style.display = "flex";
  }, 900);
}

/* FINAL SCENE */
function nextScene() {
  document.getElementById("letterModal").style.display = "none";
  document.querySelector(".envelopes").style.display = "none";
  document.querySelector("h1").style.display = "none";
  document.querySelector(".subtitle").style.display = "none";

  document.getElementById("finalScene").style.display = "block";
  growHeartTree();

  setInterval(() => {
    createFirework(
      Math.random() * canvas.width,
      Math.random() * canvas.height / 2
    );
  }, 700);
}

/* HEART TREE */
function growHeartTree() {
  const tree = document.getElementById("heartTree");

  for (let y = 0; y < 80; y++) {
    for (let x = -40; x < 40; x++) {
      const eq =
        Math.pow(x * 0.035, 2) +
        Math.pow(y * 0.035 - Math.sqrt(Math.abs(x * 0.035)), 2);

      if (eq < 1.4) {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.textContent = "❤️";
        heart.style.left = 50 + x + "%";
        heart.style.top = 85 - y + "%";
        heart.style.animationDelay = `${Math.random() * 3}s`;
        tree.appendChild(heart);
      }
    }
  }
}

/* RESET */
function resetExperience() {
  location.reload();
}
