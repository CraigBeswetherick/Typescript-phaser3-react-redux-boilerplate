import { INCREASE_SCORE, COMPLETE_LEVEL } from '../../actions';

interface Props {
  currentLevel: number;
  currentScore: number;
}

export class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene'
    });
  }

  init(props: Props) {
    console.log(props.currentLevel, props.currentScore);
  }

  preload() {
    //TODO: handle preload
  }

  create() {
    //TODO: handle create
    console.log('preload game');
    this.input.on('pointerdown', () => {
      this.game.events.emit(COMPLETE_LEVEL, 1);
      this.game.events.emit(INCREASE_SCORE, 1);
    });
  }

  update(time: number) {
    //TODO: handle update
  }

  destroy() {
    // We want to keep the assets in the cache and leave the renderer for reuse.
    this.game.destroy(true);
  }
}
