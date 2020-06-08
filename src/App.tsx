import React from 'react';
import { GameContainer } from './Components/Game';
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
            <Route path="/">
              <GameContainer />
            </Route>
          </Switch>
        </Router>
      </MuiThemeProvider>
    </div>
  );
};

export default App;
