import {
  UPGRADE_BUSINESS_SCENE,
  GAME_SCALE,
  BUSINESS_SCENE,
} from '../../Utils/Constants';
import {
  addBackground,
  addHeader,
  addText,
  addCloseButton,
  addButton,
} from '../../Utils/UIUtils';
import { Business } from '../../Reducers/Business';
import { initRotateOverlay } from '../../Utils/RotateOverlay';
import store from '../../Utils/Store';
import { upgradeBusiness } from '../../Actions';
import { createEmitter } from '../../Utils/Particles';
import { Button } from '../Game/Button';

export class UpgradeBusinessScene extends Phaser.Scene {
  background: Phaser.GameObjects.Graphics;
  business: Business;
  upgradeButton: Button;

  constructor() {
    super({
      key: UPGRADE_BUSINESS_SCENE,
    });
  }

  init(data: any) {
    const { business } = data;
    this.business = business;
  }

  create() {
    this.background = addBackground(this);
    addHeader(this, this.business.Name);

    this.addTextfields();

    addCloseButton(this, UPGRADE_BUSINESS_SCENE);
    this.addUpgradeButton();
    initRotateOverlay(this, 4);
  }

  addTextfields() {
    const xPadding: number = 210 * GAME_SCALE;
    const yPadding: number = 70 * GAME_SCALE;
    const textSize: number = 20 * GAME_SCALE;

    addText(
      xPadding,
      yPadding + 50 * GAME_SCALE,
      'Improvement Cost: ' +
        this.business.UpgradeImprovementCost * this.business.CurrentLevel,
      this,
      '#fff',
      textSize
    );

    const currentEarnings: number =
      this.business.BaseEarnings * this.business.CurrentLevel;
    addText(
      xPadding,
      yPadding + 80 * GAME_SCALE,
      'Current Earnings: ' + currentEarnings,
      this,
      '#fff',
      textSize
    );

    addText(
      xPadding,
      yPadding + 110 * GAME_SCALE,
      'Current Upgrade Level: ' + this.business.CurrentLevel + '/5',
      this,
      '#fff',
      textSize
    );
  }

  addUpgradeButton() {
    let isDisabled =
      this.business.UpgradeImprovementCost >
      store.getState().currentScoreReducer.currentScore;

    if (this.business.CurrentLevel >= 5) {
      isDisabled = true;
    }

    this.upgradeButton = addButton(
      400 * GAME_SCALE,
      120 * GAME_SCALE,
      [
        'Upgrade',
        this.business.Name,
        'Cost: ' +
          this.business.UpgradeImprovementCost * this.business.CurrentLevel,
      ],
      this.handleUpgradeBusiness,
      0,
      this,
      isDisabled,
      this.business
    );
  }

  handleUpgradeBusiness = () => {
    store.dispatch(upgradeBusiness(this.business));
    this.game.scene.remove(UPGRADE_BUSINESS_SCENE);
    this.game.scene.resume(BUSINESS_SCENE);
  };
}
