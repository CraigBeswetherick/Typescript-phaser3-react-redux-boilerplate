import history from '../../Utils/History';

interface Props {
  currentLevel: number;
}

export class PreloaderScene extends Phaser.Scene {
  currentLevel: number;
  preloaderBg: Phaser.GameObjects.Graphics;
  preloaderBar: Phaser.GameObjects.Graphics;

  constructor(currentLevel: number) {
    super({
      key: 'Preloader',
    });

    this.currentLevel = currentLevel;
  }

  createLoaderGraphic = () => {
    const width: number = this.scale.gameSize.width * 0.5;
    const height: number = this.scale.gameSize.height * 0.2;
    const x: number = this.scale.gameSize.width / 2 - width / 2;
    const y: number = this.scale.gameSize.height / 2 - height / 2;

    console.log(x, y, width, height);
    this.preloaderBg = this.add.graphics();
    this.preloaderBg.fillStyle(0xff0000);
    this.preloaderBg.fillRect(x, y, width, height);

    this.preloaderBar = this.add.graphics();
    this.preloaderBar.fillStyle(0x0000ff);
    this.preloaderBar.fillRect(x, y, width, height);
    this.preloaderBar.scaleX = 0;
  };

  create() {
    this.createLoaderGraphic();

    this.load.atlas(
      'atlas' + this.currentLevel,
      'images/' + this.currentLevel + '.png',
      'images/' + this.currentLevel + '.json'
    );

    this.load.start();
    this.load.on('progress', this.updateLoaderGraphic);
    this.load.on('complete', this.handleLevelLoaded);
    console.log('loading assets for level ' + this.currentLevel);
  }

  updateLoaderGraphic = (progress: number) => {
    console.log(progress);
    this.preloaderBar.scaleX = progress;
  };

  handleLevelLoaded = () => {
    history.push('/game');
  };

  destroy = () => {
    this.preloaderBg.destroy();
    this.preloaderBar.destroy();
  };
}
