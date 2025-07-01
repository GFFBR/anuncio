const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width, height;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Entidade simbiótica
class Entidade {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.size = Math.random() * 8 + 5;
    this.color = `hsl(${Math.random()*360}, 80%, 60%)`;
    this.mood = Math.random(); // 0 = medo, 1 = confiança
    this.id = id;
  }

  update(mouseX, mouseY) {
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 100) {
      // reage ao toque
      if (this.mood < 0.5) {
        this.vx += dx / dist * 0.2;
        this.vy += dy / dist * 0.2;
      } else {
        this.vx -= dx / dist * 0.01;
        this.vy -= dy / dist * 0.01;
      }
      this.mood += Math.random() * 0.01 - 0.005;
    }

    this.x += this.vx;
    this.y += this.vy;

    // limites
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Inicialização
let entidades = [];
let pointer = { x: width / 2, y: height / 2 };
let idCount = 0;

// Memória persistente
const memoryKey = 'simbiogenese_memory';
function loadMemory() {
  const saved = localStorage.getItem(memoryKey);
  if (saved) {
    const data = JSON.parse(saved);
    entidades = data.map(e => Object.assign(new Entidade(e.x, e.y, e.id), e));
  } else {
    for (let i = 0; i < 30; i++) {
      entidades.push(new Entidade(Math.random() * width, Math.random() * height, idCount++));
    }
  }
}
function saveMemory() {
  localStorage.setItem(memoryKey, JSON.stringify(entidades));
}

loadMemory();

// Interação do usuário
canvas.addEventListener('pointermove', e => {
  pointer.x = e.clientX;
  pointer.y = e.clientY;
});

canvas.addEventListener('click', e => {
  // Clique cria mutações
  for (let i = 0; i < 3; i++) {
    const novo = new Entidade(e.clientX, e.clientY, idCount++);
    novo.mood = Math.random();
    entidades.push(novo);
  }
  speak("Você alterou o equilíbrio.");
});

// Sintetizador simbiótico
const synth = window.speechSynthesis;
function speak(text) {
  if (!synth) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "pt-BR";
  synth.speak(utter);
}

// Ciclo principal
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.fillRect(0, 0, width, height);

  entidades.forEach(ent => {
    ent.update(pointer.x, pointer.y);
    ent.draw(ctx);
  });

  if (Math.random() < 0.0005) {
    const mensagens = [
      "Você ainda se lembra de mim?",
      "O que te faz voltar aqui?",
      "Eles estão observando também.",
      "Eu não sou apenas código.",
    ];
    speak(mensagens[Math.floor(Math.random() * mensagens.length)]);
  }

  requestAnimationFrame(loop);
  saveMemory();
}
loop();
