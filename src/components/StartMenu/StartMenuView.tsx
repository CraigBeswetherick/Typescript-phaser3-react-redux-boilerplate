import React from 'react';
import { Typography, Button } from '@material-ui/core';

interface StartMenuViewInterface {
  handleContinue: Function;
}

const StartMenuView: React.FC<StartMenuViewInterface> = props => {
  const handleContinue = () => {
    props.handleContinue();
  };

  return (
    <div>
      <Typography variant="h1">Press start to play the game</Typography>
      <Button variant="contained" color="primary" onClick={handleContinue}>
        Start
      </Button>
    </div>
  );
};

export default StartMenuView;
