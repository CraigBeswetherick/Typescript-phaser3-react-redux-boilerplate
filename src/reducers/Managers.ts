import { BUY_MANAGER } from '../Actions';

export interface Manager {
  Name: string;
  Cost: number;
  Bonus: number;
  Avatar: string;
}

export interface CurrentManagerState {
  managers: Array<Manager>;
  purchasedManagers: Array<Manager>;
}

const defaultCurrentManagerState = (): CurrentManagerState => ({
  purchasedManagers: [],
  managers: [
    {
      Name: 'Nigel Bigglesworth',
      Cost: 7000,
      Bonus: 6,
      Avatar: 'Nigel.png',
    },
    {
      Name: 'Jonathan Jimmyjam',
      Cost: 6000,
      Bonus: 4,
      Avatar: 'Jonathan.png',
    },
    {
      Name: 'Craig Dilly',
      Cost: 7000,
      Bonus: 4,
      Avatar: 'Craig.png',
    },
    {
      Name: 'Michael Carter',
      Cost: 15000,
      Bonus: 10,
      Avatar: 'Micheal.png',
    },
    {
      Name: 'Tom Fairfield',
      Cost: 12000,
      Bonus: 8,
      Avatar: 'Micheal.png',
    },

    {
      Name: 'Linda Eltherington',
      Cost: 12000,
      Bonus: 8,
      Avatar: 'Linda.png',
    },
  ],
});

export const managerReducer = (
  state = defaultCurrentManagerState(),
  action: any
) => {
  switch (action.type) {
    case BUY_MANAGER:
      return handleBuyManager(state, action.managerId);
  }

  return state;
};

const handleBuyManager = (state: CurrentManagerState, managerId: number) => {
  state.purchasedManagers.push(state.managers.splice(managerId, 1)[0]);
  return Object.assign({}, state, {
    state,
  });
};
