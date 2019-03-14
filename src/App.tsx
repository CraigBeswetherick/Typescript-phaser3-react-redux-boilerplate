import React, { Component } from 'react';
import { MemoryMazeContainer } from './components/game';
import './App.scss';

interface State {
  currentLevel: number;
}

class App extends React.Component<{}, State> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <MemoryMazeContainer />
        </header>
      </div>
    );
  }
}

export default App;
