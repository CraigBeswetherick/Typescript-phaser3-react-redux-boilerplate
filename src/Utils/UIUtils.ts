import { Button } from '../Components/Game/Button';
import { GAME_SCALE, GAME_SCENE } from './constants';

export const addHeader = (scene: Phaser.Scene, text: string) => {
  const fontSize: number = 40 * GAME_SCALE;
  scene.add.text(50 * GAME_SCALE, 45 * GAME_SCALE, text, {
    fontFamily: 'Roboto',
    fontSize: fontSize,
    color: '#fff',
  });
};

export const addCloseButton = (scene: Phaser.Scene, sceneId: string) => {
  const { width } = scene.sys.game.canvas;

  const btn = new Button(
    scene,
    width,
    43 * GAME_SCALE,
    'atlas',
    () => {
      scene.game.scene.remove(sceneId);
      scene.game.scene.resume(GAME_SCENE);
    },
    'small-hover.png',
    'small-normal.png',
    'small-down.png'
  );
  btn.setOrigin(0);
  btn.scaleX = btn.scaleY = 0.25 * GAME_SCALE;
  btn.x -= 95 * GAME_SCALE;
  scene.add.existing(btn);
};

export const addText = (
  x: number,
  y: number,
  text: string,
  scene: Phaser.Scene,
  color: string = '#000',
  fontSize: number = 16 * GAME_SCALE
) => {
  const textField = scene.add.text(x, y, text, {
    fontFamily: 'Roboto',
    fontSize,
    color,
  });

  textField.displayOriginX = textField.displayOriginY = 0.5;
  textField.x -= textField.width / 2;
  textField.setAlign('center');

  return textField;
};

export const addBackground = (scene: Phaser.Scene) => {
  const padding: number = 32;
  const { width, height } = scene.sys.game.canvas;
  let background: Phaser.GameObjects.Graphics;
  background = scene.add.graphics();
  background.fillStyle(0x000, 0.7);
  background.fillRoundedRect(
    padding,
    padding,
    width - padding * 2,
    height - padding * 2,
    padding
  );

  background.setInteractive(true);
  background.input.hitAreaCallback = () => {};
  background.input.alwaysEnabled = true;

  return background;
};

export const addButton = (
  x: number,
  y: number,
  labels: Array<string>,
  callback: Function,
  index: number,
  scene: Phaser.Scene,
  isDisabled: boolean = false,
  data: any = null
) => {
  let container: Phaser.GameObjects.Container = scene.add.container(x, y);

  const btn = new Button(
    scene,
    0,
    0,
    'atlas',
    () => {
      callback(index, container, data);
    },
    'hover.png',
    'normal.png',
    'down.png',
    'disabled.png',
    isDisabled
  );
  btn.setOrigin(0);
  btn.scaleX = 0.6 * GAME_SCALE;
  btn.scaleY = 0.65 * GAME_SCALE;
  container.add(btn);

  const textX = 90 * GAME_SCALE;
  const topPadding: number = btn.height / labels.length - 30;

  labels.forEach((label: string, index: number) => {
    container.add(
      addText(
        textX,
        topPadding * GAME_SCALE + 18 * index * GAME_SCALE,
        label,
        scene
      )
    );
  });

  return btn;
};
