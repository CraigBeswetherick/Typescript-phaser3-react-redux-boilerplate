import { Button } from '../Components/Game/Button';
import {
  GAME_SCALE,
  GAME_SCENE,
  UPGRADE_BUSINESS_SCENE,
  BUSINESS_SCENE,
} from './Constants';
import store from './Store';

export const addHeader = (scene: Phaser.Scene, text: string) => {
  const fontSize: number = 40 * GAME_SCALE;
  scene.add.text(50 * GAME_SCALE, 45 * GAME_SCALE, text, {
    fontFamily: 'Roboto',
    fontSize: fontSize,
    color: '#fff',
  });
};

export const checkButtons = (buttons: Array<Button>) => {
  buttons.forEach((button: Button) => {
    const isDisabled: boolean =
      button.dataRef.Cost > store.getState().currentScoreReducer.currentScore;
    if (isDisabled) {
      button.disableButton();
    }
  });
};

export const addCloseButton = (scene: Phaser.Scene, sceneId: string) => {
  const { width } = scene.sys.game.canvas;

  const btn = new Button(
    scene,
    width - 90 * GAME_SCALE,
    48 * GAME_SCALE,
    'atlas',
    () => {
      scene.game.scene.remove(sceneId);

      if (sceneId === UPGRADE_BUSINESS_SCENE) {
        scene.game.scene.resume(BUSINESS_SCENE);
      } else {
        scene.game.scene.resume(GAME_SCENE);
      }
    },
    'small-hover.png',
    'small-normal.png',
    'small-down.png',
    []
  );

  btn.scaleX = btn.scaleY = 0.35;
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
  const btn = new Button(
    scene,
    x,
    y,
    'atlas',
    () => {
      callback(index, data);
    },
    'hover.png',
    'normal.png',
    'down.png',
    labels,
    'disabled.png',
    isDisabled,
    data
  );

  return btn;
};
