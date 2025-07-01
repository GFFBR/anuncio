const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width, height;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// -------------------------------
// Estado inicial do autômato
// -------------------------------
const gridSize = 200;
const grid = [];
for (let y = 0; y < gridSize; y++) {
  grid[y] = [];
  for (let x = 0; x < gridSize; x++) {
    grid[y][x] = Math.random() > 0.9 ? 1 : 0;
  }
}

// -------------------------------
// Regras do Jogo da Vida
// -------------------------------
function updateGameOfLife() {
  const next = [];
  for (let y = 0; y < gridSize; y++) {
    next[y] = [];
    for (let x = 0; x < gridSize; x++) {
      let neighbors = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const ny = (y + dy + gridSize) % gridSize;
          const nx = (x + dx + gridSize) % gridSize;
          neighbors += grid[ny][nx];
        }
      }
      next[y][x] = (grid[y][x] === 1 && (neighbors === 2 || neighbors === 3)) || (grid[y][x] === 0 && neighbors === 3) ? 1 : 0;
    }
  }
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      grid[y][x] = next[y][x];
    }
  }
}

// -------------------------------
// Função Mandelbrot simplificada
// -------------------------------
function mandelbrot(x, y) {
  let real = x, imag = y;
  for (let i = 0; i < 30; i++) {
    const tempReal = real * real - imag * imag + x;
    const tempImag = 2 * real * imag + y;
    real = tempReal;
    imag = tempImag;
    if (real * real + imag * imag > 4) return i;
  }
  return 30;
}

// -------------------------------
// Renderização
// -------------------------------
function render() {
  ctx.clearRect(0, 0, width, height);

  const cellSize = width / gridSize;

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (grid[y][x]) {
        // Criar uma cor baseada no Mandelbrot
        const nx = x / gridSize * 3.5 - 2.5;
        const ny = y / gridSize * 2.0 - 1.0;
        const m = mandelbrot(nx, ny);
        const color = `hsl(${(m * 10) % 360}, 100%, 50%)`;
        ctx.fillStyle = color;
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

// -------------------------------
// Interação do usuário
// -------------------------------
canvas.addEventListener('pointerdown', (e) => {
  const x = Math.floor(e.offsetX / (width / gridSize));
  const y = Math.floor(e.offsetY / (height / gridSize));
  grid[y][x] = 1; // ativa célula ao toque
});

// -------------------------------
// Loop principal
// -------------------------------
function loop() {
  updateGameOfLife();
  render();
  requestAnimationFrame(loop);
}
loop();
