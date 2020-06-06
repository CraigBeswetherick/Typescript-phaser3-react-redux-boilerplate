import React, { useEffect } from 'react';
import 'phaser';
import {
  INCREASE_SCORE,
  RESET_SCORE,
  INCREASE_DATE,
  BUY_BUSINESS,
  BUY_MANAGER,
} from '../../Actions';
import { CurrentScoreContainer } from '../UI/CurrentScore';
import { getPhaserConfig, GameOptions } from '../../Utils/PhaserConfig';
import { PreloaderScene } from './PreloaderScene';

interface Props {
  onIncreaseScore: Function;
  onResetScore: Function;
  onIncreaseDate: Function;
  onBuyBusiness: Function;
  onBuyManager: Function;
}

const GameView: React.FC<Props> = props => {
  const config: GameOptions = getPhaserConfig();
  useEffect(() => {
    const game: Phaser.Game = new Phaser.Game(config);

    game.scene.add('preloader', new PreloaderScene(), true);

    game.scale.scaleMode = Phaser.Scale.FIT;

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
  game.events.on(INCREASE_SCORE, (amount: number) => {
    props.onIncreaseScore(amount);
  });

  game.events.on(RESET_SCORE, () => {
    props.onResetScore();
  });

  game.events.on(INCREASE_DATE, () => {
    props.onIncreaseDate();
  });

  game.events.on(BUY_BUSINESS, (businessId: number) => {
    props.onBuyBusiness(businessId);
  });

  game.events.on(BUY_MANAGER, (managerId: number) => {
    props.onBuyManager(managerId);
  });
}

export default GameView;
