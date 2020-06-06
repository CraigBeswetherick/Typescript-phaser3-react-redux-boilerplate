import { INCREASE_SCORE, INCREASE_DATE } from '../../Actions';
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

export class GameScene extends Phaser.Scene {
  background: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: GAME_SCENE,
    });
  }

  create() {
    this.game.scene.remove(PRELOADER_SCENE);

    this.input.on('pointerdown', () => {
      this.game.events.emit(INCREASE_SCORE, 1);
    });

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

  openManagerScene = () => {
    this.game.scene.add(MANAGER_SCENE, ManagerScene, true, {
      isPurchasedScreen: false,
    });
  };

  openBusinessScene = () => {
    this.game.scene.add(BUSINESS_SCENE, BusinessScene, true, {
      isPurchasedScreen: false,
    });
  };

  openPurchasedManagerScene = () => {
    this.game.scene.add(MANAGER_SCENE, ManagerScene, true, {
      isPurchasedScreen: true,
    });
  };

  openPurchasedBusinessScene = () => {
    this.game.scene.add(BUSINESS_SCENE, BusinessScene, true, {
      isPurchasedScreen: true,
    });
  };

  addButtons() {
    const { width } = this.sys.game.canvas;

    this.addButton(
      40 * GAME_SCALE,
      30 * GAME_SCALE,
      this.openPurchasedManagerScene,
      'Purchased\nManagers'
    );
    this.addButton(
      40 * GAME_SCALE,
      120 * GAME_SCALE,
      this.openPurchasedBusinessScene,
      'Purchased\nBusinesses'
    );

    this.addButton(
      width - 200 * GAME_SCALE,
      30 * GAME_SCALE,
      this.openManagerScene,
      'Managers'
    );
    this.addButton(
      width - 200 * GAME_SCALE,
      120 * GAME_SCALE,
      this.openBusinessScene,
      'Businesses'
    );
  }

  addButton(x: number, y: number, callback: Function, text: string) {
    const btn = new Button(
      this,
      x,
      y,
      'atlas',
      () => {
        callback();
      },
      'hover.png',
      'normal.png',
      'down.png'
    );
    btn.setOrigin(0);
    btn.scaleX = btn.scaleY = 0.6 * GAME_SCALE;
    this.add.existing(btn);
    const textX = 97 * GAME_SCALE;

    this.addText(x + textX, y + 41 * GAME_SCALE, text);
  }

  addText = (x: number, y: number, text: string) => {
    const textField = this.add.text(x, y, text, {
      fontFamily: 'Roboto',
      fontSize: 24 * GAME_SCALE,
      color: '#000',
    });

    textField.displayOriginX = textField.displayOriginY = 0.5;
    textField.x -= textField.width / 2;
    textField.y -= textField.height / 2;
  };

  update() {}

  destroy() {
    // We want to keep the assets in the cache and leave the renderer for reuse.
    this.game.destroy(true);
  }

  launch() {}
}
