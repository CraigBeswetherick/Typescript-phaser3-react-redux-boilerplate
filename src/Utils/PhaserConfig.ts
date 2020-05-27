export interface GameOptions {
  type: number;
  width: number;
  height: number;
  parent: string;
}

export function getPhaserConfig(scene: Phaser.Scene): GameOptions {
  return {
    type: Phaser.CANVAS,
    width: window.innerWidth,
    height: window.innerHeight * 0.9,
    parent: 'game',
  };
}
