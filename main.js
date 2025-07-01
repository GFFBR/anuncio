const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width, height;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// --- Configurações
const gridSize = 300;
const grid = [];
const mandelbrotMask = [];

for (let y = 0; y < gridSize; y++) {
  grid[y] = [];
  mandelbrotMask[y] = [];
  for (let x = 0; x < gridSize; x++) {
    const fx = x / gridSize * 3.5 - 2.5;
    const fy = y / gridSize * 2.0 - 1.0;
    const m = mandelbrot(fx, fy);
    const alive = m === 30 ? 0 : Math.random() > 0.98 ? 1 : 0;
    mandelbrotMask[y][x] = m < 30;
    grid[y][x] = alive;
  }
}

// --- Função Mandelbrot
function mandelbrot(x, y) {
  let zx = 0, zy = 0;
  let i = 0;
  const max = 30;
  while (zx * zx + zy * zy < 4 && i < max) {
    const tmp = zx * zx - zy * zy + x;
    zy = 2 * zx * zy + y;
    zx = tmp;
    i++;
  }
  return i;
}

// --- Atualizar autômato celular com base na máscara Mandelbrot
function updateAutomata() {
  const next = [];
  for (let y = 0; y < gridSize; y++) {
    next[y] = [];
    for (let x = 0; x < gridSize; x++) {
      if (!mandelbrotMask[y][x]) {
        next[y][x] = 0;
        continue;
      }
      let neighbors = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const ny = (y + dy + gridSize) % gridSize;
          const nx = (x + dx + gridSize) % gridSize;
          neighbors += grid[ny][nx];
        }
      }
      const alive = grid[y][x];
      next[y][x] = alive ? (neighbors === 2 || neighbors === 3 ? 1 : 0) : (neighbors === 3 ? 1 : 0);
    }
  }
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      grid[y][x] = next[y][x];
    }
  }
}

// --- Renderização
function draw() {
  const cellSize = Math.min(width / gridSize, height / gridSize);
  ctx.clearRect(0, 0, width, height);
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (grid[y][x]) {
        const fx = x / gridSize * 3.5 - 2.5;
        const fy = y / gridSize * 2.0 - 1.0;
        const m = mandelbrot(fx, fy);
        const hue = (m * 15 + Math.random() * 30) % 360;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

// --- Toque do usuário
canvas.addEventListener('pointerdown', (e) => {
  const rx = e.offsetX / width;
  const ry = e.offsetY / height;
  const cx = Math.floor(rx * gridSize);
  const cy = Math.floor(ry * gridSize);
  for (let y = -5; y <= 5; y++) {
    for (let x = -5; x <= 5; x++) {
      const nx = cx + x;
      const ny = cy + y;
      if (nx >= 0 && ny >= 0 && nx < gridSize && ny < gridSize) {
        if (mandelbrotMask[ny][nx]) {
          grid[ny][nx] = Math.random() > 0.5 ? 1 : 0;
        }
      }
    }
  }
});

// --- Loop
function loop() {
  updateAutomata();
  draw();
  requestAnimationFrame(loop);
}
loop();
