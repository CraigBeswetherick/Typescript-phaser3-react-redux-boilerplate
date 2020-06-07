import { BUY_BUSINESS } from '../Actions';
import { Manager } from './Managers';

export interface Business {
  Name: string;
  Cost: number;
  BaseEarnings: number;
  UpgradeImprovementCost: number;
  Avatar: string;
  CurrentLevel: number;
  Manager?: Manager;
}

export interface CurrentBusinessState {
  businesses: Array<Business>;
  purchasedBusinesses: Array<Business>;
}

const defaultBusinessState = (): CurrentBusinessState => ({
  purchasedBusinesses: [],
  businesses: [
    {
      Name: 'Dangerous Computers',
      Cost: 4000,
      BaseEarnings: 50,
      UpgradeImprovementCost: 50,
      Avatar: 'computers.png',
      CurrentLevel: 1,
      Manager: undefined,
    },

    {
      Name: 'Silly Suasages',
      Cost: 6000,
      BaseEarnings: 70,
      UpgradeImprovementCost: 70,
      Avatar: 'silly.png',
      CurrentLevel: 1,
      Manager: undefined,
    },

    {
      Name: 'Pogomons',
      Cost: 8000,
      BaseEarnings: 100,
      UpgradeImprovementCost: 150,
      Avatar: 'pogomons.png',
      CurrentLevel: 1,
      Manager: undefined,
    },

    {
      Name: 'Cat Picture Factory Inc',
      Cost: 10000,
      BaseEarnings: 150,
      UpgradeImprovementCost: 200,
      Avatar: 'cat.png',
      CurrentLevel: 1,
      Manager: undefined,
    },

    {
      Name: 'Sloppy Diner Co',
      Cost: 12000,
      BaseEarnings: 180,
      UpgradeImprovementCost: 220,
      Avatar: 'sloppy.png',
      CurrentLevel: 1,
      Manager: undefined,
    },

    {
      Name: 'Microquality Computers',
      Cost: 20000,
      BaseEarnings: 250,
      UpgradeImprovementCost: 300,
      Avatar: 'microquality.png',
      CurrentLevel: 1,
      Manager: undefined,
    },
  ],
});

export const businessReducer = (
  state = defaultBusinessState(),
  action: any
) => {
  switch (action.type) {
    case BUY_BUSINESS:
      return handleBuyBusiness(state, action.business);
  }

  return state;
};

const handleBuyBusiness = (state: CurrentBusinessState, businessId: number) => {
  const business: Business = state.businesses.splice(businessId, 1)[0];

  state.purchasedBusinesses.push(business);
  return Object.assign({}, state, {
    ...state,
  });
};
