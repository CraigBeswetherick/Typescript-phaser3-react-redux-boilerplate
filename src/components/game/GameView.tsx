import React from "react";
import "phaser";
import { COMPLETE_LEVEL, INCREASE_SCORE, RESET_SCORE } from "../../actions";
import { GameScene } from "./GameScene";
import { CurrentScoreContainer } from "../ui/CurrentScore";

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
  game: Phaser.Game;

  constructor(props: Props) {
    super(props);

    const config: GameOptions = {
      type: Phaser.CANVAS,
      width: window.innerWidth,
      height: window.innerHeight * 0.9,
      parent: "game",
      scene: GameScene
    };

    this.game = new Phaser.Game(config);

    this.game.scale.scaleMode = Phaser.Scale.RESIZE;

    addListeners(this.game, this.props);
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
