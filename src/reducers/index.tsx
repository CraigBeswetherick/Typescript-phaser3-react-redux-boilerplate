import { combineReducers } from 'redux';
import { currentScoreReducer, CurrentScoreState } from './CurrentScore';

export interface State {
  currentScoreReducer: CurrentScoreState;
}

export const reducers = combineReducers<State>({
  currentScoreReducer,
});
