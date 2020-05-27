import React from 'react';
import { GameContainer } from './Components/Game';
import { PreloaderContainer } from './Components/Preloader/';
import './App.scss';
import { Router, Switch, Route } from 'react-router-dom';
import history from './Utils/History';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <PreloaderContainer />
          </Route>
          <Route path="/preloader">
            <PreloaderContainer />
          </Route>

          <Route path="/game">
            <GameContainer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
