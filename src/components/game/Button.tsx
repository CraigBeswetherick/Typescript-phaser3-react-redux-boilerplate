export class Button extends Phaser.GameObjects.Sprite {
  onInputOver = () => {};
  onInputOut = () => {};
  onInputUp = () => {};
  disabledFrame: string;
  isDisabled: boolean;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    actionOnClick = () => {},
    overFrame: string,
    outFrame: string,
    downFrame: string,
    disabledFrame: string = 'disabled.png',
    isDisabled: boolean = false
  ) {
    super(scene, x, y, texture);

    this.disabledFrame = disabledFrame;

    if (isDisabled) {
      this.disableButton();
      return;
    }

    this.setFrame(outFrame)
      .setInteractive({ useHandCursor: true })

      .on('pointerover', () => {
        this.onInputOver();
        this.setFrame(overFrame);
      })
      .on('pointerdown', () => {
        actionOnClick();
        this.setFrame(downFrame);
      })
      .on('pointerup', () => {
        this.onInputUp();
        this.setFrame(overFrame);
      })
      .on('pointerout', () => {
        this.onInputOut();
        this.setFrame(outFrame);
      });
  }

  disableButton = () => {
    this.isDisabled = true;
    this.setFrame(this.disabledFrame);
    this.setInteractive({ useHandCursor: false });
  };
}
