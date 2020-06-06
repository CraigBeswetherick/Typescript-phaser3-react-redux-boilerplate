import { GameScene } from './GameScene';
import {
  PRELOADER_SCENE,
  GAME_SCENE,
  GAME_WIDTH,
  GAME_HEIGHT,
  setGameScale,
} from '../../Utils/constants';

interface Props {}

export class PreloaderScene extends Phaser.Scene {
  preloaderBg: Phaser.GameObjects.Graphics;
  preloaderBar: Phaser.GameObjects.Graphics;

  constructor() {
    super({
      key: PRELOADER_SCENE,
    });
  }

  createLoaderGraphic = () => {
    const width: number = this.scale.gameSize.width * 0.5;
    const height: number = this.scale.gameSize.height * 0.2;
    const x: number = this.scale.gameSize.width / 2 - width / 2;
    const y: number = this.scale.gameSize.height / 2 - height / 2;

    this.preloaderBg = this.add.graphics();
    this.preloaderBg.fillStyle(0xff0000);
    this.preloaderBg.fillRect(x, y, width, height);

    this.preloaderBar = this.add.graphics();
    this.preloaderBar.fillStyle(0x0000ff);
    this.preloaderBar.fillRect(x, y, width, height);
    this.preloaderBar.scaleX = 0;
  };

  create() {
    const { width, height } = this.sys.game.canvas;
    setGameScale(Math.min(width / GAME_WIDTH, height / GAME_HEIGHT));

    this.createLoaderGraphic();
    this.load.setCORS('anonymous');
    this.load.atlas('atlas', 'images/assets.png', 'images/assets.json');
    this.load.image('background', 'images/background.png');
    this.load.on('progress', this.updateLoaderGraphic);
    this.load.on('complete', this.handleLevelLoaded);
    this.load.start();
  }

  updateLoaderGraphic = (progress: number) => {
    this.preloaderBar.scaleX = progress;
  };

  handleLevelLoaded = () => {
    this.tweens.add({
      targets: this.preloaderBg,
      alpha: 0,
      delay: 500,
      duration: 1500,
      onComplete: () => {
        this.playGame();
      },
    });

    this.tweens.add({
      targets: this.preloaderBar,
      alpha: 0,
      delay: 500,
      duration: 1500,
    });
  };

  playGame = () => {
    this.game.scene.add(GAME_SCENE, new GameScene(), true);
    this.destroy();
  };

  destroy = () => {
    this.preloaderBg.destroy();
    this.preloaderBar.destroy();
  };
}
