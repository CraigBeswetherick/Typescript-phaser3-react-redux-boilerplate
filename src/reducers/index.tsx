import { combineReducers } from 'redux';
import { currentScoreReducer, CurrentScoreState } from './CurrentScore';
import { currentLevelReducer, CurrentLevelState } from './CurrentLevel';

export interface State {
  currentScoreReducer: CurrentScoreState;
  currentLevelReducer: CurrentLevelState;
}

export const reducers = combineReducers<State>({
  currentScoreReducer,
  currentLevelReducer,
});
