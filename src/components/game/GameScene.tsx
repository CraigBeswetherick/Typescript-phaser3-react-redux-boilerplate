import { INCREASE_SCORE, COMPLETE_LEVEL } from '../../actions';

interface Props {
  currentLevel: number;
}

export class GameScene extends Phaser.Scene {
  blitter!: Phaser.GameObjects.Blitter;
  gravity: number = 0.5;
  idx: number = 1;
  frame = 'veg01';
  numbers: any[] = [];
  iter = 0;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  init(props: Props) {
    console.log(props.currentLevel);
  }

  preload() {
    this.load.atlas('atlas', 'images/veg.png', 'images/veg.json');
  }

  create() {
    const startEnts = 10;

    this.game.events.emit(INCREASE_SCORE, startEnts);

    this.input.on('pointerdown', () => {
      // this.game.events.emit(COMPLETE_LEVEL, 1);

      this.game.events.emit(INCREASE_SCORE, startEnts);

      for (var i = 0; i < 10; ++i) {
        this.launch();
      }
    });

    this.blitter = this.add.blitter(0, 0, 'atlas');

    for (var i = 0; i < 100; ++i) {
      this.launch();
    }
  }

  update(time: number) {
    for (
      var index = 0, length = this.blitter.children.list.length;
      index < length;
      ++index
    ) {
      var bob = this.blitter.children.list[index];

      bob.data.vy += this.gravity;

      bob.y += bob.data.vy;
      bob.x += bob.data.vx;

      if (bob.x > screen.availWidth) {
        bob.x = window.innerWidth;
        bob.data.vx *= -bob.data.bounce;
      } else if (bob.x < 0) {
        bob.x = 0;
        bob.data.vx *= -bob.data.bounce;
      }

      if (bob.y > window.innerHeight) {
        bob.y = window.innerHeight;
        bob.data.vy *= -bob.data.bounce;
      }
    }
  }

  destroy() {
    // We want to keep the assets in the cache and leave the renderer for reuse.
    this.game.destroy(true);
  }

  launch() {
    this.idx++;

    if (this.idx === 38) {
      this.idx = 1;
    }

    if (this.idx < 10) {
      this.frame = 'veg0' + this.idx.toString();
    } else {
      this.frame = 'veg' + this.idx.toString();
    }

    const bob = this.blitter.create(0, 0, this.frame);

    bob.data.vx = Math.random() * 10;
    bob.data.vy = Math.random() * 10;
    bob.data.bounce = 0.8 + Math.random() * 0.3;
  }
}
