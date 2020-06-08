export const createEmitter = (scene: Phaser.Scene) => {
  const emitter = scene.add.particles('star-sprite.jpg').createEmitter({
    x: 0,
    y: 0,
    speed: { min: -800, max: 800 },
    angle: { min: 0, max: 360 },
    scale: { start: 0.5, end: 0 },
    //active: false,
    lifespan: 600,
    gravityY: 800,
  });

  emitter.stop();

  return emitter;
};
