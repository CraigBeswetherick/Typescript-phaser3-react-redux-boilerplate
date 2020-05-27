import { INCREASE_SCORE, COMPLETE_LEVEL } from '../../Actions';

type CustomBob = {
  x: number;
  y: number;
  data: any;
};

export class GameScene extends Phaser.Scene {
  blitter!: Phaser.GameObjects.Blitter;
  gravity: number = 0.5;
  idx: number = 1;
  numbers: Array<number> = [];
  startEnts: number = 500;
  currentLevel: number;

  constructor(currentLevel: number) {
    super({
      key: 'GameScene',
    });

    this.currentLevel = currentLevel;
  }

  create() {
    this.blitter = this.add.blitter(0, 0, 'atlas' + this.currentLevel);

    this.game.events.emit(INCREASE_SCORE, this.startEnts);

    while (this.startEnts > 0) {
      this.startEnts--;
      this.launch();
    }

    this.input.on('pointerdown', () => {
      const amount = 50;
      for (var i = 0; i < amount; ++i) {
        this.launch();
      }

      this.game.events.emit(INCREASE_SCORE, amount);
    });
  }

  update() {
    for (
      var index = 0, length = this.blitter.children.list.length;
      index < length;
      ++index
    ) {
      let bob: CustomBob = this.blitter.children.list[index];

      bob.data.vy += this.gravity;

      bob.y += bob.data.vy;
      bob.x += bob.data.vx;

      if (bob.x + bob.data.chosenFrame.width > this.game.renderer.width) {
        bob.x = this.game.renderer.width - bob.data.chosenFrame.width;
        bob.data.vx *= -0.9;
      } else if (bob.x < 0) {
        bob.x = 0;
        bob.data.vx *= -0.9;
      }

      if (bob.y + bob.data.chosenFrame.height > this.game.renderer.height) {
        bob.y = this.game.renderer.height - bob.data.chosenFrame.height;
        bob.data.vy *= -0.9;
      } else if (bob.y < 0) {
        bob.y = 0;
        bob.data.vy *= -0.9;
      }
    }
  }

  destroy() {
    // We want to keep the assets in the cache and leave the renderer for reuse.
    this.game.destroy(true);
  }

  launch() {
    this.idx++;

    if (this.idx === 20) {
      this.idx = 1;
    }

    let chosenFrame: Phaser.Textures.Frame;

    if (this.idx < 10) {
      chosenFrame = this.textures.getFrame(
        'atlas',
        'veg0' + this.idx.toString()
      );
    } else {
      chosenFrame = this.textures.getFrame(
        'atlas',
        'veg' + this.idx.toString()
      );
    }

    const bob: CustomBob = this.blitter.create(0, 0, chosenFrame);

    bob.data.chosenFrame = chosenFrame;
    bob.data.vx = Math.random() * 10;
    bob.data.vy = Math.random() * 10;
    bob.data.bounce = 0.8 + Math.random() * 0.3;
  }
}
