import React from 'react';
import { GameContainer } from './components/game';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <GameContainer />
    </div>
  );
}

export default App;
