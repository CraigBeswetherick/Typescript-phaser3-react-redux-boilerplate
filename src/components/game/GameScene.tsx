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
} from '../../Utils/constants';
import { addText } from '../../Utils/UIUtils';

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

    this.game.scale.addListener(Phaser.Scale.Events.ORIENTATION_CHANGE, () => {
      this.checkOrientation();
    });
  }

  checkOrientation() {
    if (this.game.scale.isPortrait) {
      this.createRotateScreen();
    } else {
      if (this.rotateDeviceContainer) {
        this.rotateDeviceContainer.destroy();
        this.rotateDeviceContainer = undefined;
      }
    }
  }

  createRotateScreen() {
    if (this.rotateDeviceContainer) {
      return;
    }

    this.rotateDeviceContainer = this.add.container(0, 0);

    const { width, height } = this.sys.game.canvas;
    let rotateDeviceText: Phaser.GameObjects.Text = addText(
      width / 2,
      height * 0.6,
      'Please rotate your device',
      this,
      '#FFF',
      28
    );

    rotateDeviceText.x -= rotateDeviceText.width / 2;

    let background: Phaser.GameObjects.Graphics = this.add.graphics();
    background.fillStyle(0x000, 1);
    background.fillRect(0, 0, width, height);

    this.rotateDeviceContainer.add(background);
    this.rotateDeviceContainer.add(rotateDeviceText);
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
      30 * GAME_SCALE,
      () => {
        this.openSceneOverlay(MANAGER_SCENE, new ManagerScene(), true);
      },
      'Purchased\nManagers'
    );
    this.addButton(
      40 * GAME_SCALE,
      120 * GAME_SCALE,
      () => {
        this.openSceneOverlay(BUSINESS_SCENE, new BusinessScene(), true);
      },
      'Purchased\nBusinesses'
    );

    this.addButton(
      width - 200 * GAME_SCALE,
      30 * GAME_SCALE,
      () => {
        this.openSceneOverlay(MANAGER_SCENE, new ManagerScene(), false);
      },
      'Hire\nManagers'
    );
    this.addButton(
      width - 200 * GAME_SCALE,
      120 * GAME_SCALE,
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

  update() {}

  destroy() {
    // We want to keep the assets in the cache and leave the renderer for reuse.
    this.game.destroy(true);
  }

  launch() {}
}
