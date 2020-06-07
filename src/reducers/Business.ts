import { BUY_BUSINESS } from '../Actions';

export interface Business {
  Name: string;
  Cost: number;
  BaseEarnings: number;
  UpgradeImprovementValue: number;
  Avatar: string;
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
