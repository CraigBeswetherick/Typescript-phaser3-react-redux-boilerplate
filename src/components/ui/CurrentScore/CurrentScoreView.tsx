import * as React from 'react';
import { Typography } from '@material-ui/core';

interface Props {
  currentScore: Number;
  currentDate: Date;
  timePlayed: Number;
}

const CurrentScoreView = (props: Props) => {
  return (
    <div className="score">
      <Typography variant="subtitle2">
        Current Cash: {props.currentScore} Current Date:{' '}
        {props.currentDate.getMonth() + 1}/{props.currentDate.getDate()}/
        {props.currentDate.getFullYear()}
      </Typography>
    </div>
  );
};

export default CurrentScoreView;
