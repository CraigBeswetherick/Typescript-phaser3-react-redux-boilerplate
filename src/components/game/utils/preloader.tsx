interface Props {
  currentLevel: number;
}

export class Preloader extends Phaser.Scene {
  props: any;
  background: Phaser.GameObjects.Image;
  preloaderBg: Phaser.GameObjects.Graphics;
  preloaderBar: Phaser.GameObjects.Graphics;

  constructor() {
    super({
      key: 'Preloader',
    });
  }

  init(props: Props) {
    console.log('Preloading' + props.currentLevel);

    this.props = props;
  }

  preload() {
    // check to see if loader graphics are already in the cache.
    // if not, load them
  }

  createLoaderGraphic() {
    this.background = this.add.image(
      0,
      0,
      'atlas' + this.props.currentLevel,
      'background'
    );

    const width: number = this.scale.gameSize.width * 0.5;
    const height: number = this.scale.gameSize.height * 0.2;
    const x: number = this.scale.gameSize.width / 2 + width;
    const y: number = this.scale.gameSize.height - height / 2;

    this.preloaderBg = this.add.graphics();
    this.preloaderBg.fillStyle(0xff0000);
    this.preloaderBg.fillRect(x, y, width, height);

    this.preloaderBar = this.add.graphics();
    this.preloaderBar.fillStyle(0x000000);
    this.preloaderBar.fillRect(x, y, width, height);
  }

  create() {
    this.createLoaderGraphic();

    this.load.atlas(
      'atlas' + this.props.currentLevel,
      'images/' + this.props.currentLevel + 'png',
      'images/' + this.props.currentLevel + '.json'
    );
  }

  updateLoaderGraphic() {}

  launchLevel() {
    this.game.scene.start(this.props.currentLevel);
  }

  destroy() {
    this.background.destroy();
    this.preloaderBg.destroy();
    this.preloaderBar.destroy();
  }
}
