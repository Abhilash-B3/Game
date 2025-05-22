class CancelAttack {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.player = { x: 50, y: 400, size: 30, speed: 5 };
    this.enemies = [];
    this.running = false;
    this.keys = {};
    this.spawnInterval = null;
  }

  start() {
    this.running = true;
    this.spawnEnemies();
    this.loop();
    window.addEventListener("keydown", (e) => this.keys[e.key] = true);
    window.addEventListener("keyup", (e) => this.keys[e.key] = false);
  }

  stop() {
    this.running = false;
    clearInterval(this.spawnInterval);
  }

  spawnEnemies() {
    this.spawnInterval = setInterval(() => {
      this.enemies.push({
        x: Math.random() * (this.canvas.width - 30),
        y: 0,
        size: 20,
        speed: 2 + Math.random() * 3
      });
    }, 1000);
  }

  loop = () => {
    if (!this.running) return;
    this.update();
    this.draw();
    requestAnimationFrame(this.loop);
  }

  update() {
    if (this.keys["ArrowLeft"]) this.player.x -= this.player.speed;
    if (this.keys["ArrowRight"]) this.player.x += this.player.speed;
    if (this.keys["ArrowUp"]) this.player.y -= this.player.speed;
    if (this.keys["ArrowDown"]) this.player.y += this.player.speed;

    // Clamp player inside canvas
    this.player.x = Math.max(0, Math.min(this.canvas.width - this.player.size, this.player.x));
    this.player.y = Math.max(0, Math.min(this.canvas.height - this.player.size, this.player.y));

    this.enemies.forEach(enemy => enemy.y += enemy.speed);

    // Remove enemies off screen
    this.enemies = this.enemies.filter(enemy => enemy.y < this.canvas.height);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw player
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(this.player.x, this.player.y, this.player.size, this.player.size);

    // Draw enemies
    this.ctx.fillStyle = "red";
    this.enemies.forEach(enemy => {
      this.ctx.beginPath();
      this.ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }
}

export default CancelAttack;
