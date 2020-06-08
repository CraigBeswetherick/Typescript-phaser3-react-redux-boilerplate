import {
  INCREASE_DATE,
  BUY_BUSINESS,
  BUY_MANAGER,
  UPGRADE_BUSINESS,
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
    case INCREASE_DATE:
      return handleIncreaseDateReducer(
        state,
        action.businesses,
        action.managers
      );
    case BUY_BUSINESS:
      return handleBuyBusiness(state, action.business);
    case BUY_MANAGER:
      return handleBuyManager(state, action.manager);
    case UPGRADE_BUSINESS:
      return handleUpgradeBusiness(state, action.business);
  }

  return state;
};

const handleIncreaseDateReducer = (
  state: CurrentScoreState,
  businesses: Array<Business>,
  managers: Array<Manager>
) => {
  state.currentDate.setDate(state.currentDate.getDate() + 1);

  let increment: number = 0;

  if (state.currentDate.getDay() === 5) {
    businesses.forEach((business: Business) => {
      increment += business.BaseEarnings * business.CurrentLevel;

      if (business.Manager) {
        increment *= business.Manager.Bonus * business.Manager.CurrentLevel;
      }
    });
  }

  return Object.assign({}, state, {
    ...state,
    timePlayed: state.timePlayed + 1,
    currentScore: state.currentScore + increment,
  });
};

const handleUpgradeBusiness = (
  state: CurrentScoreState,
  business: Business
) => {
  return Object.assign({}, state, {
    ...state,
    currentScore:
      state.currentScore -
      business.UpgradeImprovementCost * business.CurrentLevel,
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
