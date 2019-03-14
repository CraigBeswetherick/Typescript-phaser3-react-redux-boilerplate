import { combineReducers } from 'redux';
import { currentScoreReducer, CurrentScoreState } from './currentScore';
import { currentLevelReducer, CurrentLevelState } from './currentLevel';

export interface State {
  currentScoreReducer: CurrentScoreState;
  currentLevelReducer: CurrentLevelState;
}

export const reducers = combineReducers<State>({
  currentScoreReducer,
  currentLevelReducer
});
