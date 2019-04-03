import React from 'react';
import * as PIXI from 'pixi.js';
import { COMPLETE_LEVEL, INCREASE_SCORE, RESET_SCORE } from '../../actions';
import { CurrentScoreContainer } from '../ui/CurrentScore';
import Bunny from './entities/Bunny';
import './GameView.scss';

interface Props {
  onIncreaseScore: Function;
  onCompleteLevel: Function;
  onResetScore: Function;
  currentLevel: number;
}

export class GameView extends React.Component<Props> {
  app: PIXI.Application;
  isAdding: boolean = false;
  bounds: PIXI.Rectangle;
  bunnyList: Array<Bunny>;
  bunniesToAddEachClick: number = 10000;
  maxBunnies: number = 100000;

  batchContainer: PIXI.particles.ParticleContainer;

  constructor(props: Props) {
    super(props);

    this.bounds = new PIXI.Rectangle(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );

    const config = {
      width: this.bounds.right, // default: 800
      height: this.bounds.bottom, // default: 600
      antialias: false, // default: false
      transparent: false, // default: false
      resolution: 1 //Math.min(Math.floor(window.devicePixelRatio), 2) // default: 1
    };

    this.app = new PIXI.Application(config);

    this.app.renderer.view.style.position = 'absolute';
    this.app.renderer.view.style.display = 'block';
    this.app.renderer.autoResize = true;
    this.app.renderer.resize(window.innerWidth, window.innerHeight);

    this.bunnyList = [];

    const batchProps = {
      vertices: false,
      position: true,
      rotation: false,
      uvs: false,
      tint: false
    };

    this.batchContainer = new PIXI.particles.ParticleContainer(
      this.maxBunnies,
      batchProps,
      this.maxBunnies,
      true
    );

    this.app.stage.addChild(this.batchContainer);

    this.addListeners();
  }

  componentDidMount = () => {
    const appDiv = document.getElementById('app')!;
    appDiv.appendChild(this.app.view);

    PIXI.loader
      .add('http://localhost:3000/images/veg.json')
      .load(this.onAssetLoadComplete);
  };

  onAssetLoadComplete = () => {
    this.addBunny(this.maxBunnies);
  };

  componentDidUpdate = () => {
    // if current level changes, bonus round or something, we can re-init pixi here also.
  };

  render = () => {
    return (
      <div>
        <CurrentScoreContainer />
        <div id="app" />
      </div>
    );
  };

  update = (delta: number) => {
    let i = 0;
    const length = this.bunnyList.length;

    for (i = 0; i < length; i++) {
      this.bunnyList[i].update(delta);
    }
  };

  addListeners = () => {
    this.app.ticker.add(delta => this.update(delta));

    this.app.renderer.plugins.interaction.on(
      'pointerdown',
      this.handlePointerDown
    );
  };

  handlePointerDown = () => {
    this.addBunny(this.bunniesToAddEachClick);
  };

  addBunny = (amount: number) => {
    const texture =
      PIXI.loader.resources['http://localhost:3000/images/veg.json'];

    this.props.onIncreaseScore(amount);

    while (amount > 0) {
      const bunny: Bunny = new Bunny(texture.textures!['veg01'], this.bounds);
      this.batchContainer.addChild(bunny!);
      this.bunnyList.push(bunny);

      amount--;
    }
  };
}

// // This will be required for every custom event we want, unless i can figure out a way of doing it dynamically.
// app.events.on(COMPLETE_LEVEL, (level: number) => {
//   // do some cool animation.
//   props.onCompleteLevel();
// });
// app.events.on(INCREASE_SCORE, (amount: number) => {
//   props.onIncreaseScore(amount);
// });
// app.events.on(RESET_SCORE, () => {
//   props.onResetScore();
// });
