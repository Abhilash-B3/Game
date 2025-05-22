export default class MemeProjectile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.speed = 6;
  }

  draw(ctx) {
    ctx.fillStyle = "lime";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  update() {
    this.y -= this.speed;
  }
}
