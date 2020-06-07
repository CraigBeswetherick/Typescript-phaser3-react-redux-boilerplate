import * as React from 'react';
import { Typography, Grid } from '@material-ui/core';

interface Props {
  currentScore: Number;
  currentDate: Date;
  timePlayed: Number;
}

const CurrentScoreView = (props: Props) => {
  return (
    <div className="score">
      <Grid container spacing={2}>
        <Grid item xs zeroMinWidth>
          <Typography noWrap>Cash: {props.currentScore}</Typography>
        </Grid>
        <Grid item xs zeroMinWidth>
          <Typography noWrap>
            Date: {props.currentDate.toDateString()}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default CurrentScoreView;
