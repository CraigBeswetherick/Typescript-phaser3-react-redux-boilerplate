import React from 'react';
import { GameContainer } from './Components/Game';
import StartMenu from './Components/StartMenu';
import './App.scss';
import { Router, Switch, Route } from 'react-router-dom';
import history from './Utils/History';
import Theme from './Theme/Theme';
import { MuiThemeProvider } from '@material-ui/core';

const App: React.FC = () => {
  return (
    <div className="App">
      <MuiThemeProvider theme={Theme}>
        <Router history={history}>
          <Switch>
            <Route exact path="/">
              <StartMenu />
            </Route>
            <Route path="/game">
              <GameContainer />
            </Route>
          </Switch>
        </Router>
      </MuiThemeProvider>
    </div>
  );
};

export default App;
