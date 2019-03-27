import React from 'react';
import 'phaser';
import { COMPLETE_LEVEL, INCREASE_SCORE, RESET_SCORE } from '../../actions';
import { GameScene } from './GameScene';
import { CurrentScoreContainer } from '../ui/CurrentScore';

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
export class GameView extends React.Component<Props> {
  game: any;

  componentDidMount() {
    var viewportwidth;
    var viewportheight;
    const dog = null;
    //   the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight

    if (typeof window.innerWidth != 'undefined') {
      (viewportwidth = window.innerWidth),
        (viewportheight = window.innerHeight);
    }

    // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    else if (
      typeof document.documentElement != 'undefined' &&
      typeof document.documentElement.clientWidth != 'undefined' &&
      document.documentElement.clientWidth != 0
    ) {
      (viewportwidth = document.documentElement.clientWidth),
        (viewportheight = document.documentElement.clientHeight);
    }

    // older versions of IE
    else {
      (viewportwidth = document.getElementsByTagName('body')[0].clientWidth),
        (viewportheight = document.getElementsByTagName('body')[0]
          .clientHeight);
    }

    const config: GameOptions = {
      type: Phaser.CANVAS,
      width: viewportwidth,
      height: viewportheight * 0.85,
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
      <div>
        <CurrentScoreContainer />
        <div id="game" />
      </div>
    );
  }
}

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
