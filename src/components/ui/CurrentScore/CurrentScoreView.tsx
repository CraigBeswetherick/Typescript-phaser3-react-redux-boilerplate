import * as React from 'react';
import './CurrentScore.scss';

interface Props {
  currentScore: number;
}

const CurrentScoreView = (props: Props) => {
  return (
    <header>
      <p>Current Entities: {props.currentScore}</p>
    </header>
  );
};

export default CurrentScoreView;
