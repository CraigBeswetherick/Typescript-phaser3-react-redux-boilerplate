import {
  INCREASE_SCORE,
  RESET_SCORE,
  INCREASE_DATE,
  BUY_BUSINESS,
  BUY_MANAGER,
} from '../Actions';
import { Manager } from './Managers';
import { Business } from './Business';

export interface CurrentScoreState {
  currentScore: number;
  currentDate: Date;
  timePlayed: number;
}

const defaultCurrentScoreState = (): CurrentScoreState => ({
  currentScore: 14000,
  currentDate: new Date(2000, 0, 0),
  timePlayed: 0,
});

export const currentScoreReducer = (
  state = defaultCurrentScoreState(),
  action: any
) => {
  switch (action.type) {
    case INCREASE_SCORE:
      return handleIncreaseScoreReducer(state, action.increment);
    case RESET_SCORE:
      return handleResetScoreReducer(state);
    case INCREASE_DATE:
      return handleIncreaseDateReducer(state);
    case BUY_BUSINESS:
      return handleBuyBusiness(state, action.business);
    case BUY_MANAGER:
      return handleBuyManager(state, action.manager);
  }

  return state;
};

const handleResetScoreReducer = (state: CurrentScoreState) => {
  return Object.assign({}, state, {
    currentScore: 0,
  });
};

const handleIncreaseScoreReducer = (
  state: CurrentScoreState,
  increment: number
) => {
  return Object.assign({}, state, {
    currentScore: state.currentScore + increment,
  });
};

const handleIncreaseDateReducer = (state: CurrentScoreState) => {
  state.currentDate.setDate(state.currentDate.getDate() + 1);
  return Object.assign({}, state, {
    timePlayed: state.timePlayed + 1,
  });
};

const handleBuyBusiness = (state: CurrentScoreState, business: Business) => {
  return Object.assign({}, state, {
    ...state,
    currentScore: state.currentScore - business.Cost,
  });
};

const handleBuyManager = (state: CurrentScoreState, manager: Manager) => {
  return Object.assign({}, state, {
    ...state,
    currentScore: state.currentScore - manager.Cost,
  });
};
