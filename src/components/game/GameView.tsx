import React from 'react';
import 'phaser';
import { COMPLETE_LEVEL, INCREASE_SCORE, RESET_SCORE } from '../../Actions';
import { CurrentScoreContainer } from '../UI/CurrentScore';
import { getPhaserConfig, GameOptions } from '../../Utils/PhaserConfig';
import { GameScene } from './GameScene';

interface Props {
  onIncreaseScore: Function;
  onCompleteLevel: Function;
  onResetScore: Function;
  currentLevel: number;
}

const GameView: React.FC<Props> = props => {
  const config: GameOptions = getPhaserConfig(
    new GameScene(props.currentLevel)
  );

  console.log(config);

  const game: Phaser.Game = new Phaser.Game(config);

  game.scale.scaleMode = Phaser.Scale.RESIZE;

  addListeners(game, props);

  return (
    <div>
      <CurrentScoreContainer />
      <div id="game" />
    </div>
  );
};

function addListeners(game: Phaser.Game, props: Props) {
  // This will be required for every custom event we want, unless i can figure out a way of doing it dynamically.
  game.events.on(COMPLETE_LEVEL, (level: number) => {
    // do some cool animation.
    props.onCompleteLevel();
  });

  game.events.on(INCREASE_SCORE, (amount: number) => {
    props.onIncreaseScore(amount);
  });

  game.events.on(RESET_SCORE, () => {
    props.onResetScore();
  });
}

export default GameView;
