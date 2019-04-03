import * as PIXI from 'pixi.js';

export default class Bunny extends PIXI.Sprite {
  gravity: number = 0.75;
  speedX: number = Math.random() * 10;
  speedY: number = Math.random() * 10 - 5;
  bounds: PIXI.Rectangle;

  constructor(texture: PIXI.Texture, bounds: PIXI.Rectangle) {
    super(texture);
    this.bounds = bounds;
    this.anchor.x = 0.5;
    this.anchor.y = 1;
  }

  update = (delta: number) => {
    this.position.x += this.speedX * delta;
    this.position.y += this.speedY * delta;
    this.speedY += this.gravity * delta;

    if (this.position.x > this.bounds.right) {
      this.speedX *= -1;
      this.position.x = this.bounds.right;
    } else if (this.position.x < this.bounds.left) {
      this.speedX *= -1;
      this.position.x = this.bounds.left;
    }

    if (this.position.y > this.bounds.bottom) {
      this.speedY *= -0.85 * delta;
      this.position.y = this.bounds.bottom;
      if (Math.random() > 0.5) {
        this.speedY -= Math.random() * 6 * delta;
      }
    } else if (this.position.y < this.bounds.top) {
      this.speedY = 0;
      this.position.y = this.bounds.top;
    }
  };
}
