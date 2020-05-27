import React from 'react';
import { PreloaderScene } from './PreloaderScene';

interface Props {
  currentLevel: number;
}

const PreloaderView: React.FC<Props> = props => {
  console.log('Preloading level : ' + props.currentLevel);

  return (
    <div>
      <div id="game" />
    </div>
  );
};

export default PreloaderView;
