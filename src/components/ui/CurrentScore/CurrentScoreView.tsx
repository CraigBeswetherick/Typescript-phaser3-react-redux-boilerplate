import * as React from 'react';

interface Props {
  currentScore: Number;
}

const CurrentScoreView = (props: Props) => {
  return <div className='score'><p>Current Entities: {props.currentScore}</p></div>;
};

export default CurrentScoreView;
