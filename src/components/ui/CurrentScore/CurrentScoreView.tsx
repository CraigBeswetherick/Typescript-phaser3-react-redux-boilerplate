import * as React from 'react';
import './CurrentScore.scss';

interface Props {
  currentScore: Number;
}

const CurrentScoreView = (props: Props) => {
  return (
    <header>
      <p>Current Entities: {props.currentScore}</p>
    </header>
  );
};

export default CurrentScoreView;
