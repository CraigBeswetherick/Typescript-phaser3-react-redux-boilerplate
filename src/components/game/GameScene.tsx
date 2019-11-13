import { INCREASE_SCORE, COMPLETE_LEVEL } from "../../actions";

interface Props {
  currentLevel: number;
}

export class GameScene extends Phaser.Scene {
  blitter!: Phaser.GameObjects.Blitter;
  gravity: number = 0.5;
  idx: number = 1;
  numbers: Array<number> = [];

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(props: Props) {
    console.log(props.currentLevel);
  }

  preload() {
    this.load.atlas("atlas", "images/veg.png", "images/veg.json");
  }

  create() {
    const startEnts = 10;

    this.game.events.emit(INCREASE_SCORE, startEnts);

    this.input.on("pointerdown", () => {
      // this.game.events.emit(COMPLETE_LEVEL, 1);

      this.game.events.emit(INCREASE_SCORE, startEnts);

      for (var i = 0; i < 10; ++i) {
        this.launch();
      }
    });

    this.blitter = this.add.blitter(0, 0, "atlas");

    for (var i = 0; i < 100; ++i) {
      this.launch();
    }
  }

  checkScale = () => {
    var gameDiv = document.getElementById("game");
    if (gameDiv) {
      console.log(gameDiv.clientHeight, this.game.renderer.height);

      if (gameDiv.clientHeight > this.game.renderer.height) {
        gameDiv.style.height = this.game.renderer.height.toString() + "px";
        console.log("set");
      }
    }
  };

  update() {
    for (
      var index = 0, length = this.blitter.children.list.length;
      index < length;
      ++index
    ) {
      var bob: Phaser.GameObjects.Bob = this.blitter.children.list[index];

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
        "atlas",
        "veg0" + this.idx.toString()
      );
    } else {
      chosenFrame = this.textures.getFrame(
        "atlas",
        "veg" + this.idx.toString()
      );
    }

    const bob: Phaser.GameObjects.Bob = this.blitter.create(0, 0, chosenFrame);

    bob.data.chosenFrame = chosenFrame;
    bob.data.vx = Math.random() * 10;
    bob.data.vy = Math.random() * 10;
    bob.data.bounce = 0.8 + Math.random() * 0.3;
  }
}
