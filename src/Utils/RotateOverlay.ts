import { addText } from './UIUtils';

let rotateDeviceContainerList: Array<Phaser.GameObjects.Container> = [];

export const initRotateOverlay = (scene: Phaser.Scene, sceneId: number) => {
  scene.game.scale.addListener(Phaser.Scale.Events.ORIENTATION_CHANGE, () => {
    checkOrientation(scene, sceneId);
  });
};

const checkOrientation = (scene: Phaser.Scene, sceneId: number) => {
  if (scene.game.scale.isPortrait) {
    createRotateScreen(scene, sceneId);
  } else {
    if (rotateDeviceContainerList[sceneId]) {
      rotateDeviceContainerList[sceneId].destroy();
      rotateDeviceContainerList.splice(sceneId, 1);
    }
  }
};

const createRotateScreen = (scene: Phaser.Scene, sceneId: number) => {
  if (rotateDeviceContainerList[sceneId]) {
    return;
  }

  let rotateDeviceContainer = scene.add.container(0, 0);

  const { width, height } = scene.sys.game.canvas;
  let rotateDeviceText: Phaser.GameObjects.Text = addText(
    width / 2,
    height * 0.6,
    'Please rotate your device',
    scene,
    '#FFF',
    28
  );

  rotateDeviceText.x -= rotateDeviceText.width / 2;

  let background: Phaser.GameObjects.Graphics = scene.add.graphics();
  background.fillStyle(0x000, 1);
  background.fillRect(0, 0, width, height);

  rotateDeviceContainer.add(background);
  rotateDeviceContainer.add(rotateDeviceText);

  rotateDeviceContainerList[sceneId] = rotateDeviceContainer;
};
