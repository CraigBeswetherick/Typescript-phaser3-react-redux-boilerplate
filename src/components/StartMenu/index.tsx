import React from 'react';
import StartMenuView from './StartMenuView';
import history from '../../Utils/History';

const StartMenu: React.FC = props => {
  const handleContinue = () => {
    history.push('/game');
  };

  return <StartMenuView handleContinue={handleContinue} />;
};

export default StartMenu;
