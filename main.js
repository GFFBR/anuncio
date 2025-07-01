const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width, height;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// --- Configuração do autômato
const gridSize = 200;
const grid = [];
for (let y = 0; y < gridSize; y++) {
  grid[y] = [];
  for (let x = 0; x < gridSize; x++) {
    grid[y][x] = Math.random() > 0.9 ? 1 : 0;
  }
}

// --- Jogo da Vida
function updateGameOfLife() {
  const next = [];
  for (let y = 0; y < gridSize; y++) {
    next[y] = [];
    for (let x = 0; x < gridSize; x++) {
      let count = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const ny = (y + dy + gridSize) % gridSize;
          const nx = (x + dx + gridSize) % gridSize;
          count += grid[ny][nx];
        }
      }
      const alive = grid[y][x];
      next[y][x] = alive ? (count === 2 || count === 3 ? 1 : 0) : (count === 3 ? 1 : 0);
    }
  }
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      grid[y][x] = next[y][x];
    }
  }
}

// --- Fractal Mandelbrot (simplificado)
function mandelbrot(x, y) {
  let zx = 0, zy = 0, i = 0;
  const max = 30;
  while (zx*zx + zy*zy < 4 && i < max) {
    let tmp = zx*zx - zy*zy + x;
    zy = 2 * zx * zy + y;
    zx = tmp;
    i++;
  }
  return i;
}

// --- Renderização
function render() {
  ctx.clearRect(0, 0, width, height);
  const cellSize = Math.min(width, height) / gridSize;
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (grid[y][x]) {
        const fx = x / gridSize * 3.5 - 2.5;
        const fy = y / gridSize * 2.0 - 1.0;
        const m = mandelbrot(fx, fy);
        const hue = (m * 12) % 360;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

// --- Interatividade com toque
canvas.addEventListener('pointerdown', (e) => {
  const cellX = Math.floor(e.offsetX / (width / gridSize));
  const cellY = Math.floor(e.offsetY / (height / gridSize));
  grid[cellY][cellX] = 1;
});

// --- Loop principal
function loop() {
  updateGameOfLife();
  render();
  requestAnimationFrame(loop);
}
loop();
