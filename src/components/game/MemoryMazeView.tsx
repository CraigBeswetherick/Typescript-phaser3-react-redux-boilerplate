import React, { Component } from 'react';
import 'phaser';
import { COMPLETE_LEVEL, INCREASE_SCORE, RESET_SCORE } from '../../actions';
import { GameScene } from './GameScene';
import { CurrentScoreContainer } from '../ui/CurrentScore';
import { getMaxListeners } from 'cluster';

interface Props {
  onIncreaseScore: Function;
  onCompleteLevel: Function;
  onResetScore: Function;
  currentLevel: number;
}

interface GameOptions {
  type: number;
  width: number;
  height: number;
  parent: string;
  scene: any;
}
export class MemoryMazeView extends React.Component<Props> {
  game: any;

  componentDidMount() {
    const config: GameOptions = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'game',
      scene: GameScene
    };

    this.game = new Phaser.Game(config);
    addListeners(this.game, this.props);
  }

  componentDidUpdate() {
    this.game.scene.start('GameScene', this.props);
  }

  render() {
    return (
      <div id="game">
        <CurrentScoreContainer />
      </div>
    );
  }
}

function addListeners(game: Phaser.Game, props: Props) {
  // This will be required for every custom event we want, unless i can figure out a way of doing it dynamically.
  game.events.on(COMPLETE_LEVEL, (level: number) => {
    //do some cool animation.
    props.onCompleteLevel();
  });

  game.events.on(INCREASE_SCORE, () => {
    props.onIncreaseScore(1);
  });

  game.events.on(RESET_SCORE, () => {
    props.onResetScore();
  });
}
