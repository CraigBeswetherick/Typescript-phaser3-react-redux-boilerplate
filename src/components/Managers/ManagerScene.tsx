import { BUY_MANAGER } from '../../Actions';
import { MANAGER_SCENE, GAME_SCALE, GAME_HEIGHT } from '../../Utils/constants';
import {
  addHeader,
  addCloseButton,
  addBackground,
  addButton,
} from '../../Utils/UIUtils';
import store from '../../Utils/Store';
import { Manager } from '../../Reducers/CurrentScore';

export class ManagerScene extends Phaser.Scene {
  background: Phaser.GameObjects.Graphics;
  isPurchasedScreen: boolean;

  constructor() {
    super({
      key: MANAGER_SCENE,
    });
  }

  init(data: any) {
    const { isPurchasedScreen } = data;
    this.isPurchasedScreen = isPurchasedScreen;
  }

  create() {
    this.background = addBackground(this);
    addHeader(this, 'Choose a Manager');
    this.addButtons();
  }

  selectManager = (index: number, btn: Phaser.GameObjects.Container) => {
    if (this.isPurchasedScreen) {
      this.handleUpgradeManager(index, btn);
    } else {
      this.handleBuyManager(index, btn);
    }
  };

  handleBuyManager(index: number, btn: Phaser.GameObjects.Container) {
    this.game.events.emit(BUY_MANAGER, index);
    btn.destroy();
  }

  handleUpgradeManager(index: number, btn: Phaser.GameObjects.Container) {}

  addButtons() {
    const topMargin: number = 100 * GAME_SCALE;
    const padding = 195 * GAME_SCALE;
    let x: number = 45 * GAME_SCALE;
    let y: number = topMargin;

    const { height } = this.sys.game.canvas;
    const extraHeight: number = (height - GAME_HEIGHT * GAME_SCALE) / 4;

    y += extraHeight;

    let data: Array<Manager>;
    if (this.isPurchasedScreen) {
      data = store.getState().currentScoreReducer.purchasedManagers;
    } else {
      data = store.getState().currentScoreReducer.managers;
    }

    data.forEach((data: Manager, index: number) => {
      addButton(
        x,
        y + 100 * index * GAME_SCALE,
        [
          data.Name,
          ' Cost $' + data.Cost.toString(),
          ' Skill Level: ' + data.Bonus.toString() + '/10',
        ],
        this.selectManager,
        index,
        this
      );

      if (index === 1 || index === 3) {
        x += padding;
        y -= 200 * GAME_SCALE;
      }
    });

    addCloseButton(this, MANAGER_SCENE);
  }

  destroy() {}
}