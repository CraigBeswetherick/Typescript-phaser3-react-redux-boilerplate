import {
  INCREASE_SCORE,
  RESET_SCORE,
  INCREASE_DATE,
  BUY_BUSINESS,
  BUY_MANAGER,
} from '../Actions';

export interface Manager {
  Name: string;
  Cost: number;
  Bonus: number;
  Avatar: string;
}

export interface Business {
  Name: string;
  Cost: number;
  BaseEarnings: number;
  UpgradeImprovementValue: number;
  Avatar: string;
}

export interface CurrentScoreState {
  currentScore: number;
  currentDate: Date;
  timePlayed: number;
  businesses: Array<Business>;
  purchasedBusinesses: Array<Business>;
  managers: Array<Manager>;
  purchasedManagers: Array<Manager>;
}

const defaultCurrentScoreState = (): CurrentScoreState => ({
  currentScore: 0,
  currentDate: new Date(2000, 0, 0),
  timePlayed: 0,
  purchasedBusinesses: [],
  businesses: [
    {
      Name: 'Dangerous Computers',
      Cost: 4000,
      BaseEarnings: 50,
      UpgradeImprovementValue: 50,
      Avatar: 'computers.png',
    },

    {
      Name: 'Silly Suasages',
      Cost: 6000,
      BaseEarnings: 70,
      UpgradeImprovementValue: 70,
      Avatar: 'silly.png',
    },

    {
      Name: 'Pogomons',
      Cost: 8000,
      BaseEarnings: 100,
      UpgradeImprovementValue: 150,
      Avatar: 'pogomons.png',
    },

    {
      Name: 'Cat Picture Factory Inc',
      Cost: 10000,
      BaseEarnings: 150,
      UpgradeImprovementValue: 200,
      Avatar: 'cat.png',
    },

    {
      Name: 'Sloppy Diner Co',
      Cost: 12000,
      BaseEarnings: 180,
      UpgradeImprovementValue: 220,
      Avatar: 'sloppy.png',
    },

    {
      Name: 'Microquality Computers',
      Cost: 20000,
      BaseEarnings: 250,
      UpgradeImprovementValue: 300,
      Avatar: 'microquality.png',
    },
  ],
  purchasedManagers: [],
  managers: [
    {
      Name: 'Nigel Bigglesworth',
      Cost: 500,
      Bonus: 6,
      Avatar: 'Nigel.png',
    },
    {
      Name: 'Jonathan Jimmyjam',
      Cost: 200,
      Bonus: 4,
      Avatar: 'Jonathan.png',
    },
    {
      Name: 'Craig Dilly',
      Cost: 300,
      Bonus: 4,
      Avatar: 'Craig.png',
    },
    {
      Name: 'Michael Carter',
      Cost: 1500,
      Bonus: 10,
      Avatar: 'Micheal.png',
    },
    {
      Name: 'Tom Fairfield',
      Cost: 1200,
      Bonus: 8,
      Avatar: 'Micheal.png',
    },

    {
      Name: 'Linda Eltherington',
      Cost: 1200,
      Bonus: 8,
      Avatar: 'Linda.png',
    },
  ],
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
      return handleBuyBusiness(state, action.businessId);
    case BUY_MANAGER:
      return handleBuyManager(state, action.managerId);
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

const handleBuyBusiness = (state: CurrentScoreState, businessId: number) => {
  state.purchasedBusinesses.push(state.businesses.splice(businessId, 1)[0]);
  return Object.assign({}, state, {
    state,
  });
};

const handleBuyManager = (state: CurrentScoreState, managerId: number) => {
  state.purchasedManagers.push(state.managers.splice(managerId, 1)[0]);
  return Object.assign({}, state, {
    state,
  });
};
