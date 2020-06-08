import { GAME_SCALE } from '../../Utils/Constants';
import { addText } from '../../Utils/UIUtils';

export class Button extends Phaser.GameObjects.Container {
  onInputOver = () => {};
  onInputOut = () => {};
  onInputUp = () => {};
  disabledFrame: string;
  isDisabled: boolean;
  dataRef?: any;
  background: Phaser.GameObjects.Sprite;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    actionOnClick = () => {},
    overFrame: string,
    outFrame: string,
    downFrame: string,
    labels: Array<string>,
    disabledFrame: string = 'disabled.png',
    isDisabled: boolean = false,
    dataRef?: any
  ) {
    super(scene, x, y);

    scene.add.existing(this);

    this.background = new Phaser.GameObjects.Sprite(scene, 0, 0, texture);
    this.add(this.background);
    this.background.setOrigin(0);
    this.background.scaleX = 0.6 * GAME_SCALE;
    this.background.scaleY = 0.65 * GAME_SCALE;

    this.dataRef = dataRef;

    const textX = 90 * GAME_SCALE;
    const topPadding: number = this.background.height / labels.length - 30;

    labels.forEach((label: string, index: number) => {
      this.add(
        addText(
          textX,
          topPadding * GAME_SCALE + 18 * index * GAME_SCALE,
          label,
          scene
        )
      );
    });

    this.disabledFrame = disabledFrame;

    if (isDisabled) {
      this.disableButton();
      return;
    }

    this.background.setFrame(outFrame);
    this.background.setInteractive({ useHandCursor: true });

    this.background
      .on('pointerover', () => {
        this.onInputOver();
        this.background.setFrame(overFrame);
      })
      .on('pointerdown', () => {
        actionOnClick();
        this.background.setFrame(downFrame);
      })
      .on('pointerup', () => {
        this.onInputUp();
        this.background.setFrame(overFrame);
      })
      .on('pointerout', () => {
        this.onInputOut();
        this.background.setFrame(outFrame);
      });
  }

  disableButton = () => {
    this.isDisabled = true;
    this.background.setFrame(this.disabledFrame);
    this.background.disableInteractive();
  };
}
