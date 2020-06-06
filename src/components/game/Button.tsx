export class Button extends Phaser.GameObjects.Sprite {
  onInputOver = () => {};
  onInputOut = () => {};
  onInputUp = () => {};

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    actionOnClick = () => {},
    overFrame: string,
    outFrame: string,
    downFrame: string
  ) {
    super(scene, x, y, texture);

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
}
