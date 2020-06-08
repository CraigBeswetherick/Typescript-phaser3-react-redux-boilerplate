import { INCREASE_DATE } from '../../Actions';
import { ManagerScene } from '../Managers/ManagerScene';
import { BusinessScene } from '../Business/BusinessScene';
import { Button } from './Button';
import {
  GAME_SCENE,
  PRELOADER_SCENE,
  MANAGER_SCENE,
  BUSINESS_SCENE,
  GAME_SCALE,
} from '../../Utils/Constants';
import { addText } from '../../Utils/UIUtils';
import { initRotateOverlay } from '../../Utils/RotateOverlay';

export class GameScene extends Phaser.Scene {
  background: Phaser.GameObjects.Image;
  rotateDeviceContainer?: Phaser.GameObjects.Container;

  constructor() {
    super({
      key: GAME_SCENE,
    });
  }

  create() {
    this.game.scene.remove(PRELOADER_SCENE);

    this.tweens.addCounter({
      to: 1,
      from: 0,
      ease: 'Power1',
      duration: 500,
      yoyo: true,
      repeat: -1,
      onYoyo: () => {
        this.game.events.emit(INCREASE_DATE);
      },
    });

    this.addBackground();
    this.addButtons();

    initRotateOverlay(this, 1);
  }

  addBackground() {
    const { width, height } = this.sys.game.canvas;
    this.background = this.add.image(width / 2, height / 2, 'background');

    const scale: number = Math.max(
      width / this.background.width,
      height / this.background.height
    );

    this.background.scaleX = scale;
    this.background.scaleY = scale;
  }

  openSceneOverlay = (
    overlayId: string,
    scene: Phaser.Scene,
    isPurchasedScreen: boolean
  ) => {
    this.game.scene.add(overlayId, scene, true, {
      isPurchasedScreen,
    });

    this.scene.pause();
  };

  addButtons() {
    const { width } = this.sys.game.canvas;

    this.addButton(
      40 * GAME_SCALE,
      100 * GAME_SCALE,
      () => {
        this.openSceneOverlay(MANAGER_SCENE, new ManagerScene(), true);
      },
      'Purchased\nManagers'
    );
    this.addButton(
      40 * GAME_SCALE,
      200 * GAME_SCALE,
      () => {
        this.openSceneOverlay(BUSINESS_SCENE, new BusinessScene(), true);
      },
      'Purchased\nBusinesses'
    );

    this.addButton(
      width - 200 * GAME_SCALE,
      100 * GAME_SCALE,
      () => {
        this.openSceneOverlay(MANAGER_SCENE, new ManagerScene(), false);
      },
      'Hire\nManagers'
    );
    this.addButton(
      width - 200 * GAME_SCALE,
      200 * GAME_SCALE,
      () => {
        this.openSceneOverlay(BUSINESS_SCENE, new BusinessScene(), false);
      },
      'Buy\nBusinesses'
    );
  }

  addButton(x: number, y: number, callback: Function, text: string) {
    new Button(
      this,
      x,
      y,
      'atlas',
      () => {
        callback();
      },
      'hover.png',
      'normal.png',
      'down.png',
      []
    );

    const textX = 97 * GAME_SCALE;

    addText(x + textX, y + 24 * GAME_SCALE, text, this);
  }

  destroy() {
    // We want to keep the assets in the cache and leave the renderer for reuse.
    this.game.destroy(true);
  }
}
