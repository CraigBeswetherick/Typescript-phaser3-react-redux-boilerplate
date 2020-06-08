import React, { useEffect } from 'react';
import 'phaser';
import { INCREASE_DATE, BUY_BUSINESS, BUY_MANAGER } from '../../Actions';
import { CurrentScoreContainer } from '../UI/CurrentScore';
import { getPhaserConfig, GameOptions } from '../../Utils/PhaserConfig';
import { PreloaderScene } from './PreloaderScene';
import { Manager } from '../../Reducers/Managers';
import { Business } from '../../Reducers/Business';
import store from '../../Utils/Store';

interface Props {
  onIncreaseDate: Function;
  onBuyBusiness: Function;
  onBuyManager: Function;
}

const GameView: React.FC<Props> = props => {
  const config: GameOptions = getPhaserConfig();
  useEffect(() => {
    const game: Phaser.Game = new Phaser.Game(config);

    game.scene.add('preloader', new PreloaderScene(), true);

    addListeners(game, props);
  });

  return (
    <div>
      <CurrentScoreContainer />
      <div id="game" />
    </div>
  );
};

function addListeners(game: Phaser.Game, props: Props) {
  game.events.on(INCREASE_DATE, () => {
    props.onIncreaseDate(
      store.getState().businessReducer.purchasedBusinesses,
      store.getState().managerReducer.managers
    );
  });

  game.events.on(BUY_BUSINESS, (businessId: number, business: Business) => {
    props.onBuyBusiness(businessId, business);
  });

  game.events.on(BUY_MANAGER, (managerId: number, manager: Manager) => {
    props.onBuyManager(managerId, manager);
  });
}

export default GameView;
