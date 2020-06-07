import { BUY_BUSINESS } from '../../Actions';
import { BUSINESS_SCENE, GAME_SCALE, GAME_HEIGHT } from '../../Utils/constants';
import {
  addHeader,
  addCloseButton,
  addBackground,
  addButton,
  checkButtons,
} from '../../Utils/UIUtils';
import store from '../../Utils/Store';
import { Business } from '../../Reducers/Business';
import { Button } from '../Game/Button';
import { initRotateOverlay } from '../../Utils/RotateOverlay';

export class BusinessScene extends Phaser.Scene {
  background: Phaser.GameObjects.Graphics;
  isPurchasedScreen: boolean;
  buttons: Array<Button> = [];

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

    initRotateOverlay(this, 2);
  }

  selectBusiness = (index: number, btn: Button, business: Business) => {
    if (this.isPurchasedScreen) {
      this.upgradeBusiness(index, btn, business);
    } else {
      this.purchaseBusiness(index, btn, business);
    }
  };

  purchaseBusiness = (index: number, btn: Button, business: Business) => {
    this.game.events.emit(BUY_BUSINESS, index, business);
    this.buttons.splice(this.buttons.indexOf(btn), 1);
    checkButtons(this.buttons);
    btn.destroy();
  };

  upgradeBusiness = (
    index: number,
    btn: Phaser.GameObjects.Container,
    business: Business
  ) => {
    checkButtons(this.buttons);
  };

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
      data = store.getState().businessReducer.purchasedBusinesses;
    } else {
      data = store.getState().businessReducer.businesses;
    }

    data.forEach((data: Business, index: number) => {
      let button = addButton(
        x,
        y + 100 * index * GAME_SCALE,
        [
          data.Name,
          ' Cost $' + data.Cost.toString(),
          ' Earnings : ' + data.BaseEarnings,
        ],
        () => {
          this.selectBusiness(index, button, data);
        },
        index,
        this,
        data.Cost > store.getState().currentScoreReducer.currentScore &&
          !this.isPurchasedScreen,
        data
      );

      if (index === 1 || index === 3) {
        x += padding;
        y -= 200 * GAME_SCALE;
      }

      this.buttons.push(button);
    });

    addCloseButton(this, BUSINESS_SCENE);
  }
}
