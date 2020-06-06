import { BUY_BUSINESS } from '../../Actions';
import { BUSINESS_SCENE, GAME_SCALE, GAME_HEIGHT } from '../../Utils/constants';
import {
  addHeader,
  addCloseButton,
  addBackground,
  addButton,
} from '../../Utils/UIUtils';
import store from '../../Utils/Store';
import { Business } from '../../Reducers/CurrentScore';

export class BusinessScene extends Phaser.Scene {
  background: Phaser.GameObjects.Graphics;
  isPurchasedScreen: boolean;

  constructor() {
    super({
      key: BUSINESS_SCENE,
    });
  }

  init(data: any) {
    const { isPurchasedScreen } = data;
    this.isPurchasedScreen = isPurchasedScreen;
  }

  create() {
    this.background = addBackground(this);
    addHeader(this, 'Choose a Business');
    this.addButtons();
  }

  selectBusiness = (index: number, btn: Phaser.GameObjects.Container) => {
    if (this.isPurchasedScreen) {
      this.upgradeBusiness(index, btn);
    } else {
      this.purchaseBusiness(index, btn);
    }
  };

  purchaseBusiness = (index: number, btn: Phaser.GameObjects.Container) => {
    this.game.events.emit(BUY_BUSINESS, index);
    btn.destroy();
  };

  upgradeBusiness = (index: number, btn: Phaser.GameObjects.Container) => {};

  addButtons() {
    const topMargin: number = 100 * GAME_SCALE;
    const padding = 195 * GAME_SCALE;
    let x: number = 45 * GAME_SCALE;
    let y: number = topMargin;

    const { height } = this.sys.game.canvas;
    const extraHeight: number = (height - GAME_HEIGHT * GAME_SCALE) / 4;

    y += extraHeight;

    let data: Array<Business>;
    if (this.isPurchasedScreen) {
      data = store.getState().currentScoreReducer.purchasedBusinesses;
    } else {
      data = store.getState().currentScoreReducer.businesses;
    }

    data.forEach((data: Business, index: number) => {
      addButton(
        x,
        y + 100 * index * GAME_SCALE,
        [
          data.Name,
          ' Cost $' + data.Cost.toString(),
          ' Earnings : ' + data.BaseEarnings,
        ],
        this.selectBusiness,
        index,
        this
      );

      if (index === 1 || index === 3) {
        x += padding;
        y -= 200 * GAME_SCALE;
      }
    });

    addCloseButton(this, BUSINESS_SCENE);
  }

  destroy() {}
}
