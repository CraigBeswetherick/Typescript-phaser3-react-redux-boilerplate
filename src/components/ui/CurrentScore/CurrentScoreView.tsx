import * as React from 'react';

interface Props {
  currentScore: Number;
}

const CurrentScoreView = (props: Props) => {
  return <p>Current Entities: {props.currentScore}</p>;
};

export default CurrentScoreView;
