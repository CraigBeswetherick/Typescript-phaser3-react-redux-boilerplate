import { combineReducers } from 'redux';
import { currentScoreReducer, CurrentScoreState } from './CurrentScore';
import { managerReducer, CurrentManagerState } from './Managers';
import { businessReducer, CurrentBusinessState } from './Business';

export interface State {
  currentScoreReducer: CurrentScoreState;
  managerReducer: CurrentManagerState;
  businessReducer: CurrentBusinessState;
}

export const reducers = combineReducers<State>({
  currentScoreReducer,
  managerReducer,
  businessReducer,
});
