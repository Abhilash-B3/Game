export default class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.speed = 5;
  }

  draw(ctx) {
    ctx.fillStyle = "#00f";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(keys, canvasWidth) {
    if (keys["ArrowLeft"] && this.x > 0) this.x -= this.speed;
    if (keys["ArrowRight"] && this.x + this.width < canvasWidth)
      this.x += this.speed;
  }
}
